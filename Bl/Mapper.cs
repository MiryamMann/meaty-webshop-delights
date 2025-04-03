using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Bl.API;
using Bl.Moduls;
using Dal.API;
using Dal.Models;
using Bl.Services;
namespace Bl
{
    public class Mapper
    {
     
        public static BlOrder ToBlOrder(Order dalOrder)
        {
            if (dalOrder == null) return null;
            return new BlOrder
            {
                Id = dalOrder.Id,
                ClientId = dalOrder.ClientId,
                OrderDate = dalOrder.OrderDate,
                AddressId = dalOrder.AddressId,
                TotalPrice = dalOrder.TotalPrice,
                StatusId = dalOrder.StatusId,
                OrderItems = dalOrder.OrderItems
            };
        }
        public static BlAddress ToBlAddress(Address dalAddress)
        {
            if (dalAddress == null)
                return null;
            return new BlAddress
            {
                Id = dalAddress.Id,
                City = dalAddress.City,
                Street = dalAddress.Street,
                Zip = dalAddress.Zip,
                BuildingNumber = dalAddress.BuildingNumber,
                ApartmentNumber = dalAddress.ApartmentNumber,
                EntryBuilding = dalAddress.EntryBuilding
            };

        }
        public static BlCategory ToBlCategory(Category dalCategory)
        {
            if (dalCategory == null) return null;
            return new BlCategory
            {
                Id = dalCategory.Id,
                Name = dalCategory.Name,
            };
        }
        public static BlClient ToBlClient(Client dalClient)
        { 
        if(dalClient==null)return null;
            return new BlClient
            {
                Id = dalClient.Id,
                FirstName = dalClient.FirstName,
                LastName = dalClient.LastName,
                AddressId = dalClient.AddressId,
                Email = dalClient.Email,
                Password = dalClient.Password
            };
        }
        public static BlOrderItem ToBlOrderItem(OrderItem dalOrderItem)
        { if (dalOrderItem == null) return null;
            return new BlOrderItem
            {
                Amount = dalOrderItem.Amount,
                OrderId = dalOrderItem.OrderId,
                OrderItemId = dalOrderItem.OrderItemId,
                PriceOfItem = dalOrderItem.PriceOfItem,
                ProductId = dalOrderItem.ProductId,
            };
        
        }
       public static List<BlOrder> ToListBlOrder(List<Order> blOrders)
        {
            List<BlOrder> convertedOrders = new List<BlOrder>();

            foreach (var item in blOrders)
            {
                var convertedOrder = ToBlOrder(item); // Assuming this method converts a single BlOrder
                convertedOrders.Add(convertedOrder); // Add converted order to the new list
            }

            return convertedOrders; // Return the
        }
        public static List<BlProduct> ToListBlProduct(List<Product> blProducts)
        {
            List<BlProduct> convertedProduct = new List<BlProduct>();

            foreach (var item in blProducts)
            {
                var convertedP = ToBlProduct(item); // Assuming this method converts a single BlOrder
                convertedProduct.Add(convertedP); // Add converted order to the new list
            }

            return convertedProduct;

        }
        public static BlProduct ToBlProduct(Product dalProduct)
        {
            if (dalProduct == null) return null;
            return new BlProduct
            {
                CategoryId = dalProduct.CategoryId,
                //HechsherId = dalProduct.,
                Id = dalProduct.Id,
                Name = dalProduct.Name,
                PricePerKilo = dalProduct.PricePerKilo,
            };
        }
        
        }
        }



    

   