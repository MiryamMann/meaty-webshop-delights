using Bl.Moduls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API.DTOs
{
    public class OrderDto
    {
        public string ClientId { get; set; } = null!;

        public DateTime OrderDate { get; set; }

        public decimal TotalPrice { get; set; }

        public int StatusId { get; set; }

        public virtual ICollection<BlOrderItem> OrderItems { get; set; } = new List<BlOrderItem>();

    }
}
