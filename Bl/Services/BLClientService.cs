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
using Microsoft.AspNetCore.Identity;
using Bl.API.DTOs;
using Bl.API.BTOs;
using Google.Apis.Auth;

namespace Bl.Services
{
    public class BLClientService : IBLClientServices
    {
        private readonly PasswordHasher<BlClient> _passwordHasher = new();
        private readonly IDalClientService DalClientService;
        private readonly IJwtService _jwtService;
        long orderId;

        public BLClientService(IDalClientService dalClientService, IJwtService jwtService)
        {
            DalClientService = dalClientService;
            _jwtService = jwtService;
        }
        #region Athentication



        public async Task<bool> SignUpAsync(ClientSignUpDto signUpDto)
        {
            if (await DalClientService.ExistsByEmailAsync(signUpDto.Email))
                return false;

            var address = new Address
            {
                Street = signUpDto.Address.Street,
                City = signUpDto.Address.City,
                Zip = signUpDto.Address.ZipCode,
                BuildingNumber = signUpDto.Address.BuildingNumber
            };

            await DalClientService.AddAddressAsync(address);

            if (address.Id == 0)
                throw new Exception("Address insertion failed.");

            var client = Mapper.ToDalClient(signUpDto, (int)address.Id);

            var hasher = new PasswordHasher<Client>();
            client.Password = hasher.HashPassword(client, signUpDto.Password);

            return await DalClientService.SignUpAsync(client);
        }
        public async Task<LoginResponseDto?> LoginWithGoogleTokenAsync(string idToken)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

            // חיפוש לפי אימייל – כי זה המזהה הבטוח ביותר
            var dalClient = DalClientService.GetClientByEmail(payload.Email);
            if (dalClient == null)
            {
                // אם לא קיים – יוצרים משתמש חדש
                dalClient = new Client
                {
                    Email = payload.Email,
                    FirstName = payload.Name,
                    // אין סיסמה – כי זה גוגל
                    RefreshToken = null
                };
                await DalClientService.SignUpAsync(dalClient);
            }

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

        public async Task<ClientLoginDto?> LoginAsync(ClientLoginDto loginDto)
        {
            var client = await DalClientService.GetByEmailAndPasswordAsync(loginDto.Email, loginDto.Password);

            if (client == null)
                return null;
            var hasher = new PasswordHasher<Client>();
            client.Password = hasher.HashPassword(client, loginDto.Password);

            return new ClientLoginDto
            {
                Password = client.Password,
                Email = client.Email,
            };
        }
        public async Task<Client> GetOrCreateGoogleClientAsync(string email, string name, string googleId)
        {
            var client = await GetClientByEmailAsync(email);
            if (client == null)
            {
                client = new Client
                {
                    Email = email,
                    FirstName = name,
                    GoogleId = googleId
                };

                await DalClientService.SignUpAsync(client);
            }

            return client;
        }
        public async Task<Client?> GetClientByEmailAsync(string email)
        {
          return  DalClientService.GetClientByEmail(email);
        }


        #endregion
        #region Product

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
        public bool RemoveProduct(BlOrderItem orderItem, BlOrder createOrder)
        {
            return true; // עוד לא מיושם
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

        #endregion
        #region Order

        public async Task<bool> AddOrder(ClientSignUpDto clientDto, BlOrder order)
        {
            if (DalClientService.ClientExist(clientDto.Password) == null)
            {


                if (!await DalClientService.LogIn(clientDto.Email, clientDto.Password))
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

        private BlOrder GetOrderById(long orderId)
        {
            var dalOrder = DalClientService.GetOrderById(orderId);
            if (dalOrder == null) return null;

            return Mapper.ToBlOrder(dalOrder);
        }


        public BlOrder OrderExist(BlOrder order)
        {
            return Mapper.ToBlOrder(DalClientService.OrderExist(Mapper.ToDalOrder(order)));
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


        #endregion
        #region Client

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await DalClientService.ExistsByEmailAsync(email);
        }


        #endregion



    }
}
