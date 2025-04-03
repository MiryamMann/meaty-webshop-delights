using System;
using System.Collections.Generic;

namespace web_api.Models;

public partial class Ordere
{
    public long Id { get; set; }

    public string ClientId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public long AddressId { get; set; }

    public decimal TotalPrice { get; set; }

    public bool IsTreated { get; set; }

    public virtual Address Address { get; set; } = null!;
}
