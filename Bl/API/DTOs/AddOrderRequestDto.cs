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
        public OrderDto Order { get; set; } = null!;
        public ClientSignUpDto Client { get; set; } = null!;
    }
}
