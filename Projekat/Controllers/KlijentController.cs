using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KlijentController : ControllerBase
    {
        public SalonContext Context{get;set;}
        public KlijentController(SalonContext context)
        {
           Context=context;
        }
        [Route("DodatiKlijenta/{ime}/{prezime}/{brojTelefona}/{email}")]
        [HttpPost]
        public async Task<ActionResult> DodatiKlijenta(string ime,string prezime,int brojTelefona,string email)
        {
            var k = Context.Klijenti.Where(k => k.Email == email).FirstOrDefault();
            if(k==null)
            {
                if (string.IsNullOrWhiteSpace(ime) || ime.Length > 255)
                {
                    return BadRequest("Pogrešno Ime!");
                }

                if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 255)
                {
                    return BadRequest("Pogrešno Prezime!");
                }
                
                /*if(brojTelefona>9)
                {
                    return BadRequest("Pogrešan Telefon!");
                }*/
                string pattern = @"^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$";
                bool IsEmail = Regex.IsMatch(email, pattern);
                if(string.IsNullOrWhiteSpace(email) || IsEmail == false)
                {
                    return BadRequest("Email je prazan ili ima neodgovarajuci format!");
                }
                if (string.IsNullOrWhiteSpace(email) || email.Length > 50)
                {
                    return BadRequest("Pogrešan email!");
                }
                try
                {
                    Klijent klijent=new Klijent
                    {
                        Ime=ime,
                        Prezime=prezime,
                        BrojTelefona=brojTelefona,
                        Email=email
                    };
                    Context.Klijenti.Add(klijent);
                    await Context.SaveChangesAsync();
                    return Ok(klijent.IDKlijenta);

                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
            else
            {
                return Ok(k.IDKlijenta);
            }
        }
        [Route("IzbrisiKlijenta")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiKlijenta(int IDKlijenta)
        {
            /*if(idklijenta<=0)
            {
                return BadRequest("ID je los!");
            }*/
             try
            {
                var klijent = await Context.Klijenti.FindAsync(IDKlijenta);
                Context.Klijenti.Remove(klijent);
                await Context.SaveChangesAsync();
                return Ok($"Klijent je uspesno otkazan: ");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("VratiKlijenta/{IDTermina}")]
        [HttpGet]
        public async Task<ActionResult> VratiKlijenta(int IDTermina)
        {
            try{
                var termini=await Context.TerminiKlijenata.Where(t=>t.IDTermina==IDTermina).FirstAsync();
                        if(termini==null)
                            throw new Exception("Ne postoji termin sa tim ID-jem!");
                var klijenti=await Context.TerminiKlijenata.Where(t=>t.IDTermina==IDTermina).Include(kl=>kl.Klijent).Select(kl=>new
                {
                    Ime=kl.Klijent.Ime,
                    Prezime=kl.Klijent.Prezime


                }).ToListAsync();
                return Ok(klijenti);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(e.Message);
            }
        }
    }
}