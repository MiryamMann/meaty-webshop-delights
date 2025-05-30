using Dal.API;
using Dal.models;
using Dal.Models;

namespace Dal.Services
{
    public class DalProductService : IProductDal
    {
        private readonly dbClass _context;

        public DalProductService(dbClass context)
        {
            _context = context;
        }

        public List<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }

        public void AddProduct(OrderItem orderItem, Order order)
        {
            order.OrderItems.Add(orderItem);
            _context.SaveChanges();
        }

        public bool IsOrderContainsOrderItem(Order order, OrderItem orderItem)
        {
            return order.OrderItems.Contains(orderItem);
        }

        public void RemoveProduct(OrderItem orderItem, Order order)
        {
            order.OrderItems.Remove(orderItem);
            _context.SaveChanges();
        }
    }
}
