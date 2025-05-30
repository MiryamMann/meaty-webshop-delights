using Bl.API.BTOs;
using Bl.API.DTOs;
using Bl.API;
using Bl.Moduls;
using Dal.models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class ClientAuthService : IClientAuthService
    {
        private readonly IClientDal _dal;
        private readonly IClientAuthDal _authDal;
        private readonly IJwtService _jwt;

        public ClientAuthService(IClientDal dal, IJwtService jwt, IClientAuthDal authDal)
        {
            _dal = dal;
            _jwt = jwt;
            _authDal = authDal;
        }

        public async Task<BlClient?> SignUpAsync(ClientSignUpDto dto)
        {
            if (await _authDal.ExistsByEmailAsync(dto.Email))
                throw new Exception();

            var address = new Address
            {
                Street = dto.Address.Street,
                City = dto.Address.City,
                Zip = dto.Address.ZipCode,
                BuildingNumber = dto.Address.BuildingNumber
            };

            await _authDal.AddAddressAsync(address);
            if (address.Id == 0)
                throw new Exception("Address insertion failed.");

            var client = Mapper.ToDalClient(dto, (int)address.Id);
            client.Password = new PasswordHasher<Client>().HashPassword(client, dto.Password);

            return await _authDal.SignUpAsync(client);
        }

        public async Task<BlClient?> LoginAsync(ClientLoginDto dto)
        {
            var client = _dal.GetClientByEmail(dto.Email);

            if (client == null)
            {
                Console.WriteLine("❌ client is null");
                return null;
            }

            if (client.Password == null)
            {
                Console.WriteLine("❌ client.Password is null even though DB says otherwise");
                return null;
            }

            var hasher = new PasswordHasher<Client>();
            var result = hasher.VerifyHashedPassword(client, client.Password, dto.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                Console.WriteLine("❌ Password verification failed");
                return null;
            }

            return Mapper.ToBlClient(client);
        }
        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _authDal.ExistsByEmailAsync(email);
        }

        public async Task<LoginResponseDto?> LoginWithGoogleTokenAsync(string idToken)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

            var dalClient = _dal.GetClientByEmail(payload.Email);

            if (dalClient == null)
            {
                // יצירת משתמש חדש עם מזהה גוגל
                dalClient = new Client
                {
                    Email = payload.Email,
                    FirstName = payload.Name,
                    GoogleId = payload.Subject
                };

                // הוספה למסד הנתונים
                await _authDal.SignUpAsync(dalClient);
            }
            else if (dalClient.GoogleId == null)
            {
                // משתמש קיים אבל אין לו GoogleId – נעדכן אותו
                dalClient.GoogleId = payload.Subject;
                await _authDal.UpdateAsync(dalClient);
            }
            Console.WriteLine($"Saving client: Email={dalClient.Email}, GoogleId={dalClient.GoogleId}");

            // יצירת טוקנים
            var blClient = Mapper.ToBlClient(dalClient);
            var accessToken = _jwt.GenerateToken(blClient);
            var refreshToken = _jwt.GenerateRefreshToken();

            // עדכון טוקן במסד
            dalClient.RefreshToken = refreshToken;
            dalClient.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _authDal.UpdateAsync(dalClient);

            return new LoginResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
