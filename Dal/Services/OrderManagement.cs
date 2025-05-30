using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.API;
using Dal.Models;
using Microsoft.Data.SqlClient;
namespace Bl.Services
{
    public class OrderManagementService: IOrderManagementDal
    {
        public List<Order> GetAllOrders()
        {
            var orders = new List<Order>();

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
        public bool SuspendeOrder()
        {return true;
        }


        public bool UnsuspendeOrder()
        {return false;

        }
    }
}
