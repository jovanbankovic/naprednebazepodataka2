using Amico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public interface IKomentarService
    {
        public void CreateKomentar(Komentar komentar);
        public List<Komentar> GetAllKomentar();
        public void DeleteKomentar(string komentarID);
    }
}
