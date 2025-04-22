using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.API
{
    public interface IDalOrderService
    {
         List<Order> GetAllOrders();
        bool SuspendeOrder();


        bool UnsuspendeOrder();

    }
}
