using Bl.API;
using Bl.Moduls;
using Bl.Services;

namespace Bl
{
    public class BLManager : IBLManager
    {
        public BlClient Client { get; set; } = new();
        public BlOrder Order { get; set; } = new();
        public BlOrderItem OrderItem { get; set; } = new();
        public BlProduct Product { get; set; } = new();

        public IClientAuthService ClientAuthService { get; set; }
        public IOrderService OrderService { get; set; }
        public IProductService ProductService { get; set; }
        public IOrderManagmentService OrderManagementService { get; set; }
        public IClientService ClientService { get; set; }

        public BLManager(
            IClientAuthService clientAuthService,
            IOrderService orderService,
            IProductService productService,
            IOrderManagmentService orderManagementService,
            IClientService clientService)
        {
            ClientAuthService = clientAuthService;
            OrderService = orderService;
            ProductService = productService;
            OrderManagementService = orderManagementService;
            ClientService = clientService;
        }
    }
}
