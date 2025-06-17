<<<<<<< HEAD
﻿using Bl.Moduls;

namespace Bl.API
{
    public interface IBLManager
    {
=======
﻿using Bl.API;
using Bl.Moduls;
using Bl.Services;
using System.Collections.Generic;
using System.Collections.Generic;

namespace Bl
{
    public interface IBLManager
    {
        // Entities (לא חובה לחשוף, אבל אם נדרש – השאר)
        BlAddress Address { get; set; }
        BlCategory Category { get; set; }
>>>>>>> origin/Server
        BlClient Client { get; set; }
        BlOrder Order { get; set; }
        BlOrderItem OrderItem { get; set; }
        BlProduct Product { get; set; }
<<<<<<< HEAD
=======
        List<BlAddress> Addresses { get; set; }

        // Services
        IClientAuthService ClientAuthService { get; set; }
        IOrderService OrderService { get; set; }
        IProductService ProductService { get; set; }
        IOrderManagmentService OrderManagementService { get; set; }
         IClientService ClientService { get; set; }
>>>>>>> origin/Server

        IClientAuthService ClientAuthService { get; set; }
        IOrderService OrderService { get; set; }
        IProductService ProductService { get; set; }
        IOrderManagmentService OrderManagementService { get; set; }
        IClientService ClientService { get; set; }
    }
}


