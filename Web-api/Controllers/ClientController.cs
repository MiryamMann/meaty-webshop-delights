using Bl;

using Microsoft.AspNetCore.Mvc;

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
        [HttpPut("LogIn")]
        public IActionResult LogIn(string id, string passward)
        {
            if (_blManager.ClientService.LogIn(id, passward))
                return Ok();
            return BadRequest();
        }
        [HttpPut("SignUp")]
        public IActionResult SignUp(IBLManager _blManager)
        {
            if (_blManager.ClientService.SignUp(_blManager.client))
                return Ok();
            return BadRequest();
        }
        [HttpGet("LogOut")]
        public IActionResult LogOut()
        {
            if(_blManager.ClientService.LogOut())
            return Ok();
            return BadRequest();
        }
        [HttpPut("BeginOrder")]
        public IActionResult BeginOrder()
        {
            if (_blManager.ClientService.BeginOrder())
                return Ok();
            return BadRequest();
        }
        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            Console.WriteLine("GetAllProducts API was called!");
            if (_blManager.ClientService.GetAllProducts()!=null)
                Console.WriteLine("Products are null!");
            return Ok(_blManager.ClientService.GetAllProducts());
            return BadRequest();
        }
        [HttpPut("AddProduct")]
        public IActionResult AddProduct(IBLManager product, int orderId)
        {
         //   if(_blManager.ClientService.AddProduct(product, orderId))
            return Ok();
            return BadRequest();

        }
        [HttpDelete("RemoveProduct")]
        public IActionResult RemoveProduct(IBLManager product)//miri
        {
            //if (_blManager.ClientService.RemoveProduct(product.product))
            return Ok();
            return BadRequest();
        }
        [HttpPut("FinishOrder")]
        public IActionResult FinishOrder()
        {
            if (_blManager.ClientService.FinishOrder())
                return Ok();
            return BadRequest();
        }
        [HttpPut("Payment")]
        public IActionResult Payment()
        {
            if (_blManager.ClientService.Payment())
                return Ok();
            return BadRequest();
        }
        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders(string id)//Tamar
        {
            if (_blManager.ClientService.GetAllOrders(id) !=null)
                return Ok(_blManager.ClientService.GetAllOrders(id));
            return BadRequest();

        }
    }
}
