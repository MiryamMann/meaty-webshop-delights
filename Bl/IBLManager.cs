using Bl.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Moduls;
namespace Bl
{
    public interface IBLManager
    {
        public BlAddress Address { get; set; }
        public List<BlAddress> Addresses { get; set; }
        public BlCategory Category { get; set; }
        public BlClient Client { get; set; }
        public BlOrder Order { get; set; }
        public BlOrderItem OrderItem { get; set; }
        public BlProduct Product { get; set; }
        public IBLOrderServices OrderService { get; set; }
        public IBLClientServices ClientService { get; set; }

    }
}
