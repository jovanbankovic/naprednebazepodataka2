using Amico.Models;
using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public class RezervacijaService : IRezervacijaService
    {
        static CassandraContext db = new CassandraContext();
        public void CreateRez(Rezervacija rez)
        {
            String datumDolaska= rez.datumdolaska.Year.ToString() + "-" + rez.datumdolaska.Month.ToString() + "-" + rez.datumdolaska.Day.ToString();
            String datumOdlaksa = rez.datumodlaska.Year.ToString() + "-" + rez.datumodlaska.Month.ToString() + "-" + rez.datumodlaska.Day.ToString();
            string idIncremnet = GetNextID();
            RowSet red2 = db.Session.Execute("insert into \"Rezervacije\" (\"rezID\",\"sobaID\",\"gostID\",datumdolaska,datumodlaska) " +
                 "values ('" + idIncremnet + "','" + rez.sobaID + "', '" + rez.gostID + "', '" + datumDolaska + "','" + datumOdlaksa + "')");
        }
        public string GetNextID()
        {
            var maxRow = db.Session.Execute("select MAX(\"rezID\") from \"Rezervacije\" ").FirstOrDefault();


            String maxId = maxRow["system.max(rezID)"] != null ? maxRow["system.max(rezID)"].ToString() : 0.ToString();

            int idIncremnet = Int32.Parse(maxId);

            idIncremnet++;
            return idIncremnet.ToString();
        }


        public List<Rezervacija> GetAllRez()
        {
            List<Rezervacija> rezervacije = new List<Rezervacija>();
            var podaci = db.Session.Execute("select * from \"Rezervacije\" ");
            foreach (var p in podaci)
            {
                Rezervacija r = new Rezervacija();
                r.gostID = p["gostID"].ToString();
                r.sobaID = p["sobaID"].ToString();
                r.rezID = p["rezID"].ToString();
                r.datumdolaska = DateTime.Parse(p["datumdolaska"].ToString());
                r.datumodlaska = DateTime.Parse(p["datumodlaska"].ToString());
                rezervacije.Add(r);
            }

            return rezervacije;
        }
    }
}
