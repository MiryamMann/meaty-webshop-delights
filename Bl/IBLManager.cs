
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

        BlClient Client { get; set; }
        BlOrder Order { get; set; }
        BlOrderItem OrderItem { get; set; }
        BlProduct Product { get; set; }
        List<BlAddress> Addresses { get; set; }

        // Services
        IClientAuthService ClientAuthService { get; set; }
        IOrderService OrderService { get; set; }
        IProductService ProductService { get; set; }
        IOrderManagmentService OrderManagementService { get; set; }
         IClientService ClientService { get; set; }

    }
}


