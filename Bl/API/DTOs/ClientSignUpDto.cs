using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API.DTOs
{

    public class ClientSignUpDto
    {
        public string Id { get; set; } = null!;
        public string FirstName { get; set; } =null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public AddressDto Address { get; set; } = null!;
    }

}



