using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.API;
using Dal.API;
using Dal.Models;
using Dal.Services;

namespace Dal
{
    public interface IDalManager
    {
        public Address address { get; set; }
        public Category category { get; set; }
        public Client client { get; set; }
        public Order order { get; set; }
        public OrderItem orderItem { get; set; }
        public Product product { get; set; }
        public IDalOrderService OrderService { get; set; }
        public IDalClientService ClientService { get; set; }
    }
}
