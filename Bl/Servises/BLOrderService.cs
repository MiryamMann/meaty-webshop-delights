using Bl.API;
using Bl.Moduls;
using Dal.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BLOrderService : IBLOrderService
    {
        private readonly DalOrderService _orderRepository;

        public BLOrderService(DalOrderService orderRepository)
        {
            _orderRepository = orderRepository; // Injecting the order repository
        }

        public List<BlOrder> GetAllOrders()
        {
            return Mapper.ToListBlOrder(_orderRepository.GetAllOrders()); ; // Call to DAL method
        }


        public bool SuspendeOrder()
        {
            return true;
        }

        public bool UnsuspendeOrder()
        {
            throw new NotImplementedException();
        }

       
    }
}
