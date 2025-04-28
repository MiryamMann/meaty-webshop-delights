using Bl.API;
using Bl.Moduls;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BLOrderService : IBLOrderServices
    {
        private string connectionString = "your_connection_string_here";
        public List<BlOrder> GetAllOrders()
        {


            var orders = new List<BlOrder>();

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var command = new SqlCommand("SELECT Id, ClientId, OrderDate, AddressId, TotalPrice FROM ORDERS", connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var order = new BlOrder
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
        {
            throw new NotImplementedException();
        }

        public bool UnsuspendeOrder()
        {
            throw new NotImplementedException();
        }

    }
}
