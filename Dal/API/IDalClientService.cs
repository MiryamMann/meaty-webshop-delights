using Bl;
using Bl.Services;
using Dal.Models;
using Bl;
using Bl.Services;
using Dal;
namespace Bl.API
{
    public interface IDalClientService
    {
        public Order GetOrderById(long orderId);
        public void AddProductToOrder(DalManager product, long orderId);
        bool RemoveProduct(Product product);
        public List<Product> GetAllProducts();
        public List<Order> GetAllOrders(string clientId);
    }
}
