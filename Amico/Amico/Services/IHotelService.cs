using Amico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public interface IHotelService
    {
        public List<Hotel> GetHotel();
       
    }
}
