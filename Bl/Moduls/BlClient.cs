
﻿using Dal.models;
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



    public static implicit operator BlClient(Client v)
    {
        throw new NotImplementedException();
    }

}
//מירי-------
//נראה לי שצריך לשנות את זה לזה 
//public static implicit operator BlClient(Client v)
//    {
//        return new BlClient
//        {
//            Id = v.Id,
//            FirstName = v.FirstName,
//            LastName = v.LastName,
//            AddressId = v.AddressId,
//            Email = v.Email,
//            Password = v.Password,
//            RefreshToken = v.RefreshToken,
//            RefreshTokenExpiry = v.RefreshTokenExpiry,
//            GoogleId = v.GoogleId,
//            PhoneNumber = v.PhoneNumber
//            // הוסף כאן כל שדה נוסף שצריך
//        };
//    }