using Bl.API;
using Bl.Moduls;
using Dal.API;
using Dal.models;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientDal _clientDal;
        private readonly IClientAuthDal _authAal;


        public ClientService(IClientDal clientDal, IClientAuthDal authAal)
        {
            _clientDal = clientDal;
            _authAal = authAal;
        }

        public BlClient GetClientByEmail(string email)
        {
            var dalClient = _clientDal.GetClientByEmail(email);
            return Mapper.ToBlClient(dalClient);
        }

        public async Task UpdateClientAsync(BlClient client)
        {
            var dalClient = Mapper.ToDalClient(client);
            await _authAal.UpdateAsync(dalClient);
        }

        public bool ClientExists(string clientId)
        {
            return _clientDal.ClientExist(clientId) != null;
        }
    }
}
