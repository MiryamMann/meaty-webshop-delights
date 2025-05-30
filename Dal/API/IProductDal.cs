using Dal.models;
using Dal.Models;
using System.Collections.Generic;

namespace Dal.API
{
    public interface IProductDal
    {
        List<Product> GetAllProducts();
        void AddProduct(OrderItem orderItem, Order order);
        bool IsOrderContainsOrderItem(Order order, OrderItem orderItem);
        void RemoveProduct(OrderItem orderItem, Order order);
    }
}
