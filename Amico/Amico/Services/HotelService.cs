using Amico.Models;
using Cassandra;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public class HotelService : IHotelService
    {
        static CassandraContext db = new CassandraContext();
       
       

        public List<Hotel> GetHotel()
        {
            List<Hotel> hotel = new List<Hotel>();
            var p = db.Session.Execute("select * from \"Hotel\" ").First();

            hotel.Add(new Hotel(p["hotelID"].ToString(), p["adresa"].ToString(), p["grad"].ToString(), p["ime"].ToString(), p["telefon"].ToString()));
            
            return hotel;
        }

        

    
    }
}
