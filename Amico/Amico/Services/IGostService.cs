using Amico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public interface IGostService
    {
        public void CreateGost(Gost gost);
        public List<Gost> GetAllGost();
        public void DeleteGost(string telefon);
        public Gost GetGostById(string id);

    }
}
