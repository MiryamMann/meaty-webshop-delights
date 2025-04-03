using System;
using System.Collections.Generic;

namespace Bl.Moduls;

public partial class BlProduct
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal PricePerKilo { get; set; }

    public int? HechsherId { get; set; }

    public int CategoryId { get; set; }

    

    
}
