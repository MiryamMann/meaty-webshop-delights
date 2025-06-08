using Bl;
using Dal.Models;
using Bl.Services;
using Dal;
using Dal.models;
using Microsoft.EntityFrameworkCore;
namespace Bl.API
{//
    public interface IDalClientService
    {
        public Order GetOrderById(long orderId);
        void AddProduct(OrderItem orderItem, Order order);
        void RemoveProduct(OrderItem orderItem, Order order);
        public List<Product> GetAllProducts();
        public List<Order> GetAllOrders(string clientId);
        //  public void Save();
        Order CreateOrder(Order order, string clientId);
        bool IsOrderContainsOrderItem(Order order, OrderItem orderItem);
        Order FindOrderOfOrderItem(OrderItem orderItem);
        Task<bool> LogIn(string id, string passward);
        Client GetClientByEmail(string email);
        Client ClientExist(string clientId);
        bool SignUp(Client client);
        void CreateNewOrder(Order order);
        Order OrderExist(Order order);
        Task<bool> GetByEmailAsync(string email);
        Task UpdateAsync(Client client);
        Task<int> AddAddressAsync(Address address);
        Task<bool> SignUpAsync(Client client);

        Task<bool> ExistsByEmailAsync(string email);
        Task<Client?> GetByEmailAndPasswordAsync(string email, string password);



    }
}