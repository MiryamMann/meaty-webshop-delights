using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API.DTOs
{
   
        public class AddressDto
        {
            public string Street { get; set; } = null!;
            public string City { get; set; } = null!;
        public string ZipCode { get; set; } = null!;         
            public string BuildingNumber { get; set; } = null!;
    }

 }

