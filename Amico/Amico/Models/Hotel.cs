using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Models
{
    public class Hotel
    {
        public string hotelID { get; set; }
        public string adresa { get; set; }
        
        public string grad { get; set; }
        public string ime { get; set; }
        public string telefon { get; set; }
        public Hotel(string h,string a,string g,string i ,string t)
        {
            hotelID = h;
            adresa = a;           
            grad = g;
            ime = i;
            telefon = t;
        }
        public Hotel() { }

    }
}
