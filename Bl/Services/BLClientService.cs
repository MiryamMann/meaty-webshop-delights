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
        private string connectionString = "your_connection_string_here";
        private readonly IDalClientService DalClientService;
        long orderId;//צריך לבדוק איך מאתחלים אותו! מאיפה מקבלים אותו?  מחפשים את מספר ההזמנה לפי משהו
        public BLClientService(IDalClientService dalClientService)
        {
            DalClientService = dalClientService;
            if (dalClientService == null)
            {
                Console.WriteLine("ctor null");
            }
        }

        public bool AddProduct(IBLManager IBL, long orderId)
        {
            if (IBL.product == null)
            {
                return false;
            }
            var order = GetOrderById(orderId);
            var item = order.OrderItems.FirstOrDefault(o => o.OrderItemId == orderId);
            if (item != null)
            {
                order.OrderItems.Add(item);
            }
            // Store in database
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO OrderProducts (OrderId, ProductId, Quantity) VALUES (@OrderId, @ProductId, @Quantity)";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@OrderId", orderId);
                command.Parameters.AddWithValue("@ProductId", IBL.product.Id); // Assuming product has an Id property
                command.Parameters.AddWithValue("@Quantity", IBL.orderItem.Amount); // Assuming product has a Quantity property

                connection.Open();
                int result = command.ExecuteNonQuery();

                return result > 0; // Returns true if insert was successful
            }
        }
        public bool RemoveProduct(BlProduct product)
        {
            if (product == null)
                return false;
            var order = GetOrderById(orderId);
            if (order == null)
            { return false; }

            var result = order.OrderItems.FirstOrDefault(o => o.ProductId == product.Id);
            order.OrderItems.Remove(result);
            return true;

        }
        private BlOrder GetOrderById(long orderId)
        {
            if (DalClientService.GetOrderById(orderId) == null) return null;
            var s = DalClientService.GetOrderById(orderId);
            return Mapper.ToBlOrder(s);
        }

        public bool LogIn(string id, string passward)
        {
            throw new NotImplementedException();
        }

        public bool SignUp(BlClient client)
        {
            throw new NotImplementedException();
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
            var orders = DalClientService.GetAllOrders(clientId);
            return Mapper.ToListBlOrder(orders);

        }
        public List<BlProduct> GetAllProducts()
        {
            if (DalClientService == null)
            { Console.WriteLine("null"); }
            else
            {
                var products = DalClientService.GetAllProducts();
                return Mapper.ToListBlProduct(products);
            }
            return null;

        }


    }
}