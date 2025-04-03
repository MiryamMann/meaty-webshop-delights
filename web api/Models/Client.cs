using System;
using System.Collections.Generic;

namespace web_api.Models;

public partial class Client
{
    public string Id { get; set; } = null!;

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public long AddressId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
