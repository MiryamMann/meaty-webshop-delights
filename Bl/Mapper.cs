using System;
using System.Collections.Generic;
using Bl.API;
using Bl.API.DTOs;
using Bl.Moduls;
using Bl.Services;
using Dal;
using Dal.API;
using Dal.models;
using Dal.Models;
using Dal.Services;

namespace Bl
{
    public class Mapper
    {
        // ===== DAL → BL =====
        public static BlOrder ToBlOrder(Order dalOrder)
        {
            if (dalOrder == null) return null;
           var blOrder= new BlOrder
            {
                Id = dalOrder.Id,
                ClientId = dalOrder.ClientId,
                OrderDate = dalOrder.OrderDate,
                AddressId = dalOrder.AddressId,
                TotalPrice = dalOrder.TotalPrice,
                StatusId = dalOrder.StatusId,
               OrderItems = new List<BlOrderItem>()
           };
            foreach (var item in dalOrder.OrderItems)
            {
                blOrder.OrderItems.Add(Mapper.ToBlOrderItem(item)); // הנח שיש מתודה הממירה פריט להזמנה
            }

            return blOrder;
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

        public static List<BlOrder> ToListBlOrder(List<Order> dalOrders)
        {
            return dalOrders?.ConvertAll(ToBlOrder);
        }

        public static List<BlProduct> ToListBlProduct(List<Product> dalProducts)
        {
            return dalProducts?.ConvertAll(ToBlProduct);
        }

        // ===== BL → DAL =====
        public static Order ToDalOrder(BlOrder blOrder)
        {
            if (blOrder == null) return null;
            var dalOrder= new Order
            {
                Id = blOrder.Id,
                ClientId = blOrder.ClientId,
                OrderDate = blOrder.OrderDate,
                AddressId = blOrder.AddressId,
                TotalPrice = blOrder.TotalPrice,
                StatusId = blOrder.StatusId,
                OrderItems = new List<OrderItem>()
            };
            foreach (var item in blOrder.OrderItems)
            {
               Mapper.ToDalOrder(blOrder).OrderItems.Add(Mapper.ToDalOrderItem(item)); // הנח שיש מתודה הממירה פריט להזמנה
            }
            return dalOrder;
        }

        public static Product ToDalProduct(BlProduct blProduct)
        {
            if (blProduct == null) return null;
            return new Product
            {
                Id = blProduct.Id,
                CategoryId = blProduct.CategoryId,
                Name = blProduct.Name,
                PricePerKilo = blProduct.PricePerKilo,
            };
        }
        public static ClientSignUpDto ToClientSignUpDto(BlClient client)
        {
            return new ClientSignUpDto
            {
                Id = client.Id,
                FirstName = client.FirstName,
                LastName = client.LastName,
                Email = client.Email,
                Password = client.Password
            };
        }

        public static Client ToDalClient(ClientSignUpDto blClient, int addressId)
        {
            if (blClient == null) return null;

            return new Client
            {
                Id = blClient.Id,
                FirstName = blClient.FirstName,
                LastName = blClient.LastName,
                AddressId = addressId, // ⬅️ שימו לב: מקבל AddressId מבחוץ
                Email = blClient.Email,
                Password = blClient.Password
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

        public static Category ToDalCategory(BlCategory blCategory)
        {
            if (blCategory == null) return null;
            return new Category
            {
                Id = blCategory.Id,
                Name = blCategory.Name,
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
                ProductId = blOrderItem.ProductId
            };
        }
        public static DalManager ToDalManager(BLManager blManager)
        {
            if (blManager == null) return null;

            return new DalManager
            {
                ClientService = blManager.ClientService != null
                    ? ToDalClientService(blManager.ClientService)
                    : null,
                OrderService = blManager.OrderService != null
                    ? ToDalOrderService(blManager.OrderService)
                    : null
            };
        }
        private static IDalClientService ToDalClientService(IBLClientServices blClientService)
        {
            // כאן את יכולה להחזיר אובייקט שמממש את הממשק מתוך BL, אם יש התאמה
            // לדוגמה:
            return new DalClientService(); // או המרה עם תוכן, תלוי במימוש שלך
        }

        private static IDalOrderService ToDalOrderService(IBLOrderServices blOrderService)
        {
            return new DalOrderService();
        }
        public static DalManager ToDalManagerFromProduct(Product product)
        {
            if (product == null)
                return null;

            // יוצרים אובייקט של DalClientService עם פונקציה שתדע לטפל במוצר הזה
            var dalClientService = new DalClientService();

            var dalManager = new DalManager
            {
                ClientService = dalClientService,
                // אם יש לך גם OrderService – את יכולה להוסיף גם אותו
                OrderService = new DalOrderService()
            };

            return dalManager;
        }
        

    }


}
