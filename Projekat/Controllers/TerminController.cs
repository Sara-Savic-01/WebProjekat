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
    public class TerminController : ControllerBase
    {
        public SalonContext Context{get;set;}
        public TerminController(SalonContext context)
        {
           Context=context;
        }
        /*[EnableCors("CORS")]
        [Route("ZakaziTermin/{Vreme}/{BrojTermina}/{Stanje}/{KlijentID}/{KozmeticarID}/{SalonID}")]
        [HttpPost]
        public async Task<ActionResult> ZakaziTermin(int Vreme,int BrojTermina,string Stanje,int KlijentID,int KozmeticarID,int SalonID)
        {
            try{
                var klijent = await Context.Klijenti.Where(p => p.IDKlijenta == KlijentID).FirstOrDefaultAsync();
                var kozmeticar = await Context.Kozmeticari.Where(p => p.IDKozmeticara == KozmeticarID).FirstOrDefaultAsync();
                var salon = await Context.Saloni.Where(s => s.ID == SalonID).FirstOrDefaultAsync();
                if (klijent == null)
                    throw new Exception("Ne postoji klijent sa tim ID-jem!");
                if (kozmeticar == null)
                    throw new Exception("Ne postoji kozmeticar sa tim ID-jem!");
                if (salon == null)
                    throw new Exception("Ne postoji salon sa tim ID-jem!");
                        

                Termin t = new Termin();
                t.Vreme=Vreme;
                t.BrojTermina=BrojTermina;
                t.Stanje=Stanje;
                t.Klijent=klijent;
                t.Kozmeticar=kozmeticar;
                t.Saloni=salon;

                Context.TerminiKlijenata.Add(t);
                salon.Termini.Add(t);

                await Context.SaveChangesAsync();

                return Ok($"Dodat Termin: {t.IDTermina}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        [Route("DodajTermin/{vreme}/{brojtermina}/{slobodan}/{KlijentID}/{KozmeticarID}/{salonid}")]
        [HttpPost]
        public async Task<ActionResult>  DodajTermin(int vreme,int brojtermina,bool slobodan,int KlijentID,int KozmeticarID,int salonid)
        {
            var t1=await Context.TerminiKlijenata.Where(tr=>/*tr.Klijent.IDKlijenta==KlijentID&&tr.Kozmeticar.IDKozmeticara==KozmeticarID&&*/tr.Vreme==vreme&&tr.BrojTermina==brojtermina).FirstOrDefaultAsync();
            if(t1==null)
            {
                    try{
                        var klijent=await Context.Klijenti.Where(kl=>kl.IDKlijenta==KlijentID).FirstAsync();
                        if(klijent==null)
                            throw new Exception("Ne postoji klijent sa tim ID-jem!");
                        var kozmeticar=await Context.Kozmeticari.Where(ko=>ko.IDKozmeticara==KozmeticarID).FirstAsync();
                        if(kozmeticar==null)
                            throw new Exception("Ne postoji kozmeticar sa tim ID-jem!");
                        var salon=await Context.Saloni.Where(s=>s.ID==salonid).FirstAsync();
                        if(salon==null)
                            throw new Exception("Ne postoji salon sa tim ID-jem!");
                        //int vreme;
                        Termin t=new Termin{
                            Vreme=vreme,
                            BrojTermina=brojtermina,
                            Slobodan=slobodan,
                            Klijent=klijent,
                            Kozmeticar=kozmeticar,
                            Saloni=salon

                        };
                        Context.TerminiKlijenata.Add(t);
                        await Context.SaveChangesAsync();
                        var t2=new{
                            IDTermina=t.IDTermina,
                            
                            //Slobodan=t.Slobodan
                            //BrojTermina=t.BrojTermina,
                        // KlijentID=t.Klijent.IDKlijenta,
                            //KozmeticarID=t.Kozmeticar.IDKozmeticara,
                            //Stanje=t.Stanje
                        };
                        return Ok(t2);
                        //return Ok("Uspesno ste zakazali termin!");


                    }
                    catch (Exception e)
                    {
                        return BadRequest(e.Message);
                    }
            }
            else{
                var t3=new{
                    IDTermina=t1.IDTermina
                };
                return Ok(t3);
            }
            
            

        }
        [Route("ZakaziTermin/{IDTermina}/{KlijentID}")]
        [HttpPut]
        public async Task<ActionResult> ZakaziTermin(int IDTermina,int KlijentID)
        {
            try{
                    var termin=await Context.TerminiKlijenata.Where(t=>t.IDTermina==IDTermina).FirstAsync();
                        if(termin==null)
                            throw new Exception("Ne postoji termin sa tim ID-jem!");
                     var klijent=await Context.Klijenti.Where(kl=>kl.IDKlijenta==KlijentID).FirstAsync();
                        if(klijent==null)
                            throw new Exception("Ne postoji klijent sa tim ID-jem!");
                    termin.Slobodan=false;
                    termin.Klijent=klijent;
                    Context.Update(termin);
                    await Context.SaveChangesAsync();
                    return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
        [Route("OtkaziTermin/{IDTermina}")]
        [HttpPut]
        public async Task<ActionResult> OtkaziTermin(int IDTermina)
        {
            try{
                    var termin=await Context.TerminiKlijenata.Where(t=>t.IDTermina==IDTermina).FirstAsync();
                        if(termin==null)
                            throw new Exception("Ne postoji termin sa tim ID-jem!");
                    termin.Slobodan=true;
                    Context.Update(termin);
                    await Context.SaveChangesAsync();
                    return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
        [Route("IzmeniTermin/{IDTermina}/{vreme}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniTermin(int IDTermina,int vreme)
        {
            try{

                    var termin=await Context.TerminiKlijenata.Where(t=>t.IDTermina==IDTermina).FirstAsync();
                        if(termin==null)
                            throw new Exception("Ne postoji termin sa tim ID-jem!");
                    
                    termin.Vreme=vreme;
                    /*termin.BrojTermina=brojtermina;
                    termin.Slobodan=false;*/
                    //termin.Klijent=klijent;
                    Context.Update(termin);
                    await Context.SaveChangesAsync();
                    return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
        [Route("IzbrisiTermin/{IDSalona}/{brojtermina}/{vreme}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiTermin(int IDSalona,int brojtermina,int vreme)
        {
            if(IDSalona<=0)
            {
                return BadRequest("ID je los!");
            }
             try
            {
                var termin = await Context.TerminiKlijenata.Where(p=>p.Vreme==vreme&&p.BrojTermina==brojtermina&&p.Saloni.ID==IDSalona).FirstOrDefaultAsync();
                Context.TerminiKlijenata.Remove(termin);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("IzmeniTermin/{IDKlijenta}/{IDKozmeticara}/{Vreme}/{brojtermina}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniTermin(int IDKlijenta,int IDKozmeticara,int Vreme,int brojtermina)
        {
           
            try
            {
               var klijent=await Context.Klijenti.Where(kl=>kl.IDKlijenta==IDKlijenta).FirstAsync();
                if(klijent==null)
                    throw new Exception("Ne postoji klijent sa tim ID-jem!");
                var kozmeticar=await Context.Kozmeticari.Where(ko=>ko.IDKozmeticara==IDKlijenta).FirstAsync();
                if(kozmeticar==null)
                    throw new Exception("Ne postoji kozmeticar sa tim ID-jem!");
                var termin=await Context.TerminiKlijenata.Where(p=>p.Klijent.IDKlijenta==IDKlijenta&&p.Kozmeticar.IDKozmeticara==IDKozmeticara).FirstOrDefaultAsync();
                termin.Vreme=Vreme;
                //termin.BrojTermina=brojtermina;
                //termin.Slobodan=false;
                Context.Update(termin);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*[Route("PreuzmiTermin/{vreme}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiTerminPoVremenu(int vreme)
        {
            try
            {
                var termini=await Context.TerminiKlijenata.Where(t=>t.Vreme==vreme)
                .Select(t=>new{
                    //IDTermina=t.IDTermina,
                    Vreme=t.Vreme

                }).ToListAsync();
                return Ok(termini);
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
                var termini = await Context.TerminiKlijenata./*Where(t => t.Saloni.ID == SalonID)*//*Select(t => new
                {
                    IDTermina=t.IDTermina,
                    Vreme=t.Vreme
                }).ToListAsync();
                return Ok(termini);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        [Route("PreuzmiSveTermine/{SalonID}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSveTermine(int SalonID)
        {
            if(SalonID<0)
            {
                return BadRequest("Nevalidan je ID");
            }
            try{
                var termini=await Context.Saloni.Where(p=>p.ID==SalonID)
                .Include(p=>p.Termini)
                .ToListAsync();

                var termin=termini.Select(p=>
                p.Termini.Select(pr=>
                new{

                    Vreme=pr.Vreme,
                    BrojTermina=pr.BrojTermina,
                    //Stanje=pr.Stanje
                }
                )).ToList();
                return Ok(termin);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [EnableCors("CORS")]
        [Route("VratiTermine/{SalonID}")]
        [HttpGet]
        public async Task<ActionResult> VratiTermin(int SalonID)
        {
            try
            {
                var salon = await Context.Saloni.Where(s => s.ID == SalonID).FirstAsync();
                if (salon == null)
                    throw new Exception("Salon ne postoji!");
                var termini = await Context.TerminiKlijenata.Where(t => t.Saloni.ID == SalonID).Select( p=> new
                {
                    IDTermina=p.IDTermina,
                    Vreme=p.Vreme,
                    BrojTermina=p.BrojTermina,
                    Slobodan=p.Slobodan,
                    KlijentID=p.Klijent.IDKlijenta,
                    KozmeticarID=p.Kozmeticar.IDKozmeticara,
                    salonID=p.Saloni.ID
                   
                }).ToListAsync();
                return Ok(termini);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*[Route("DodatiTermin/{IDKlijenta}/{IDKozmeticara}")]
        [HttpPost]
        public async Task<ActionResult> DodajTermin(int IDKlijenta, int IDKozmeticara,[FromBody] int vreme)
        {
            if(IDKlijenta <= 0)
            {
                return BadRequest("Nevalidan ID klijenta!");
            }

            if(IDKozmeticara <= 0)
            {
                return BadRequest("Nevalidan ID Kozmeticara!");
            }

            try
            {
                var klijent = await Context.Klijenti.FindAsync(IDKlijenta);
                var kozmeticar = await Context.Kozmeticari.FindAsync(IDKozmeticara);
                //var brtermina=await Context.TerminiKlijenata.FindAsync()
                int vr=vreme;
                //int brtermina=await Context.TerminiKlijenata.B
                //string st=stanje;
                Termin t = new Termin
                {
                    Vreme =vr,
                    //BrojTermina=t.BrojTermina,
                    //Stanje=st,
                    Klijent= klijent,
                    Kozmeticar = kozmeticar
                };
                Context.TerminiKlijenata.Add(t);
               
                
                await Context.SaveChangesAsync();
                var r1 =new 
                 
                {
                    IDTermina = t.IDTermina,
                    Vreme = t.Vreme,
                    BrojTermina=t.BrojTermina,
                    Stanje=t.Stanje,


                };
                return Ok(r1);
            }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske:" + e.Message);
            }
        }*/

    }
}