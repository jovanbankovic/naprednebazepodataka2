using Amico.Models;
using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public class GostService : IGostService
    {
        static CassandraContext db = new CassandraContext();
        public void CreateGost(Gost gost)
        {
           
            
            RowSet red = db.Session.Execute("insert into \"Gost\" (ime,prezime,telefon) " +
                "values ('" + gost.ime + "', '" + gost.prezime + "', '" + gost.telefon + "')");
            
        }

        public void DeleteGost(string telefon)
        {
            RowSet red1 = db.Session.Execute("delete from \"Gost\" where \"telefon\" = '" + telefon + "'");
            //brisanje svih ostalih gde je taj gost
            List<String> idKomentar = GetAllCommentsForGost(telefon);
            foreach(String s in idKomentar)
            {
                db.Session.Execute("delete from \"Komentari\" where \"komentarID\" = '" + s + "'");
            }
            List<String> idRezervacija=GetAllRezervazijeForGost(telefon);
            foreach (String s in idRezervacija)
            {
                db.Session.Execute("delete from \"Rezervacije\" where \"sobaID\" = '" + s + "'");
            }
            List<String> idSignIn = GetAllSignInForGost(telefon);
            foreach (String s in idSignIn)
            {
                db.Session.Execute("delete from \"SignIn\" where \"email\" = '" + s + "'");
            }

        }

        public List<String> GetAllCommentsForGost(string telefon)
        {
            var podaci = db.Session.Execute("select * from \"Komentari\" where \"gostID\" =  '" + telefon + "' ALLOW FILTERING ");

            List<String> kljucevi = new List<string>();
            foreach(var p in podaci)
            {
                kljucevi.Add(p["komentarID"].ToString());
            }
            return kljucevi;
        }
        public List<String> GetAllRezervazijeForGost(string telefon)
        {
            var podaci = db.Session.Execute("select * from \"Rezervacije\" where \"gostID\" =  '" + telefon + "' ALLOW FILTERING ");

            List<String> kljucevi = new List<string>();
            foreach (var p in podaci)
            {
                kljucevi.Add(p["sobaID"].ToString());
            }
            return kljucevi;
        }
        public List<String> GetAllSignInForGost(string telefon)
        {
            var podaci = db.Session.Execute("select * from \"SignIn\" where \"telefon\" =  '" + telefon + "' ALLOW FILTERING ");

            List<String> kljucevi = new List<string>();
            foreach (var p in podaci)
            {
                kljucevi.Add(p["email"].ToString());
            }
            return kljucevi;
        }


        public List<Gost> GetAllGost()
        {
            List<Gost> gosti = new List<Gost>();
            var podaci = db.Session.Execute("select * from \"Gost\" ");
            foreach (var p in podaci)
            {
                Gost s = new Gost();
                s.ime = p["ime"].ToString();
                s.prezime = p["prezime"].ToString();
                s.telefon = p["telefon"].ToString();
                gosti.Add(s);
            }

            return gosti;
        }

        public Gost GetGostById(string id)
        {
            Row podatak = db.Session.Execute("select * from \"Gost\" where telefon = '" + id + "'").FirstOrDefault();
            Gost g = new Gost();
            g.telefon = podatak["telefon"].ToString();
            g.ime = podatak["ime"].ToString();
            g.prezime = podatak["prezime"].ToString();
            return g;
        }
    }
}
