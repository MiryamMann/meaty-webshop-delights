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
using Dal.models;

namespace Dal.Services
{
    public class DalClientService : IDalClientService
    {
        public readonly dbClass _context;
        #region Constractors
        public DalClientService(dbClass context)
        {
            if (context == null)
                Console.WriteLine("sbclaa null");
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public DalClientService()
        {

        }
        #endregion
        #region Order
        public Order GetOrderById(long orderId)
        {
            var order = _context.Orderes.FirstOrDefault(o => o.Id == orderId);
            return order;
        }
        public Order CreateOrder(Order order, string clientId)
        {
            _context.Orderes.Add(order);
            _context.SaveChanges(); // חייבים כדי לקבל Id
            return order;
        }
        public Order FindOrderOfOrderItem(OrderItem orderItem)
        {
            var order = _context.Orderes.FirstOrDefault(o => o.Id == orderItem.OrderId);
            return order;
        }
        public void CreateNewOrder(Order order)
        {
            _context.Orderes.Add(order);
            _context.SaveChanges();

        }
        public Order OrderExist(Order order)
        {
            return _context.Orderes.FirstOrDefault(o => o.Id == order.Id);
        }
        public List<Order> GetAllOrders(string clientId)
        {
            return _context.Orderes
       .Where(order => order.ClientId == clientId)
       .ToList();

        }


        #endregion

        #region Product
        public bool IsOrderContainsOrderItem(Order order, OrderItem orderItem) 
        {
            return order.OrderItems.Contains(orderItem);
        }

        public void AddProduct(OrderItem orderItem, Order order)
        {

            order.OrderItems.Add(orderItem);
            _context.SaveChanges();
        }

        public List<Product> GetAllProducts()
        {

            return _context.Products.ToList();
        }
        public void RemoveProduct(OrderItem orderItem, Order order)
        {
            order.OrderItems.Remove(orderItem);
            _context.SaveChanges();


        }
        #endregion

        #region Client

        public Client ClientExist(string clientId)
        {
            return _context.Clients.FirstOrDefault(c => c.Id.Equals(clientId));

        }
        #endregion
        #region Athentication
        public async Task<bool> SignUpAsync(Client client)
        {
            try
            {
                _context.Clients.Add(client);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> LogIn(string email, string password)
        {
            return await _context.Clients
                .AnyAsync(c => c.Email == email && c.Password == password);
        }


        public async Task<int> AddAddressAsync(Address address)
        {
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
            return (int)address.Id; // מחזיר את ה-ID של הכתובת החדשה
        }

        public bool SignUp(Client client)
        {
            try { _context.Clients.Add(client); } catch { }
            return _context.Clients.FirstOrDefault(c => c.Id == client.Id) != null;

        }
        #endregion
        #region Token
        public async Task<bool> GetByEmailAsync(string email)
        {
            return await _context.Clients.AnyAsync(c => c.Email == email);
        }


        public async Task<bool> IsEmailExistsAsync(string email)
        {
            return await _context.Clients
                .AnyAsync(c => c.Email == email);
        }

        public async Task UpdateAsync(Client client)
        {
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public Client GetClientByEmail(string email)
        {
            if (email == null)
                return null;

            Client c = _context.Clients.FirstOrDefault(c => c.Email == email);
            return c;
        }

        #endregion
        //נראה שצריך לבטל את זה
        //public void Save()
        //{
        //    _context.SaveChanges();
        //}
    }
}





