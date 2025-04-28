using System;
using System.Collections.Generic;

namespace web_api.Models;

public partial class Status
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;
}
