using Amico.Models;
using Amico.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amico.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SobaController : Controller
    {
        static CassandraContext db = new CassandraContext();


        private ISobaService _sobaService;

        public SobaController(ISobaService sobaService)
        {
            _sobaService = sobaService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_sobaService.GetAllSobe());
        }
        [HttpGet]
        [Route("ID")]
        public IActionResult GetByID(string id)
        {
            return Ok(_sobaService.GetSobaById(id));
        }

        [HttpPost]
        [Route("AddSoba")]
        public IActionResult DodajSobu([FromBody]Soba soba)
        {
            _sobaService.CreateSoba(soba);
            return Ok();
        }
        [HttpPut]
        [Route("UpdateSobe")]
        public IActionResult UpdateBrojDostupnihSoba([FromBody]Soba soba)
        {
            _sobaService.UpdateSoba(soba);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteSobu(string id)
        {
            _sobaService.DeleteSoba(id);
            return Ok();
        }


    }
}
