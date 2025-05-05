using Bl;
using Bl.API.BTOs;
using Bl.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using Bl.API.DTOs;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ClientController : ControllerBase
    {
        public IBLManager _blManager{ get; set; }
        public ClientController(IBLManager i)
        {
            _blManager = i;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] ClientLoginDto loginDto)
        {
            // ניסיון להתחבר דרך שכבת BL
            var client = await _blManager.ClientService.LoginAsync(loginDto);

            if (client == null)
                return Unauthorized("Email or password is incorrect.");

            // יצירת מחולל טוקנים
            var tokenService = new TokenService(HttpContext.RequestServices.GetRequiredService<IConfiguration>());

            // הפקת טוקן עם מידע על המשתמש
            var token = tokenService.GenerateToken(
                email: client.Email,
                role: "Client",
                clientId: client.Password.ToString()
            );

            // החזרת הטוקן ל-React
            return Ok(new
            {
                token,
                client = new
                {
                    client.Password,
                    client.Email,
                    
                }
            });
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] ClientSignUpDto signUpDto)
        {
            var success = await _blManager.ClientService.SignUpAsync(signUpDto);

            if (!success)
                return BadRequest("Sign up failed. Email might already be in use.");

            return Ok("User created successfully.");
        }
        [HttpPost("Google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto model)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(model.IdToken);

                var user = new
                {
                    Email = payload.Email,
                    Name = payload.Name,
                    GoogleId = payload.Subject
                };

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { error = "Invalid Google token", details = ex.Message });
            }
        }
 
        [HttpGet("GetAllProducts")]//לא צריך תוקן
        
        public IActionResult GetAllProducts()
        {
            Console.WriteLine("GetAllProducts API was called!");
            var products = _blManager.ClientService.GetAllProducts();
            if (products == null)
                return BadRequest();

            return Ok(products);
        }
        //אי אפשר להגיע לפוקנציה הזו בלי להיות מחובר לאתר. את זה עושה הריאקט
        [HttpPut("AddOrder")]//אי אפשר להכנס בל יטוקן. 
        [Authorize]//מאמת את הטוקן
        public async Task<IActionResult> AddOrder([FromBody] AddOrderRequestDto order)
        {
            {
                if (!User.Identity.IsAuthenticated)

                    return Unauthorized("The token is not recognised succsessfully. Make sure your contact details are correct");


                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


                if (await _blManager.ClientService.AddOrder(order.Client, order.Order))
                {
                    return Ok(order);
                }

                return Unauthorized();
            }
        }
        [HttpDelete("RemoveProduct")]//לא צריך טוקן. השאלה היא מה קורה אם אחרי יצירת הזמנה רוצים לעדכן את ההזמנה, ואז כן צריך טוקן. 
        public IActionResult RemoveProduct([FromBody]IBLManager bLManager)
        {
            if (_blManager.ClientService.RemoveProduct(bLManager.OrderItem, bLManager.Order))
            {
                return Ok();
            }
            
            return BadRequest();
        }
       
        [Authorize]
        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders(string id)//Tamar
        {
            if (_blManager.ClientService.GetAllOrders(id) !=null)
                return Ok(_blManager.ClientService.GetAllOrders(id));
            return BadRequest();

        }
    }

}
