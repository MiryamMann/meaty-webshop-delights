using Bl.Moduls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IJwtService
    {

        string GenerateToken(BlClient client);
        string GenerateRefreshToken();

    }

}

