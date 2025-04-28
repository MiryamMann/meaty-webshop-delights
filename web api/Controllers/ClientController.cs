using Bl;
using Bl.API.BTOs;
using Bl.API.DTOs;
using Bl.Moduls;
using Bl.Services;
using Dal;
using Dal.models;
using Dal.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ClientLoginDto loginDto)
        {
            var loginResponse = await _blManager.ClientService.LoginWithTokensAsync(loginDto);

            if (loginResponse == null)
                return Unauthorized("Invalid credentials");

            return Ok(loginResponse); // מחזיר גם AccessToken וגם RefreshToken
        }
        [HttpPost("SignUp")]//יוצרת טוקן

        public async Task<IActionResult> SignUp([FromBody] ClientSignUpDto signUpDto)
        {
            var success = await _blManager.ClientService.SignUpAsync(signUpDto);
            if (success)
                return Ok(new { Message = "Client created successfully." });

            return BadRequest("Failed to create client.");
        }


        //[HttpGet("LogOut")]
        //public IActionResult LogOut()
        //{
        //    if(_blManager.ClientService.LogOut())
        //    return Ok();
        //    return BadRequest();
        //}
        //[HttpPut("BeginOrder")]
        //public IActionResult BeginOrder()
        //{
        //    _blManager.ClientService.BeginOrder();
        //        if (_blManager.ClientService.BeginOrder()!=null)
        //        return Ok();
        //    return BadRequest();
        //}

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
        //[HttpPut("AddProduct")]
        //public IActionResult AddProduct(BlProduct product, string clientId)
        //{
        //    var dalProduct = Mapper.ToDalProduct(product);
        //    _blManager.ClientService.AddProduct(product, clientId);
        //    if (_blManager.ClientService.AddProduct(product, clientId)) ;
        //    return Ok(dalProduct);
        //    return BadRequest();// DAL מקבל Product
        //}
        [HttpDelete("RemoveProduct")]//לא צריך טוקן. השאלה היא מה קורה אם אחרי יצירת הזמנה רוצים לעדכן את ההזמנה, ואז כן צריך טוקן. 
        public IActionResult RemoveProduct([FromBody]IBLManager bLManager)
        {
            if (_blManager.ClientService.RemoveProduct(bLManager.OrderItem, bLManager.Order))
            {
                return Ok();
            }
            
            return BadRequest();
        }
        //[HttpPut("FinishOrder")]
        //public IActionResult FinishOrder()
        //{
        //    if (_blManager.ClientService)
        //        return Ok();
        //    return BadRequest();
        //}
        //[HttpPut("Payment")]
        //public IActionResult Payment()
        //{
        //    if (_blManager.ClientService.Payment())
        //        return Ok();
        //    return BadRequest();
        //}
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
