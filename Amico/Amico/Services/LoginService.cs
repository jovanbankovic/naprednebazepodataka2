using Amico.Models;
using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Services
{
    public class LoginService : ILoginService
    {
        static CassandraContext db = new CassandraContext();

        public void AddLogin(Login login)
        {
            RowSet red = db.Session.Execute("insert into \"SignIn\" (email,sifra,tip,telefon) " +
               "values ('" + login.email + "', '" + login.sifra + "', '" + login.tip + "', '" + login.telefon + "')");
        }

        public Login login(Login login)
        {
            Row podaci = db.Session.Execute("select * from \"SignIn\" where \"email\"='" + login.email + "' and \"sifra\"='" + 
                login.sifra + "'").FirstOrDefault();

            if (podaci == null) { return null; }
            Login l = new Login();
            l.email = podaci["email"].ToString();
            l.sifra = podaci["sifra"].ToString();
            l.tip = podaci["tip"].ToString();
            l.telefon = podaci["telefon"].ToString();
            return l;
        }

      
    }
}
