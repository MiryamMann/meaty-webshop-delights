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
        public BlAddress address { get; set; }
        public BlCategory category { get; set; }
        public BlClient client { get; set; }
        public BlOrder order { get; set; }
        public BlOrderItem orderItem { get; set; }
        public BlProduct product { get; set; }
        public IBLOrderService OrderService { get; set; }
        public IBLClientService ClientService { get; set; }

    }
}
