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
    public static class Mapper
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
                //OrderItems = dalOrder.OrderItems.Select(ToBlOrderItem).ToList() // Ensure to map OrderItems
            };
        }

        public static Order ToDalOrder(BlOrder blOrder)
        {
            if (blOrder == null) return null;
            return new Order
            {
                Id = blOrder.Id,
                ClientId = blOrder.ClientId,
                OrderDate = blOrder.OrderDate,
                AddressId = blOrder.AddressId,
                TotalPrice = blOrder.TotalPrice,
                StatusId = blOrder.StatusId,
                //OrderItems = blOrder.OrderItems.Select(ToDalOrderItem).ToList() // Ensure to map OrderItems
            };
        }

        public static BlAddress ToBlAddress(Address dalAddress)
        {
            if (dalAddress == null) return null;
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

        public static Address ToDalAddress(BlAddress blAddress)
        {
            if (blAddress == null) return null;
            return new Address
            {
                Id = blAddress.Id,
                City = blAddress.City,
                Street = blAddress.Street,
                Zip = blAddress.Zip,
                BuildingNumber = blAddress.BuildingNumber,
                ApartmentNumber = blAddress.ApartmentNumber,
                EntryBuilding = blAddress.EntryBuilding
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

        public static Category ToDalCategory(BlCategory blCategory)
        {
            if (blCategory == null) return null;
            return new Category
            {
                Id = blCategory.Id,
                Name = blCategory.Name,
            };
        }

        public static BlClient ToBlClient(Client dalClient)
        {
            if (dalClient == null) return null;
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

        public static Client ToDalClient(BlClient blClient)
        {
            if (blClient == null) return null;
            return new Client
            {
                Id = blClient.Id,
                FirstName = blClient.FirstName,
                LastName = blClient.LastName,
                AddressId = blClient.AddressId,
                Email = blClient.Email,
                Password = blClient.Password
            };
        }

        public static BlOrderItem ToBlOrderItem(OrderItem dalOrderItem)
        {
            if (dalOrderItem == null) return null;
            return new BlOrderItem
            {
                Amount = dalOrderItem.Amount,
                OrderId = dalOrderItem.OrderId,
                OrderItemId = dalOrderItem.OrderItemId,
                PriceOfItem = dalOrderItem.PriceOfItem,
                ProductId = dalOrderItem.ProductId,
            };
        }

        public static OrderItem ToDalOrderItem(BlOrderItem blOrderItem)
        {
            if (blOrderItem == null) return null;
            return new OrderItem
            {
                Amount = blOrderItem.Amount,
                OrderId = blOrderItem.OrderId,
                OrderItemId = blOrderItem.OrderItemId,
                PriceOfItem = blOrderItem.PriceOfItem,
                ProductId = blOrderItem.ProductId,
            };
        }

        public static List<BlOrder> ToListBlOrder(List<Order> dalOrders)
        {
            if (dalOrders == null) return new List<BlOrder>();
            return dalOrders.Select(ToBlOrder).ToList();
        }

        public static List<Order> ToListDalOrder(List<BlOrder> blOrders)
        {
            if (blOrders == null) return new List<Order>();
            return blOrders.Select(ToDalOrder).ToList();
        }

        public static BlProduct ToBlProduct(Product dalProduct)
        {
            if (dalProduct == null) return null;
            return new BlProduct
            {
                CategoryId = dalProduct.CategoryId,
                Id = dalProduct.Id,
                Name = dalProduct.Name,
                PricePerKilo = dalProduct.PricePerKilo,
            };
        }

        public static Product ToDalProduct(BlProduct blProduct)
        {
            if (blProduct == null) return null;
            return new Product
            {
                CategoryId = blProduct.CategoryId,
                Id = blProduct.Id,
                Name = blProduct.Name,
                PricePerKilo = blProduct.PricePerKilo,
            };
        }

        public static List<BlProduct> ToListBlProduct(List<Product> dalProducts)
        {
            if (dalProducts == null) return new List<BlProduct>();
            return dalProducts.Select(ToBlProduct).ToList();
        }

        public static List<Product> ToListDalProduct(List<BlProduct> blProducts)
        {
            if (blProducts == null) return new List<Product>();
            return blProducts.Select(ToDalProduct).ToList();
        }
    }
    
}



    

   