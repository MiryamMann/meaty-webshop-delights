using Bl.API.DTOs;
using Bl.Moduls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IOrderService
    {
        BlOrder GetOrderById(long orderId);
        List<BlOrder> GetAllOrders(string clientId);
        BlOrder OrderExist(BlOrder order);
        Task<bool> CreateOrderAsync(AddOrderRequestDto dto);
        bool IsOrderContainsOrderItem(BlOrder order, BlOrderItem orderItem);
        BlOrder FindOrderOfOrderItem(BlOrderItem orderItem);
        bool CreateNewOrder(BlOrder order);
        Task<bool> Payment(AddOrderRequestDto order);
        //string GetClientId();

    }
}
