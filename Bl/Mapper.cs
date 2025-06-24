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
        public static BlOrder ToBlOrder(Order dalOrder)
        {
            if (dalOrder == null) return null;

            var blOrder = new BlOrder
            {
                Id = dalOrder.Id,
                ClientId = dalOrder.ClientId,
                OrderDate = dalOrder.OrderDate,
                AddressId = dalOrder.AddressId,
                TotalPrice = dalOrder.TotalPrice,
                StatusId = dalOrder.StatusId,
                OrderItems = new List<BlOrderItem>()
            };

            if (dalOrder.OrderItems != null)
            {
                foreach (var item in dalOrder.OrderItems)
                {
                    blOrder.OrderItems.Add(ToBlOrderItem(item));
                }
            }

            return blOrder;
        }

        public static Order ToDalOrder(BlOrder blOrder)
        {
            if (blOrder == null) return null;

            var dalOrder = new Order
            {
                Id = blOrder.Id,
                ClientId = blOrder.ClientId,
                OrderDate = blOrder.OrderDate,
                AddressId = blOrder.AddressId,
                TotalPrice = blOrder.TotalPrice,
                StatusId = blOrder.StatusId,
                OrderItems = new List<OrderItem>()
            };

            if (blOrder.OrderItems != null)
            {
                foreach (var item in blOrder.OrderItems)
                {
                    dalOrder.OrderItems.Add(ToDalOrderItem(item));
                }
            }

            return dalOrder;
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


        public static BlOrder MapDtoToBlOrder(AddOrderRequestDto dto, long addressId)
        {
            if (dto == null) return null;

            return new BlOrder
            {
                ClientId = dto.ExistingClientId ?? string.Empty, // אם לא קיים, שים מחרוזת ריקה או תטפל אחרת
                OrderDate = dto.OrderDate,
                TotalPrice = dto.TotalPrice,
                StatusId = dto.StatusId,
                AddressId = addressId,
                OrderItems = dto.OrderItems != null
                    ? dto.OrderItems.ConvertAll(ToBlOrderItemFromDto)
                    : new List<BlOrderItem>()
            };
        }
        public static BlOrderItem ToBlOrderItemFromDto(OrderItemDto dto)
        {
            if (dto == null) return null;

            return new BlOrderItem
            {
                ProductId = int.TryParse(dto.ProductId, out var pid) ? pid : 0,
                Amount = dto.Quantity
                // שדות נוספים (OrderItemId, OrderId, PriceOfItem) יישארו ברירת מחדל (0) כי לא קיימים ב-DTO
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
        public static ClientDto ToClientSignUpDto(BlClient client)
        {
            return new ClientDto
            {
              
                FirstName = client.FirstName,
                LastName = client.LastName,
                Email = client.Email,
                Password = client.Password
            };
        }

        public static Client ToDalClient(ClientDto blClient, int addressId)
        {
            if (blClient == null) return null;

            return new Client
            {
                
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
                EntryBuilding = blAddress.EntryBuilding,
            };
        }
        public static BlClient ToBlClient(Client dalClient)
        {
            if (dalClient == null)
                return null;

            return new BlClient
            {
                Id = dalClient.Id,
                FirstName = dalClient.FirstName,
                LastName = dalClient.LastName,
                Email = dalClient.Email,
                Password = dalClient.Password,
                PhoneNumber = dalClient.PhoneNumber,
                AddressId = dalClient.AddressId,
                GoogleId = dalClient.GoogleId,
                RefreshToken = dalClient.RefreshToken,
                RefreshTokenExpiry = dalClient.RefreshTokenExpiry
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

        public static Client ToDalClient(BlClient blClient)
        {
            if (blClient == null)
                return null;

            return new Client
            {
                Id = blClient.Id,
                FirstName = blClient.FirstName,
                LastName = blClient.LastName,
                AddressId = blClient.AddressId,
                Email = blClient.Email,
                Password = blClient.Password,
                RefreshToken = blClient.RefreshToken,
                RefreshTokenExpiry = blClient.RefreshTokenExpiry,
                GoogleId = blClient.GoogleId,
                PhoneNumber = blClient.PhoneNumber
            };
        }

    }



}
