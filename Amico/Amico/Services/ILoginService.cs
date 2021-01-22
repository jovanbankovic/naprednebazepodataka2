using Amico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public interface ILoginService
    {
        public Login login(Login login);
        public void AddLogin(Login login);
    }
}
