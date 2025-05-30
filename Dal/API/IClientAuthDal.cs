using Dal.models;

public interface IClientAuthDal
{
    Task<Client> SignUpAsync(Client client);
    Task<bool> LogIn(string email, string password); // אם צריך – עדיף להסיר אם לא בשימוש
    Task<int> AddAddressAsync(Address address);
    Task<bool> ExistsByEmailAsync(string email);
    Task<Client?> GetByEmailAndPasswordAsync(string email, string password);
    Task UpdateAsync(Client client);

}
