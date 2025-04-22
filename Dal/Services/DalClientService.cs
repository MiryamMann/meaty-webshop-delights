using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.API;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Bl;
using Dal.Models;
namespace Dal.Services
{
    public class DalClientService : IDalClientService
    {
        private readonly DatabaseContext _context;


        public DalClientService(DatabaseContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Order GetOrderById(long orderId)
        {
            var order = _context.Orderes.FirstOrDefault(o => o.Id == orderId);
            if (order == null)
                return null;

            return order;
        }

        public bool AddProductToOrder(IDalManager orderItem, long orderId)
        {
            //orderItem = orderItem.orderItem;
            //using (SqlConnection connection = new SqlConnection("your_connection_string_here"))
            //{
            //    string query = "INSERT INTO OrderProducts (OrderId, ProductId, Quantity) VALUES (@OrderId, @ProductId, @Quantity)";
            //    SqlCommand command = new SqlCommand(query, connection);

            //    // Adding parameters to the SQL command to prevent SQL injection
            //    command.Parameters.AddWithValue("@OrderId", orderId);
            //    command.Parameters.AddWithValue("@ProductId", orderItem.ProductId); // Assuming OrderItem has ProductId
            //    command.Parameters.AddWithValue("@Quantity", orderItem.Amount); // Assuming OrderItem has Amount

            //    try
            //    {
            //        // Open connection and execute the insert command
            //        connection.Open();
            //        command.ExecuteNonQuery(); // This line adds the product to the database
            //        return true; // Return true if the operation is successful
            //    }
            //    catch (Exception)
            //    {
            //        // Log the exception or handle it accordingly
            //        return false; // Return false if there is an exception
            //    }
            //}
            return true;
        }
        public List<Product> GetAllProducts()
        {
            try
            {
                return _context.Products.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw; // כדי לא להשתיק לגמרי
            }

        }
        public List<Order> GetAllOrders(string clientId)
        {
            try
            {
                return _context.Orderes.ToList() // Assuming the DbSet is named "Orders" and not "Orderes"
                    .Where(order => order.ClientId == clientId) // Filter orders by clientId
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString()); // Log the exception
                throw; // Rethrow to let the caller handle it
            }
        }
        public bool RemoveProduct(IDalManager product, long orderId)
        {
            //    using (SqlConnection connection = new SqlConnection("your_connection_string_here"))
            //    {
            //        string query = "DELETE FROM OrderProducts WHERE OrderId = @OrderId AND ProductId = @ProductId";
            //        SqlCommand command = new SqlCommand(query, connection);

            //        // Adding parameters to the SQL command to prevent SQL injection
            //        command.Parameters.AddWithValue("@OrderId", orderId);
            //        command.Parameters.AddWithValue("@ProductId", product.Id); // Assuming Product has Id

            //        try
            //        {
            //            // Open connection and execute the delete command
            //            connection.Open();
            //            int affectedRows = command.ExecuteNonQuery(); // This line removes the product from the database

            //            // Return true if at least one row was affected (product was deleted)
            //            return affectedRows > 0;
            //        }
            //        catch (Exception)
            //        {
            //            // Log the exception or handle it accordingly
            //            return false; // Return false if there is an exception
            //        }
            //    }
            return true;
        }
        public bool LogIn(string id, string passward)
        {
            // Ensure the parameters are not null or empty
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(passward))
            {
                return false; // Invalid credentials
            }

            // Check the user in the database
            var user = _context.Clients
                .FirstOrDefault(u => u.Id == id && u.Password == passward);

            return user != null; // Return true if user exists, otherwise false
        }
        public bool SignUp(IDalManager client)
        {
            //{
            //    // Check if the client already exists
            //    var existingClient = _context.Clients
            //        .FirstOrDefault(c => c.Id == client.Id);

            //    if (existingClient != null)
            //    {
            //        return false; // Client already exists
            //    }

            //    // Create new client
            //    _context.Clients.Add(client);

            //    // Save changes and return success status
            return _context.SaveChanges() > 0; // Returns true if a client was created successfully
        }
        bool LogOut()
        {

            return true;
        }

        bool BeginOrder()
        {
            return true;
        }

        bool FinishOrder()
        {
            return true;
        }
        bool Payment()
        {
            return true;
        }

        void IDalClientService.AddProductToOrder(IDalManager product, long orderId)
        {
            throw new NotImplementedException();
        }

        bool IDalClientService.LogOut()
        {
            throw new NotImplementedException();
        }

        bool IDalClientService.BeginOrder()
        {
            throw new NotImplementedException();
        }

        bool IDalClientService.FinishOrder()
        {
            throw new NotImplementedException();
        }

        bool IDalClientService.Payment()
        {
            throw new NotImplementedException();
        }
    }

       
}

    



