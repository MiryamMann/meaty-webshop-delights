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
        #region Order
        public BlOrder GetOrderById(long orderId);
        List<BlOrder> GetAllOrders(string clientId);
        BlOrder OrderExist(BlOrder order);

        bool IsOrderContainsOrderItem(BlOrder order, BlOrderItem orderItem);
        BlOrder FindOrderOfOrderItem(BlOrderItem orderItem);
        public Task<bool> AddOrder(ClientSignUpDto client, BlOrder order);
        bool CreateNewOrder(BlOrder order);

        #endregion
        #region Product
        bool RemoveProduct(BlOrderItem orderItem, BlOrder createOrder);
        List<BlProduct> GetAllProducts(); 
        bool AddProduct(BlOrderItem orderItem);
        #endregion
        #region Athentication
        Task<ClientLoginDto?> LoginAsync(ClientLoginDto loginDto);
        Task<bool> SignUpAsync(ClientSignUpDto dto);
        #endregion
        #region Client
        Task<bool> ExistsByEmailAsync(string email);

        #endregion

    }
}
