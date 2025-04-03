using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Address
{
    public long Id { get; set; }

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string? Zip { get; set; }

    public string BuildingNumber { get; set; } = null!;

    public string? ApartmentNumber { get; set; }

    public string? EntryBuilding { get; set; }

    public virtual ICollection<Order> Orderes { get; set; } = new List<Order>();
}
