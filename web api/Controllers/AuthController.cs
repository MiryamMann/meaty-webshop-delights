using Bl.API;
using Bl.API.BTOs;
using Bl.API.DTOs;
using Bl.Moduls;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using System;
using System.Threading.Tasks;

namespace web_api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IClientAuthService _authService;
        private readonly IClientService _clientService;
        private readonly IJwtService _jwtService;

        public AuthController(IClientAuthService authService, IClientService clientService, IJwtService jwtService)
        {
            _authService = authService;
            _clientService = clientService;
            _jwtService = jwtService;
        }

        [HttpPost("LogIn")]
        public async Task<IActionResult> Login([FromBody] ClientLoginDto dto)
        {
            Console.WriteLine("🔐 Login endpoint called");

            try
            {
                var blClient = await _authService.LoginAsync(dto);

                if (blClient == null)
                {
                    return Unauthorized(new { message = "המשתמש לא קיים. נא להירשם קודם." });
                }

                if (blClient.Id == -1)
                {
                    return Unauthorized(new { message = "הסיסמה שגויה. נסה שוב." });
                }

                var accessToken = _jwtService.GenerateToken(blClient);
                var refreshToken = _jwtService.GenerateRefreshToken();

                blClient.RefreshToken = refreshToken;
                blClient.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);
                await _authService.UpdateAsync(blClient);

                return Ok(new
                {
                    token = accessToken,
                    refreshToken,
                    addressId = blClient.AddressId,
                    clientId = blClient.Id,
                    client = blClient
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🔥 Exception during login: {ex.Message}");
                return StatusCode(500, new { message = "שגיאת שרת פנימית", error = ex.Message });
            }
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] ClientSignUpDto dto)
        {
            Console.WriteLine("🆕 Signup endpoint called");

            try
            {
                if (await _authService.ExistsByEmailAsync(dto.Email))
                {
                    Console.WriteLine($"⚠ Signup failed: Email already exists - {dto.Email}");
                    return BadRequest(new { message = "אימייל זה כבר רשום במערכת." });
                }

                var client = await _authService.SignUpAsync(dto);

                if (client == null)
                {
                    Console.WriteLine("⚠ Signup failed: Error saving client.");
                    return StatusCode(500, new { message = "שגיאה בשמירת המשתמש." });
                }

                Console.WriteLine($"✅ Signup succeeded for email: {dto.Email}");
                return Ok(client);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception during signup: {ex.Message}");
                return StatusCode(500, new { message = "שגיאת שרת פנימית", error = ex.Message });
            }
        }

        [HttpPost("Google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.IdToken))
                return BadRequest(new { message = "טוקן חסר או ריק." });

            try
            {
                var result = await _authService.LoginWithGoogleTokenAsync(dto.IdToken);

                if (result == null)
                {
                    Console.WriteLine("❌ Google token validation failed.");
                    return Unauthorized(new { message = "הטוקן של Google לא תקין." });
                }

                Console.WriteLine("✅ Google login successful.");
                return Ok(result);
            }
            catch (InvalidJwtException ex)
            {
                Console.WriteLine("❌ Invalid Google token: " + ex.Message);
                return Unauthorized(new { message = "הטוקן של Google לא תקין.", error = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 General error: " + ex.Message);
                return StatusCode(500, new { message = "שגיאת שרת כללית", error = ex.Message });
            }
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto dto)
        {
            try
            {
                var client = await _authService.GetByRefreshTokenAsync(dto.RefreshToken);

                if (client == null || client.RefreshTokenExpiration < DateTime.UtcNow)
                {
                    Console.WriteLine("❌ Refresh token invalid or expired");
                    return Unauthorized(new { message = "טוקן לא חוקי או פג תוקף." });
                }

                var newAccessToken = _jwtService.GenerateToken(client);
                var newRefreshToken = _jwtService.GenerateRefreshToken();

                client.RefreshToken = newRefreshToken;
                client.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);
                await _authService.UpdateAsync(client);

                return Ok(new
                {
                    token = newAccessToken,
                    refreshToken = newRefreshToken
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error refreshing token: {ex.Message}");
                return StatusCode(500, new { message = "שגיאה בעת רענון הטוקן", error = ex.Message });
            }
        }
    }
}
