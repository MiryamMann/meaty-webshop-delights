

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Moduls;
using Bl.API;
using Bl.Services;
using Dal.Services;


namespace Bl
{
    public class BLManager : IBLManager
    {

        public BlAddress address { get; set; }
        public BlCategory category { get; set; }
        public BlClient client { get; set; }
        public BlOrder order { get; set; }
        public BlOrderItem orderItem { get; set; }
        public BlProduct product { get; set; }
        public IBLOrderService OrderService { get; set; }
        public IBLClientService ClientService { get; set; }
        public IDalClientService dalClientService { get; set; }
        public BLManager(IDalClientService dalClientService, IBLOrderService orderService)
        {
            if (dalClientService == null)
                Console.WriteLine("❌ dalClientService is NULL!");
            else
                Console.WriteLine("✅ dalClientService injected successfully!");

            if (orderService == null)
                Console.WriteLine("❌ orderService is NULL!");
            else
                Console.WriteLine("✅ orderService injected successfully!");

            this.dalClientService = dalClientService ?? throw new ArgumentNullException(nameof(dalClientService));
            this.OrderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            this.ClientService = new BLClientService(this.dalClientService);

            address = new BlAddress();
            category = new BlCategory();
            product = new BlProduct();
            order = new BlOrder();
            orderItem = new BlOrderItem();
        }

    }
}
