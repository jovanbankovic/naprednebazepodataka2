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
    public class GostController : Controller
    {
        static CassandraContext db = new CassandraContext();
        private IGostService _gostService;

        public GostController(IGostService gostService)
        {
            _gostService = gostService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gostService.GetAllGost());
        }
        [HttpGet]
        [Route("Id")]
        public IActionResult GetGost(string id)
        {
            
            return Ok(_gostService.GetGostById(id));
        }
        [HttpPost]
        [Route("AddGost")]
        public IActionResult DodajGosta([FromBody] Gost gost)
        {
            _gostService.CreateGost(gost);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteGGost(string telefon)
        {
            _gostService.DeleteGost(telefon);
            return Ok();
        }
    }
}
