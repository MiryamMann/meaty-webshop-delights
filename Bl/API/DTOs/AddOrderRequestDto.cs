using Bl.Moduls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API.DTOs
{
    public class AddOrderRequestDto
    {
            public ClientDto? Client { get; set; } 
            public string? ExistingClientId { get; set; } 

            public DateTime OrderDate { get; set; }
            public decimal TotalPrice { get; set; }
            public int StatusId { get; set; }
            public List<OrderItemDto> OrderItems { get; set; } = new();
        }
    }

