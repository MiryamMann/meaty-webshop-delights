using Bl.API;
using Bl.API.BTOs;
using Bl.API.DTOs;
using Bl.Moduls;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;

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
            Console.WriteLine(" Login endpoint called");

            try
            {
                Console.WriteLine($" Received login attempt for email: {dto.Email}");

                var blClient = await _authService.LoginAsync(dto); 

                if (blClient == null)
                {
                    Console.WriteLine(" Login failed: Invalid email or password.");
                    return Unauthorized("Invalid email or password.");
                }

                var accessToken = _jwtService.GenerateToken(blClient);
                var refreshToken = _jwtService.GenerateRefreshToken();
                Console.WriteLine(blClient.Id);
                Console.WriteLine(blClient.AddressId);
                blClient.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7);
                blClient.RefreshToken = refreshToken;
                blClient.RefreshTokenExpiration = DateTime.UtcNow.AddDays(7); // תוקף לשבוע
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
                Console.WriteLine($" Exception during login: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error", message = ex.Message });
            }
        }


        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] ClientSignUpDto dto)
        {
            Console.WriteLine(" Signup endpoint called");

            var client = await _authService.SignUpAsync(dto);
            if (client==null)
            {
                Console.WriteLine($"⚠ Signup failed: Email already exists - {dto.Email}");
                return BadRequest("Email already exists.");
            }

            Console.WriteLine($" Signup succeeded for email: {dto.Email}");
            return Ok(client);
        }

        [HttpPost("Google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.IdToken))
                return BadRequest("Token is null or empty");

            try
            {
                var result = await _authService.LoginWithGoogleTokenAsync(dto.IdToken);

                if (result == null)
                {
                    Console.WriteLine(" Google token validation failed.");
                    return Unauthorized(new { error = "Invalid Google token" });
                }

                Console.WriteLine(" Google login successful.");
                return Ok(result); // מחזיר LoginResponseDto { accessToken, refreshToken }
            }
            catch (InvalidJwtException ex)
            {
                Console.WriteLine(" Invalid token: " + ex.Message);
                return Unauthorized(new { error = "Invalid Google token", message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine(" General error: " + ex.Message);
                return StatusCode(500, new { error = "Internal Server Error", message = ex.Message });
            }
        }
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto dto)
        {
            var client = await _authService.GetByRefreshTokenAsync(dto.RefreshToken);

            if (client == null || client.RefreshTokenExpiration < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token");

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


    }
}
