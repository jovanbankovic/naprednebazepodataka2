using Amico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public interface IRezervacijaService
    {
        public List<Rezervacija> GetAllRez();
        public void CreateRez(Rezervacija rez);
    }
}
