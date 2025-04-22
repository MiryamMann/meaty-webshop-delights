using Bl.API;
using Microsoft.Data.SqlClient;
using Dal.Services;
using Bl;
using Bl.Moduls;
using Microsoft.EntityFrameworkCore;
using Dal.Models;
using System.Linq.Expressions;
namespace Bl.Services
{

    public class BLClientService : IBLClientService
    {
        private readonly IDalClientService _dalClientService;

        public BLClientService(IDalClientService dalClientService)
        {
            _dalClientService = dalClientService ?? throw new ArgumentNullException(nameof(dalClientService));
        }

       
        public bool AddProductToOrder(IBLManager IBL, long orderId)
        {
            bool result=false;
            if (IBL?.product == null)
            {
                return false;
            }
            var order = GetOrderById(orderId);
            if (order == null)
            { return false; }

            var item = order.OrderItems.FirstOrDefault(o => o.OrderItemId == orderId);
            //if (item != null)
            //{
            //    result = null;// _dalClientService.AddProductToOrder(Mapper.ToDalProduct(IBL.product), orderId);
            //}
            return result;
            
        }
        public bool RemoveProduct(IBLManager IBL, long orderId)
        {
            bool result = false;
            if (IBL?.product == null)
            {
                return false;
            }
            var order = GetOrderById(orderId);
            if (order == null)
            { return false; }
            var item = order.OrderItems.FirstOrDefault(o => o.OrderItemId == orderId);
            //if (item != null)
            //{
            //    result = _dalClientService.RemoveProduct(Mapper.ToDalProduct(IBL.product),orderId);
            //}
            return result;
        }
        private BlOrder GetOrderById(long orderId)
        {
            var orderEntity = _dalClientService.GetOrderById(orderId); // Fetching from DAL
            if (orderEntity == null) return null; // Return null if not found

            return Mapper.ToBlOrder(orderEntity); // Mapping to BlOrder
        }

        public bool LogIn(string id, string passward)
        {
         return  _dalClientService.LogIn(id, passward);
        }

        public bool SignUp(BlClient client)
        {
          // _dalClientService.SignUp(Mapper.ToDalClient( client));
            return true;
        }

        public bool LogOut()
        {
            throw new NotImplementedException();
        }

        public bool BeginOrder()
        {
            throw new NotImplementedException();
        }


        public bool FinishOrder()
        {
            throw new NotImplementedException();
        }

        public bool Payment()
        {
            throw new NotImplementedException();
        }

        public List<BlOrder> GetAllOrders(string clientId)
        {
            var orders = _dalClientService.GetAllOrders(clientId);
            return Mapper.ToListBlOrder(orders);

        }
        public List<BlProduct> GetAllProducts()
        {
            if (_dalClientService == null)
            { Console.WriteLine("null"); }
            else
            {
               
                return Mapper.ToListBlProduct(_dalClientService.GetAllProducts());
            }
            return null;

        }


    }
}