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
        public async Task<BlClient?> GetByRefreshTokenAsync(string refreshToken)
        {
            var client = await _authDal.GetByRefreshTokenAsync(refreshToken);
            if (client == null)
                return null;

            return Mapper.ToBlClient(client);
        }
        public async Task UpdateAsync(BlClient client)
        {
            try
            {
                var dalClient = Mapper.ToDalClient(client);
                await _authDal.UpdateAsync(dalClient);
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ שגיאה בעדכון לקוח:");
                Console.WriteLine(ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("➡ Inner exception:");
                    Console.WriteLine(ex.InnerException.Message);
                }

                throw; // תזרקי שוב אם את רוצה לראות אותה גם בקונסולה הראשית
            }
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

            var savedClient = await _authDal.SignUpAsync(client);
            return Mapper.ToBlClient(savedClient);
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

            // בדיקה אם קיים לקוח במסד לפי האימייל
            var dalClient = _dal.GetClientByEmail(payload.Email);

            if (dalClient == null)
            {
                // לקוח חדש
                dalClient = new Client
                {
                    Email = payload.Email,
                    FirstName = payload.Name,
                    GoogleId = payload.Subject,
                    RefreshToken = _jwt.GenerateRefreshToken(),
                    RefreshTokenExpiry = DateTime.UtcNow.AddDays(7)
                };

                // הוספה למסד
                await _authDal.SignUpAsync(dalClient);
            }
            else
            {
                // לקוח קיים – נעדכן את GoogleId אם חסר
                if (string.IsNullOrEmpty(dalClient.GoogleId))
                {
                    dalClient.GoogleId = payload.Subject;
                }

                // תמיד נעדכן טוקנים
                dalClient.RefreshToken = _jwt.GenerateRefreshToken();
                dalClient.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                await _authDal.UpdateAsync(dalClient);
            }

            // יצירת BlClient והחזרת טוקנים
            var blClient = Mapper.ToBlClient(dalClient);
            var accessToken = _jwt.GenerateToken(blClient);

            return new LoginResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = dalClient.RefreshToken
            };
        }

    }
}
