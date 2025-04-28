using System;
using System.Collections.Generic;
using Bl;
using Dal.Models;
using Dal.models;


namespace Bl.Moduls;

public partial class BlOrder
{
    public long Id { get; set; }

    public string ClientId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public long AddressId { get; set; }

    public decimal TotalPrice { get; set; }

    public int StatusId { get; set; }

    public virtual ICollection<BlOrderItem> OrderItems { get; set; } = new List<BlOrderItem>();
}
