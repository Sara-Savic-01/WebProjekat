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
    public class SalonController : ControllerBase
    {
        
        public SalonContext Context{get;set;}
        public SalonController(SalonContext context)
        {
           Context=context;
        }
        [EnableCors("CORS")]
        [Route("DodajSalon")]
        [HttpPost]
        public async Task<ActionResult> DodajSalon([FromBody] Salon salon)
        {
            if(salon.Telefon>9)
            {
                return BadRequest("Pogrešan Telefon!");
            }
            if (string.IsNullOrWhiteSpace(salon.Naziv) || salon.Naziv.Length > 255)
            {
                return BadRequest("Pogrešno Naziv!");
            }
            try
            {
                Salon saloni=new Salon
                {
                    Naziv=salon.Naziv,
                    Adresa=salon.Adresa,
                    Telefon=salon.Telefon,
                    RadnoVremeOd=salon.RadnoVremeOd,
                    RadnoVremeDo=salon.RadnoVremeDo,
                    MaxBrojTermina=salon.MaxBrojTermina
                };
                Context.Saloni.Add(saloni);
                await Context.SaveChangesAsync();
                return Ok($"Salon je dodat! ID je: {saloni.ID}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        [Route("PreuzmiSalone")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSalone()
        {
            try
            {
                return Ok(await Context.Saloni.Select(p => new { p.ID, p.Naziv,p.Adresa,p.Telefon,p.RadnoVremeOd,p.RadnoVremeDo,p.MaxBrojTermina }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiTermine")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiTermine()
        {
            try
            {
                return Ok(await Context.TerminiKlijenata.Select(p => new { p.IDTermina }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       /* [EnableCors("CORS")]
        [Route("Saloni")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> PreuzmiTermin([FromQuery] int[] terminid)
        {
            try
            {
                var klijenti = Context.Klijenti
                    .Include(p => p.TerminiKlijenata);
                    //.ThenInclude(p => p.)
                    //.Include(p => p.KlijentKozmeticar)
                    //.ThenInclude(p => p.Te);
                
                var klijent = await klijenti.ToListAsync();

                return Ok
                (
                    klijent.Select(p =>
                    new
                    {
                        
                        Ime = p.Ime,
                        Prezime = p.Prezime,
                        klijentKozmeticar = p.KlijentKozmeticar
                            .Where(q => terminid.Contains(q.TerminiKlijenata.IDTermina))
                            .Select(q =>
                            new
                            {
                                Ime = q.Kozmeticar.Ime ,
                                Prezime = q.Kozmeticar.Prezime,
                                Struka = q.Kozmeticar.Struka,
                               
                            })
                    }).ToList()
                );    


            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        /*[EnableCors("CORS")]
        [Route("VratiTermine/{SalonID}")]
        [HttpGet]
        public async Task<ActionResult> VratiTermin(int SalonID)
        {
            try
            {
                var salon = await Context.Saloni.Where(s => s.ID == SalonID).FirstAsync();
                if (salon == null)
                    throw new Exception("Salon ne postoji!");
                var termini = await Context.TerminiKlijenata.Where(t => t.Saloni.ID == SalonID).Select(t => new
                {
                    IDTermina=t.IDTermina,
                    Vreme=t.Vreme,
                    BrojTermina=t.BrojTermina
                }).ToListAsync();
                return Ok(termini);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        /*[Route("PreuzmiZadateTermine")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiZadateTermine()
        {
            try{
                
                var t1=await Context.Saloni
                .Include(s => s.Termini)
                .ToListAsync();

                var t2=t1
                .Select(s=>s.Termini.Select(t=>
                new{
                        IDTermina=t.IDTermina,
                        Vreme=t.Vreme,
                        Saloni=t.Saloni,
                        //MaxBrojTermina=t.MaxBrojTermina
                    })).ToList();
                    return Ok(t2);
            }
             catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
    }
}
