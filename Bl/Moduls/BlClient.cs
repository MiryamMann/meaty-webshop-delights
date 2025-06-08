using Dal.models;
using System;
using System.Collections.Generic;

namespace Bl.Moduls;

public partial class BlClient
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public long AddressId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
    public string? GoogleId { get; set; }
    public string PhoneNumber { get; set; } = null!;
    public DateTime? RefreshTokenExpiration { get; set; }

    //public static implicit operator BlClient(Client v)
    //{
    //    throw new NotImplementedException();
    //}
}
