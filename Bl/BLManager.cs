<<<<<<< HEAD
﻿using Bl.API;
=======
﻿using System;
using Bl.API;
>>>>>>> origin/Server
using Bl.Moduls;
using Bl.Services;

namespace Bl
{
    public class BLManager : IBLManager
    {
<<<<<<< HEAD
=======
        // Entities
        public BlAddress Address { get; set; } = new();
        public BlCategory Category { get; set; } = new();
>>>>>>> origin/Server
        public BlClient Client { get; set; } = new();
        public BlOrder Order { get; set; } = new();
        public BlOrderItem OrderItem { get; set; } = new();
        public BlProduct Product { get; set; } = new();
<<<<<<< HEAD

=======
        public List<BlAddress> Addresses { get; set; } = new();

        // Services
>>>>>>> origin/Server
        public IClientAuthService ClientAuthService { get; set; }
        public IOrderService OrderService { get; set; }
        public IProductService ProductService { get; set; }
        public IOrderManagmentService OrderManagementService { get; set; }
<<<<<<< HEAD
        public IClientService ClientService { get; set; }
=======
        public IClientService ClientService{ get; set; }
>>>>>>> origin/Server

        public BLManager(
            IClientAuthService clientAuthService,
            IOrderService orderService,
            IProductService productService,
<<<<<<< HEAD
            IOrderManagmentService orderManagementService,
            IClientService clientService)
        {
            ClientAuthService = clientAuthService;
            OrderService = orderService;
            ProductService = productService;
            OrderManagementService = orderManagementService;
            ClientService = clientService;
=======
            IOrderManagmentService orderManagementService)
        {
            ClientAuthService = clientAuthService ?? throw new ArgumentNullException(nameof(clientAuthService));
            OrderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            ProductService = productService ?? throw new ArgumentNullException(nameof(productService));
            OrderManagementService = orderManagementService ?? throw new ArgumentNullException(nameof(orderManagementService));

            Console.WriteLine(" BLManager initialized with all injected services.");
>>>>>>> origin/Server
        }
    }
}
