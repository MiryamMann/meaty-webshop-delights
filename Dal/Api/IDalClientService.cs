using Bl;
using Bl.Services;
using Dal.Models;
using Bl;

using Dal;
namespace Bl.API
{
    public interface IDalClientService
    {
        public Order GetOrderById(long orderId);
        public void AddProductToOrder(IDalManager product, long orderId);
        bool RemoveProduct(IDalManager product, long orderId);
        public List<Product> GetAllProducts();
        public List<Order> GetAllOrders(string clientId);
        bool LogIn(string id, string passward);
        bool SignUp(IDalManager client);
        bool LogOut();
        bool BeginOrder();
        bool FinishOrder();
        bool Payment();
    }
}
