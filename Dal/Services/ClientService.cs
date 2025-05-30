using Dal.API;
using Dal.models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class DalClientService : IClientDal, IClientAuthDal
    {
        private readonly dbClass _context;

        public DalClientService(dbClass context)
        {
            _context = context;
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.Clients.AnyAsync(c => c.Email == email);
        }

        public async Task<Client?> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _context.Clients.FirstOrDefaultAsync(c => c.Email == email && c.Password == password);
        }

        public Client ClientExist(string clientId)
        {
            return _context.Clients.FirstOrDefault(c => c.Id.Equals(clientId));
        }

        public async Task<Client> SignUpAsync(Client client)
        {
            try
            {
                _context.Clients.Add(client);
                await _context.SaveChangesAsync();
                return client;
            }
             catch (Exception ex)
            {
                Console.WriteLine($"❌ שגיאה בהרשמה: {ex.Message}");
                return null;
            }
        }
            
        

        public bool SignUp(Client client)
        {
            try { _context.Clients.Add(client); } catch { }
            return _context.Clients.FirstOrDefault(c => c.Id == client.Id) != null;
        }

        public async Task<int> AddAddressAsync(Address address)
        {
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
            return (int)address.Id;
        }

        public Client GetClientByEmail(string email)
        {
            return _context.Clients.FirstOrDefault(c => c.Email == email);
        }

        public async Task UpdateAsync(Client client)
        {
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsEmailExistsAsync(string email)
        {
            return await _context.Clients.AnyAsync(c => c.Email == email);
        }
        public async Task<bool> LogIn(string email, string password)
        {
            return await _context.Clients.AnyAsync(c => c.Email == email && c.Password == password);
        }

    }
}
