using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.API
{
    using Dal.models;
    using global::Dal.Models;
    using System.Collections.Generic;

    
        public interface IOrderDal
        {
            Order GetOrderById(long orderId);
            void CreateNewOrder(Order order);
            Order OrderExist(Order order);
            List<Order> GetAllOrders(string clientId);
            Order FindOrderOfOrderItem(OrderItem orderItem);
        }
    }
