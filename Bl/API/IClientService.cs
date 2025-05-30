using Bl.API.DTOs;
using Bl.Moduls;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IClientService
    {
        BlClient GetClientByEmail(string email);
        Task UpdateClientAsync(BlClient client);
        bool ClientExists(string clientId);
    }
}
