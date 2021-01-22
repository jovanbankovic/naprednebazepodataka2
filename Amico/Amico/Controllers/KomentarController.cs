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
    public class KomentarController : Controller
    {
        static CassandraContext db = new CassandraContext();


        private IKomentarService _komentarService;

        public KomentarController(IKomentarService komentarService)
        {
            _komentarService = komentarService;
        }

       
        [HttpGet]
        [Route("All")]
        public IActionResult GetAll()
        {
            return Ok(_komentarService.GetAllKomentar());
        }
        [HttpPost]
        [Route("AddKomentar")]
        public IActionResult DodajKomentar([FromBody] Komentar komentar)
        {
            _komentarService.CreateKomentar(komentar);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteKomentar(string id)
        {
            RowSet red = db.Session.Execute("delete from \"Komentari\" where \"komentarID\" = '" + id + "'");
            
            return Ok();
        }

    }
}
