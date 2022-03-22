using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KozmeticarController : ControllerBase
    {
        public SalonContext Context{get;set;}
        public KozmeticarController(SalonContext context)
        {
           Context=context;
        }
        [Route("DodatiKozmeticara/{ime}/{prezime}/{struka}")]
        [HttpPost]
        public async Task<ActionResult> DodatiKozmeticara(string ime,string prezime,string struka)
        {
            if (string.IsNullOrWhiteSpace(ime) || ime.Length > 255)
            {
                return BadRequest("Pogrešno Ime!");
            }

            if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 255)
            {
                return BadRequest("Pogrešno Prezime!");
            }
        
            
            
            try
            {
                Kozmeticar kozmeticar=new Kozmeticar
                {
                    Ime=ime,
                    Prezime=prezime,
                    Struka=struka
                };
                Context.Kozmeticari.Add(kozmeticar);
                await Context.SaveChangesAsync();
                return Ok($"Klijent je dodat! ID je: {kozmeticar.IDKozmeticara}");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*[EnableCors("CORS")]
        [Route("VratiKozmeticare")]
        [HttpGet]
        public async Task<ActionResult> VratiKozmeticare()
        {
             try
            {
                
                var usluga = await Context.Usluge.Where(s => s.IDUsluge == UslugaID).FirstAsync();
                if (usluga == null)
                    throw new Exception("Usluga ne postoji!");
                var kozmeticari = await Context.Kozmeticari.Where(u => u.Usluge.IDUsluge == UslugaID).Select(t => new
                {
                    IDKozmeticara=t.IDKozmeticara,
                    Ime=t.Ime,
                    Prezime=t.Prezime
                }).ToListAsync();
                return Ok(kozmeticari);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        
        }*/
        [Route("PreuzmiKozmeticare")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKozmeticare()
        {
            try{
                var kozmeticar=await Context.Kozmeticari
                .Include(k=>k.Usluge)
                .Include(s=>s.Saloni)
                .ToListAsync();

                var kozmeticarPrikazi=kozmeticar
                .Select(ko=>
                    new{
                        IDKozmeticara=ko.IDKozmeticara,
                        Ime=ko.Ime,
                        Prezime=ko.Prezime,
                        Struka=ko.Struka,
                        UslugaID=ko.Usluge.IDUsluge,
                        SalonID=ko.Saloni.ID
                    }).ToList();
                    return Ok(kozmeticarPrikazi);
            }  
            
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodatiKozmeticara")]
        [HttpPost]
        public async Task DodatiKozmeticara([FromBody]Kozmeticar kozmeticar)
        {
             Context.Kozmeticari.Add(kozmeticar);
            await Context.SaveChangesAsync();
        }
    }

}