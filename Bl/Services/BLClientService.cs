using Bl.API;
using Microsoft.Data.SqlClient;
using Dal.Services;
using Bl;
using Bl.Moduls;
using Microsoft.EntityFrameworkCore;
using Dal.Models;
using System.Linq.Expressions;
using Dal.models;
using Dal;
using Bl.API.BTOs;
using Bl.API.DTOs;

namespace Bl.Services
{
    public class BLClientService : IBLClientServices
    {
        private string connectionString = "your_connection_string_here";
        private readonly IDalClientService DalClientService;
        private readonly IJwtService _jwtService;
        long orderId;

        public BLClientService(IDalClientService dalClientService, IJwtService jwtService)
        {
            DalClientService = dalClientService;
            _jwtService = jwtService;
        }

        public async Task<bool> LogIn(string email, string password)
        {
            var loginResult = await LoginWithTokensAsync(new ClientLoginDto
            {
                Email = email,
                Password = password
            });

            return loginResult != null;

        }
        public async Task<bool> SignUpAsync(ClientSignUpDto signUpDto)
        {
            var address = new Address
            {
                Street = signUpDto.Address.Street,
                City = signUpDto.Address.City,
                Zip = signUpDto.Address.ZipCode,
                BuildingNumber = signUpDto.Address.BuildingNumber
            };

            await DalClientService.AddAddressAsync(address); 
            int addresId = (int)address.Id;

            var client = Mapper.ToDalClient(signUpDto, addresId);

            return await DalClientService.SignUpAsync(client);
        }

        public async Task<LoginResponseDto?> LoginWithTokensAsync(ClientLoginDto dto)
        {
            var dalClient = DalClientService.GetClientByEmail(dto.Email);
            if (dalClient == null || dalClient.Password != dto.Password)
                return null;//exseption

            var blClient = Mapper.ToBlClient(dalClient);

            var accessToken = _jwtService.GenerateToken(blClient);
            var refreshToken = _jwtService.GenerateRefreshToken();

            dalClient.RefreshToken = refreshToken;
            dalClient.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            await DalClientService.UpdateAsync(dalClient);

            return new LoginResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public bool AddProduct(BlOrderItem orderItem)
        {
            if (orderItem == null)
                return false;

            var dalorderItem = Mapper.ToDalOrderItem(orderItem);
            var _order = DalClientService.GetOrderById(dalorderItem.OrderId);
            if (_order != null)
            {
                DalClientService.AddProduct(dalorderItem, _order);
                if (DalClientService.IsOrderContainsOrderItem(_order, dalorderItem))
                {
                    return true;
                }
                return false;
            }
            return false;
        }

        public async Task<bool> AddOrder(ClientSignUpDto clientDto, BlOrder order)
        {
            if (DalClientService.ClientExist(clientDto.Id) == null)
            {
                if (!await LogIn(clientDto.Email, clientDto.Password))
                {
                    return false;//לזמן את SIGN UP
                }

                if (!await SignUpAsync(clientDto))
                {
                    return false;
                }
            }

            if (CreateNewOrder(order))
            {
                foreach (var item in order.OrderItems)
                {
                    if (!AddProduct(item))
                    {
                        return false;
                    }
                }
                return true;
            }

            return false;
        }

        public bool CreateNewOrder(BlOrder order)
        {
            DalClientService.CreateNewOrder(Mapper.ToDalOrder(order));
            if (DalClientService.OrderExist(Mapper.ToDalOrder(order)) == null)
            {
                return false;
            }
            return true;
        }

        public bool RemoveProduct(BlOrderItem orderItem, BlOrder createOrder)
        {
            return true; // עוד לא מיושם
        }

        private BlOrder GetOrderById(long orderId)
        {
            var dalOrder = DalClientService.GetOrderById(orderId);
            if (dalOrder == null) return null;

            return Mapper.ToBlOrder(dalOrder);
        }

        public bool LogOut()
        {
            return true; // עוד לא מיושם
        }

        public Order BeginOrder(string clientId)
        {
            return null; // עוד לא מיושם
        }

        public List<BlOrder> GetAllOrders(string clientId)
        {
            var orders = DalClientService.GetAllOrders(clientId);
            return Mapper.ToListBlOrder(orders);
        }

        public List<BlProduct> GetAllProducts()
        {
            if (DalClientService == null)
            {
                Console.WriteLine("DalClientService is null!");
                return null;
            }
            var products = DalClientService.GetAllProducts();
            return Mapper.ToListBlProduct(products);
        }

        BlOrder IBLClientServices.GetOrderById(long orderId)
        {
            return GetOrderById(orderId);
        }

        public bool IsOrderContainsOrderItem(BlOrder order, BlOrderItem orderItem)
        {
            throw new NotImplementedException();
        }

        public BlOrder FindOrderOfOrderItem(BlOrderItem orderItem)
        {
            throw new NotImplementedException();
        }

        public BlClient ClientExist(string clientId)
        {
            return null; // עוד לא מיושם
        }

        public BlOrder OrderExist(BlOrder order)
        {
            return Mapper.ToBlOrder(DalClientService.OrderExist(Mapper.ToDalOrder(order)));
        }

        public bool SignUp(ClientSignUpDto client)
        {
            throw new NotImplementedException();
        }
    }
}
