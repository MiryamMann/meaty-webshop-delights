using Dal.API;
using Dal.models;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class OrderService : IOrderDal
    {
        private readonly dbClass _context;

        public OrderService(dbClass context)
        {
            _context = context;
        }

        public Order GetOrderById(long orderId)
        {
            return _context.Orderes.FirstOrDefault(o => o.Id == orderId);
        }

        public void CreateNewOrder(Order order)
        {
            _context.Orderes.Add(order);
            _context.SaveChanges();
        }

        public Order OrderExist(Order order)
        {
            return _context.Orderes.FirstOrDefault(o => o.Id == order.Id);
        }

        public List<Order> GetAllOrders(string clientId)
        {
            return _context.Orderes.Where(o => o.ClientId == clientId).ToList();
        }

        public Order FindOrderOfOrderItem(OrderItem orderItem)
        {
            return _context.Orderes.FirstOrDefault(o => o.Id == orderItem.OrderId);
        }
    }
}
