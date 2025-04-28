using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.API.BTOs;
using Bl.API.DTOs;
using Bl.Moduls;
using Dal;
using Dal.models;
using Dal.Models;

namespace Bl.API
{
    public interface IBLClientServices
    {
        public BlOrder GetOrderById(long orderId);
        
      bool RemoveProduct(BlOrderItem orderItem,BlOrder createOrder);
       List<BlProduct> GetAllProducts();
        List<BlOrder> GetAllOrders(string clientId);
        bool IsOrderContainsOrderItem(BlOrder order, BlOrderItem orderItem);
        BlOrder FindOrderOfOrderItem(BlOrderItem orderItem);
        Task<bool> LogIn(string email, string password);
        BlClient ClientExist(string clientId);
        bool SignUp(ClientSignUpDto client);
        public Task<bool> AddOrder(ClientSignUpDto client, BlOrder order);
        bool CreateNewOrder(BlOrder order);
        BlOrder OrderExist(BlOrder order);
        bool AddProduct(BlOrderItem orderItem);
        Task<LoginResponseDto?> LoginWithTokensAsync(ClientLoginDto dto);
        Task<bool> SignUpAsync(ClientSignUpDto signUpDto);


    }
}
