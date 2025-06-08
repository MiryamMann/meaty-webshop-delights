using Bl.Moduls;

namespace Bl.API
{
    public interface IBLManager
    {
        BlClient Client { get; set; }
        BlOrder Order { get; set; }
        BlOrderItem OrderItem { get; set; }
        BlProduct Product { get; set; }

        IClientAuthService ClientAuthService { get; set; }
        IOrderService OrderService { get; set; }
        IProductService ProductService { get; set; }
        IOrderManagmentService OrderManagementService { get; set; }
        IClientService ClientService { get; set; }
    }
}
