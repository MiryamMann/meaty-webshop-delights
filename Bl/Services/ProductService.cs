using Bl.API;
using Bl.Moduls;
using Dal.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class ProductService: IProductService
    {
        private readonly IProductDal _productDal;
        private readonly IOrderDal _orderDal;



        public ProductService(IProductDal productDal, IOrderDal orderDal)
        {
            _productDal = productDal;
            _orderDal = orderDal;
        }

        public List<BlProduct> GetAllProducts()
        {
            var products = _productDal.GetAllProducts();
            return Mapper.ToListBlProduct(products);
        }

        public bool AddProduct(BlOrderItem item)
        {
            if (item == null) return false;

            var dalItem = Mapper.ToDalOrderItem(item);
            var order = _orderDal.GetOrderById(dalItem.OrderId);
            if (order == null) return false;

            _productDal.AddProduct(dalItem, order);
            return _productDal.IsOrderContainsOrderItem(order, dalItem);
        }

        public bool RemoveProduct(BlOrderItem item, BlOrder order)
        {
            return true;
        }
    }
}
