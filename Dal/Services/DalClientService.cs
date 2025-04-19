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
            if(context==null)
                Console.WriteLine("sbclaa null");
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Order GetOrderById(long orderId)
        {
            var order = _context.Orderes.FirstOrDefault(o => o.Id == orderId);
           if (order == null)
                return null;

           return order;
        }

        public void AddProductToOrder( DalManager orderItem, long orderId)
        {

            GetOrderById(orderId).OrderItems.Add(orderItem.orderItem);
            _context.SaveChanges(); // Save to database

        }

        public List<Product> GetAllProducts()
        {
            try { 
            return _context.Products.ToList();}
            catch(Exception ex)
{
                Console.WriteLine(ex.ToString());
                throw; // כדי לא להשתיק לגמרי
            }
           
        }
        public List<Order> GetAllOrders(string clientId)
        {
            return _context.Orderes
       .Where(order => order.ClientId == clientId) // Assuming the order has a CustomerId property
       .ToList(); 
        }
        public bool RemoveProduct(Product product)
        {
            throw new NotImplementedException();
        }

       
    }
    }

    



