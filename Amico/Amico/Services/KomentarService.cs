using Amico.Models;
using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public class KomentarService : IKomentarService
    {
        static CassandraContext db = new CassandraContext();
        public void CreateKomentar(Komentar komentar)
        {
            string idIncremnet = GetNextID();
            RowSet red = db.Session.Execute("insert into \"Komentari\" (\"komentarID\",\"sobaID\",\"gostID\",tekst) " +
                "values ('" + idIncremnet + "','" + komentar.sobaID + "', '" + komentar.gostID + "', '" + komentar.tekst + "')");
        }
        public string GetNextID()
        {
            var maxRow = db.Session.Execute("select MAX(\"komentarID\") from \"Komentari\" ").FirstOrDefault();


            String maxId = maxRow["system.max(komentarID)"] != null ? maxRow["system.max(komentarID)"].ToString() : 0.ToString();

            int idIncremnet = Int32.Parse(maxId);

            idIncremnet++;
            return idIncremnet.ToString();
        }

        public void DeleteKomentar(string komentarID)
        {
            RowSet red = db.Session.Execute("delete from \"Komentari\" where \"komentarID\" = '" + komentarID + "'");
        }

       

        public List<Komentar> GetAllKomentar()
        {
            List<Komentar> komentari = new List<Komentar>();
            RowSet podaci = db.Session.Execute("select * from \"Komentari\" ");

            if (podaci == null) { return null; }

            foreach (Row p in podaci)
            {
                Komentar s = new Komentar();
                s.komentarID = p["komentarID"].ToString();
                s.gostID = p["gostID"].ToString();
                s.sobaID = p["sobaID"].ToString();
                s.tekst = p["tekst"].ToString();
                komentari.Add(s);

            }


            return komentari;
        }
    }
}
