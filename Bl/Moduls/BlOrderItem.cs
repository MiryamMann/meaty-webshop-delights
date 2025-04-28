using System;
using System.Collections.Generic;

namespace Bl.Moduls;

public partial class BlOrderItem
{
    public long OrderItemId { get; set; }

    public long OrderId { get; set; }

    public int ProductId { get; set; }

    public int Amount { get; set; }

    public double PriceOfItem { get; set; }

    
}
