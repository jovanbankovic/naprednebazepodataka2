using Amico.Models;
using Amico.Services;
using Cassandra;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        static CassandraContext db = new CassandraContext();


        private ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public IActionResult Get([FromBody]Login login)
        {
            return Ok(_loginService.login(login));
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult AddToLogin([FromBody]Login login)
        {
            /* RowSet red = db.Session.Execute("insert into \"SignIn\" (email,sifra,tip,telefon) " +
                "values ('" + login.email + "', '" + login.sifra + "', '" + login.tip + "', '" + login.telefon + "')");*/
            _loginService.AddLogin(login);

            return Ok();
        }
        
        [HttpDelete]
        public IActionResult DeleteSoba()
        {
            db.Session.Execute("DROP TABLE \"Hotel\" ");
            return Ok();
        }
    }
}
