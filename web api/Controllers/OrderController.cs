using Bl.API;
using Bl.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orders;

    public OrderController(IOrderService orders)
    {
        _orders = orders;
    }

    [HttpPost("CreateOrder")]
    [Authorize]
    public async Task<IActionResult> CreateOrder([FromBody] AddOrderRequestDto dto)
    {
        var result = await _orders.CreateOrderAsync(dto);
        if (result) return Ok(result);
        return StatusCode(500, "שגיאה בשמירת ההזמנה");
    }

    [HttpGet("GetAllOrders")]
    [Authorize]
    public IActionResult GetAllOrders(string clientId)
    {
        var orders = _orders.GetAllOrders(clientId);
        if (orders == null) return BadRequest();
        return Ok(orders);
    }
    [HttpPost("Payment")]
    [Authorize]
    public async Task<IActionResult> Payment([FromBody] AddOrderRequestDto order)
    {
        if (!User.Identity.IsAuthenticated)
            return Unauthorized("The token is not recognised successfully.");

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (await _orders.Payment(order))
            return Ok(order);

        return Unauthorized();
    }
}
