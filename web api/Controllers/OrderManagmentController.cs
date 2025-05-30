using Bl;
using Bl.API;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderManagmentController : ControllerBase
    {
        IOrderManagmentService OrderService;
        public OrderManagmentController(IOrderManagmentService _orderService)
        {
            OrderService = _orderService;


        }
        [HttpGet]
        public IActionResult GetAllOrders()//Miri
        {

            if (OrderService.GetAllOrders() != null)
                return Ok(OrderService.GetAllOrders());
            return BadRequest();
        }
        [HttpPost]
        public IActionResult SuspendeOrder()//miri
        {
            if (OrderService.SuspendeOrder())
                return Ok();
            return BadRequest();
        }
        [HttpDelete]
        public IActionResult UnsuspendeOrder() {//tamar
            if (OrderService.UnsuspendeOrder())
                return Ok();
            return BadRequest();

        }
       
    }
}

        
    

