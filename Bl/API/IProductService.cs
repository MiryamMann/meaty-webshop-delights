using Bl.Moduls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IProductService
    {
        List<BlProduct> GetAllProducts();
        bool AddProduct(BlOrderItem orderItem);
        bool RemoveProduct(BlOrderItem orderItem, BlOrder createOrder);

    }
}
