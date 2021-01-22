using Amico.Models;
using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public class SobaService : ISobaService
    {
        static CassandraContext db = new CassandraContext();

        public void CreateSoba(Soba soba)
        {
            string idIncremnet = GetNextID();
            RowSet red = db.Session.Execute("insert into \"Soba\" (\"sobaID\",tip,klima,internet,tv) " +
                "values ('" + idIncremnet + "','" + soba.tip + "', '" + soba.klima + "', '" + soba.internet + "','" + soba.tv + "')");
        }
        public string GetNextID()
        {
            var maxRow = db.Session.Execute("select MAX(\"sobaID\") from \"Soba\" ").FirstOrDefault();

            
            String maxId = maxRow["system.max(sobaID)"] != null ? maxRow["system.max(sobaID)"].ToString() : 0.ToString();

            int idIncremnet = Int32.Parse(maxId);

            idIncremnet++;
            return idIncremnet.ToString();
        }

        public void DeleteSoba(string id)
        {
            //izbrisi i komntare za sobu i sve sto ima vezano sa tu sobu
            RowSet red1 = db.Session.Execute("delete from \"Soba\" where \"sobaID\" = '" +id + "'");
        }

        public List<Soba> GetAllSobe()
        {
            List<Soba> sobe = new List<Soba>();
            var podaci = db.Session.Execute("select * from \"Soba\" ");
            foreach(var p in podaci)
            {
                Soba s = new Soba();
                s.sobaID = p["sobaID"].ToString();
                s.internet = p["internet"].ToString();
                s.klima = p["klima"].ToString();
                s.tip = p["tip"].ToString();
                s.tv = p["tv"].ToString();
                sobe.Add(s);
            }

            return sobe;
        }

        public Soba GetSobaById(string id)
        {
            Soba s = new Soba();
            Row p = db.Session.Execute("select * from \"Soba\" where \"sobaID\" = '" + id + "' ").FirstOrDefault();

            if (p == null) { return null; }

            s.sobaID = p["sobaID"].ToString();
            s.internet = p["internet"].ToString();
            s.klima = p["klima"].ToString();
            s.tip = p["tip"].ToString();
            s.tv = p["tv"].ToString();

            return s;
        }

        public void UpdateSoba(Soba soba)
        {
            RowSet red = db.Session.Execute("update \"Soba\" set tip='" + soba.tip + "',klima='" + soba.klima + "'," +
                "tv='" + soba.tv + "',internet='" + soba.internet + "' where \"sobaID\" = '" + soba.sobaID + "'");
        }
    }
}
