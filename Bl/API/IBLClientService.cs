using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Moduls;
using Dal.Models;

namespace Bl.API
{//
    public interface IBLClientService
    {
        bool LogIn(string id, string passward);
        bool SignUp(BlClient client);
        bool LogOut();
        bool BeginOrder();
        public bool AddProductToOrder(IBLManager IBL, long orderId);
        bool RemoveProduct(IBLManager IBL, Order order);
        bool FinishOrder();
        bool Payment();
        List<BlOrder> GetAllOrders(string clientId);
         List<BlProduct> GetAllProducts();
        
    }
}
