using System;
using Bl.Moduls;
using Bl.Services;
using Bl.API;
using Dal.API;

namespace Bl
{
    public class BLManager : IBLManager
    {
        public BlAddress Address { get; set; }
        public BlCategory Category { get; set; }
        public BlClient Client { get; set; }
        public BlOrder Order { get; set; }
        public BlOrderItem OrderItem { get; set; }
        public BlProduct Product { get; set; }

        public IBLOrderServices OrderService { get; set; }
        public IBLClientServices ClientService { get; set; }
        public IDalClientService dalClientService { get; set; }
        public List<BlAddress> Addresses { get; set; }
        public BLManager(
            IDalClientService dalClientService,
            IBLOrderServices orderService,
            IJwtService jwtService)
        {
            this.dalClientService = dalClientService ?? throw new ArgumentNullException(nameof(dalClientService));
            this.OrderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            this.ClientService = new BLClientService(this.dalClientService, jwtService);

            Address = new BlAddress();
            Category = new BlCategory();
            Product = new BlProduct();
            Order = new BlOrder();
            OrderItem = new BlOrderItem();
            Addresses = new List<BlAddress>();


            Console.WriteLine("✅ BLManager initialized with all services.");
        }
    }
}
