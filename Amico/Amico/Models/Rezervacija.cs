using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Models
{
    public class Rezervacija
    {
        public string rezID { get; set; }
        public string sobaID { get; set; }
        public string gostID { get; set; }
        public DateTime datumdolaska { get; set; }
        public DateTime datumodlaska { get; set; }
    }
}
