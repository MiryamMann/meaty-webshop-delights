using Dal.API;
using Dal.Models;
using Dal.models;
using Dal.Services;

namespace Dal
{
    public class DalManager:IDalManager
    {
        public Address address { get; set; }
        public Category category { get; set; }
        public Client client { get; set; }
        public Order order { get; set; }
        public OrderItem orderItem { get; set; }
        public Product product { get; set; }
        public IOrderManagementDal OrderService { get; set; }
        public IClientAuthDal ClientAuthDal { get; set; }
        public IClientDal ClientService { get; set; }

        private readonly dbClass _context;
        public DalManager()
        {
            address = new Address();
            category = new Category();
            product = new Product();
            order = new Order();
            orderItem = new OrderItem();
            product = new Product();

            ClientService = new DalClientService(_context);
        }
    }
}

