using Amico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public interface ISobaService
    {
        public List<Soba> GetAllSobe();
        public void CreateSoba(Soba soba);
        public void UpdateSoba(Soba soba);
        public void DeleteSoba(string id);
        public Soba GetSobaById(string id);
    }
}
