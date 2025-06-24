
﻿using System;
using Bl.API;
using Bl.Moduls;
using Bl.Services;

namespace Bl
{
    public class BLManager : IBLManager
    {

        public BlAddress Address { get; set; } = new();
        public BlCategory Category { get; set; } = new();
        public BlClient Client { get; set; } = new();
        public BlOrder Order { get; set; } = new();
        public BlOrderItem OrderItem { get; set; } = new();
        public BlProduct Product { get; set; } = new();

        public List<BlAddress> Addresses { get; set; } = new();

  
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
            ClientAuthService = clientAuthService ?? throw new ArgumentNullException(nameof(clientAuthService));
            OrderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            ProductService = productService ?? throw new ArgumentNullException(nameof(productService));
            OrderManagementService = orderManagementService ?? throw new ArgumentNullException(nameof(orderManagementService));
            ClientService = clientService ?? throw new ArgumentNullException(nameof(clientService));

            Console.WriteLine("BLManager initialized with all injected services.");
        }
    }
}
