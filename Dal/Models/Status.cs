using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Status
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;
}
