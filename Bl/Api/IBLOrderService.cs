using Bl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Moduls;
namespace Bl.API
{
    public interface IBLOrderService
    {
        List<BlOrder> GetAllOrders();
        bool SuspendeOrder();


        bool UnsuspendeOrder();


       

    }
}
