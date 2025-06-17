using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dal.models;

public partial class Client
{
    [Key]

        public int Id { get; set; }

        public string? FirstName { get; set; }          // NULLABLE ✅
        public string LastName { get; set; } = null!;    // NOT NULL ❗

        public long AddressId { get; set; }

        public string Email { get; set; } = null!;       // NOT NULL ❗
        public string Password { get; set; } = null!;    // NOT NULL ❗

        public string? RefreshToken { get; set; }        // NULLABLE ✅
        public DateTime? RefreshTokenExpiry { get; set; } // ❗ אמור להיות nullable? כן

        public string? GoogleId { get; set; }            // NULLABLE ✅
        public string? PhoneNumber { get; set; }         // NULLABLE ✅
    }
