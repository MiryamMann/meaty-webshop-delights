using Bl;
using Bl.API;
using Bl.Moduls;
using Microsoft.AspNetCore.Mvc;

namespace web_api.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _products;
        private readonly IBLManager _blManager;

        public ProductController(IProductService products, IBLManager bLManager)
        {
            _products = products;
            _blManager = bLManager;
        }

        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProduct()
        {
            var result = _products.GetAllProducts();
            if (result == null) return BadRequest();
            return Ok(result);
        }

        [HttpDelete("remove")]
        public IActionResult RemoveProduct([FromBody] BlOrderItem item, [FromQuery] long orderId)
        {
            var order = _blManager.OrderService.FindOrderOfOrderItem(item);
            var success = _blManager.ProductService.RemoveProduct(item, order);
            return success ? Ok() : BadRequest();
        }
    }
}