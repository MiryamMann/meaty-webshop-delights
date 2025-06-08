using System;
using System.Collections.Generic;
using Dal.models;

namespace Dal.Models;

public partial class Order
{
    public long Id { get; set; }

    public string ClientId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public long AddressId { get; set; }
    public int StatusId {  get; set; }
    public decimal TotalPrice { get; set; }
    public Address? Address { get; set; }   
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
