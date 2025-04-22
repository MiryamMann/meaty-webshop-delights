using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.API;
using Dal.API;
using Dal.Models;
namespace Bl.Services
{
<<<<<<< HEAD
    public class DalOrderService : IDalOrderService
=======
    public class DalOrderService:IDalOrderService
>>>>>>> b9d8e52a2a7b3a92919801bdd2c289a2d16c2fd2
    {
        public List<Order> GetAllOrders()
        {
            var orders = new List<Order>();

<<<<<<< HEAD
            //using (var connection = new SqlConnection("your_connection_string_here"))
            //{
            //    connection.Open();
            //    var command = new SqlCommand("SELECT Id, ClientId, OrderDate, AddressId, TotalPrice FROM ORDERS", connection);

            //    using (var reader = command.ExecuteReader())
            //    {
            //        while (reader.Read())
            //        {
            //            var order = new Order
            //            {
            //                Id = reader.GetInt64(0), // Assuming Id is of type long
            //                ClientId = reader.GetString(1),
            //                OrderDate = reader.GetDateTime(2),
            //                AddressId = reader.GetInt64(3), // Assuming AddressId is of type long
            //                TotalPrice = reader.GetDecimal(4)
            //            };
            //orders.Add(order);
            return orders;
        }



        public bool SuspendeOrder()
        {
            return true;
        }


        public bool UnsuspendeOrder()
        {
            return true;
=======
            using (var connection = new SqlConnection("your_connection_string_here"))
            {
                connection.Open();
                var command = new SqlCommand("SELECT Id, ClientId, OrderDate, AddressId, TotalPrice FROM ORDERS", connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var order = new Order
                        {
                            Id = reader.GetInt64(0), // Assuming Id is of type long
                            ClientId = reader.GetString(1),
                            OrderDate = reader.GetDateTime(2),
                            AddressId = reader.GetInt64(3), // Assuming AddressId is of type long
                            TotalPrice = reader.GetDecimal(4)
                        };
                        orders.Add(order);
                    }
                }
            }

            return orders;
        }
      public  bool SuspendeOrder() { 
        }


       public bool UnsuspendeOrder()
        {

>>>>>>> b9d8e52a2a7b3a92919801bdd2c289a2d16c2fd2
        }
    }
}
