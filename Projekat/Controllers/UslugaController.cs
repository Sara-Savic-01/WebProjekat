using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
     public class UslugaController : ControllerBase
     {
         public SalonContext Context{get;set;}
        public UslugaController(SalonContext context)
        {
           Context=context;
        }
        [Route("PreuzmiUsluge")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiUsluge()
        {
            try
            {
                var usluge=await Context.Usluge
                .Select(u=>new{
                    IDUsluge=u.IDUsluge,
                    VrstaUsluge=u.VrstaUsluge,
                    Cena=u.Cena
                }).ToListAsync();
                return Ok(usluge);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
     }
}