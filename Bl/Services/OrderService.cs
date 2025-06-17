using Bl.API.DTOs;
using Bl.Moduls;
using Dal.Services;
using Bl.API;
using Dal.API;

namespace Bl.Services
{
    public class OrderService : IOrderService
    {
        private readonly IClientDal _Clientdal;
        private readonly IOrderDal _Orderdal;
        private readonly IProductDal _Productdal;

        public OrderService(IClientDal clientDal, IOrderDal Orderdal, IProductDal productdal)
        {
            _Clientdal = clientDal;
            _Orderdal = Orderdal;
            _Productdal = productdal;
        }

        public async Task<bool> CreateOrderAsync(AddOrderRequestDto DTOorder)
        {
            Console.WriteLine("CreateOrderAsync");
            var client = _Clientdal.GetClientByEmail(DTOorder.Client.Email);
            if (client == null || client.AddressId == null)
                throw new Exception("Client or address not found");

            var order = Mapper.MapDtoToBlOrder(DTOorder, client.AddressId);

            if (!CreateNewOrder(order)) return false;

            foreach (var item in order.OrderItems)
                if (!AddProduct(item)) return false;

            return true;
        }

        public bool CreateNewOrder(BlOrder order)
        {
            _Orderdal.CreateNewOrder(Mapper.ToDalOrder(order));
            return _Orderdal.OrderExist(Mapper.ToDalOrder(order)) != null;
        }

        public BlOrder GetOrderById(long orderId)
        {
            var dalOrder = _Orderdal.GetOrderById(orderId);
            return dalOrder == null ? null : Mapper.ToBlOrder(dalOrder);
        }

        public BlOrder OrderExist(BlOrder order)
        {
            return Mapper.ToBlOrder(_Orderdal.OrderExist(Mapper.ToDalOrder(order)));
        }

        public List<BlOrder> GetAllOrders(string clientId)
        {
            return Mapper.ToListBlOrder(_Orderdal.GetAllOrders(clientId));
        }

        public bool IsOrderContainsOrderItem(BlOrder order, BlOrderItem item)
        {
            // Not implemented yet
            return false;
        }

        public BlOrder FindOrderOfOrderItem(BlOrderItem item)
        {
            // Not implemented yet
            return null;
        }

        private bool AddProduct(BlOrderItem item)
        {
            var dalItem = Mapper.ToDalOrderItem(item);
            var order = _Orderdal.GetOrderById(dalItem.OrderId);
            if (order == null) return false;

            _Productdal.AddProduct(dalItem, order);
            return _Productdal.IsOrderContainsOrderItem(order, dalItem);
        }
        public async Task<bool> Payment(AddOrderRequestDto order)
        {
            Console.WriteLine("Payment");
            if (await CreateOrderAsync(order))
            {
                return true;
            }
            return false;
        }
        //public String GetClientId()
        //{

        //}
    }
}
