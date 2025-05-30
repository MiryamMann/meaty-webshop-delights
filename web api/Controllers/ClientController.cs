using Bl;
using Bl.API.BTOs;
using Bl.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using Bl.API.DTOs;
using System.Security.Claims;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        public IBLManager _blManager { get; set; }

        public ClientController(IBLManager i)
        {
            _blManager = i;
        }


        [HttpPost("AddOrder")]
        [Authorize]
        public async Task<IActionResult> AddOrder([FromBody] AddOrderRequestDto order)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized("The token is not recognised successfully.");

            try
            {
                var result = await _blManager.OrderService.CreateOrderAsync(order);

                if (result)
                    return Ok("ההזמנה נוצרה בהצלחה");

                return StatusCode(500, "שגיאה בשמירת ההזמנה");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
