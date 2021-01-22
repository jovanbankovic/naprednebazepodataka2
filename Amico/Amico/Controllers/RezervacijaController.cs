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
    public class RezervacijaController : Controller
    {
        static CassandraContext db = new CassandraContext();
        private IRezervacijaService _rezService;

        public RezervacijaController(IRezervacijaService rezService)
        {
            _rezService = rezService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_rezService.GetAllRez());
        }
        [HttpGet]
        [Route("Get")]
        public IActionResult Get(string id)
        {
            List<Rezervacija> rezervacije = new List<Rezervacija>();
            var selectedDates = new List<DateTime?>();
            var podaci = db.Session.Execute("select * from \"Rezervacije\" where \"sobaID\" = '" + id + "' ");
            foreach (var p in podaci)
            {
                Rezervacija r = new Rezervacija();
                r.gostID = p["gostID"].ToString();
                r.sobaID = p["sobaID"].ToString();
                r.rezID = p["rezID"].ToString();
                r.datumdolaska = DateTime.Parse(p["datumdolaska"].ToString());
                r.datumodlaska = DateTime.Parse(p["datumodlaska"].ToString());
                for (var date = r.datumdolaska; date <= r.datumodlaska; date = date.AddDays(1))
                {
                    selectedDates.Add(date);
                }
            }
            

            return Ok(selectedDates);
        }
        [HttpPost]
        [Route("Add")]
        public IActionResult DodajGosta([FromBody] Rezervacija rezervacija)
        {
            _rezService.CreateRez(rezervacija);
            return Ok();
        }
       
    }
}
