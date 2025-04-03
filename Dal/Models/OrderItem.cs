using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class OrderItem
{
    public long OrderItemId { get; set; }

    public long OrderId { get; set; }

    public int ProductId { get; set; }

    public int Amount { get; set; }

    public double PriceOfItem { get; set; }

    public virtual Product Product { get; set; } = null!;
}
