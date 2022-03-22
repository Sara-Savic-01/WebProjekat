import {Termin} from "./Termin.js";
export class Salon{
    constructor(id,naziv,adresa,telefon,radnoVremeOd,radnoVremeDo,maxbrojtermina)
    {
        this.id=id;
        this.naziv=naziv;
        this.adresa=adresa;
        this.telefon=telefon;
        this.radnovremeOd=radnoVremeOd;
        this.radnovremeDo=radnoVremeDo;
        this.termini=[];
        this.Kozmeticari=[];
        this.maxbrojtermina=maxbrojtermina;
        this.kontejner=null;
    }
    DodajTermin(termin)
    {
        if(this.id==termin.salonid)
        {
            this.termini.push(termin);
    }
    }
    DodajKozmeticara(kozmeticar)
    {
        if(this.id==kozmeticar.salonID)
        {
            this.Kozmeticari.push(kozmeticar);
        }
    }
    CrtajSveTermine(host)
    {
        this.kontejner=document.createElement("div");
        this.kontejner.className="Termini";
        host.appendChild(this.kontejner);
        let red = document.createElement("div");
        red.className ="redTermina";
        //red.innerHTML = "termin";
        this.kontejner.appendChild(red);
        //let salonid=this.id;
        fetch("https://localhost:5001/Termin/VratiTermine/"+this.id,
        {
            method:"GET"
        }).then(p=>{
             p.json().then(data=>{
            var niz = [];
            var brel =0;
            data.forEach(termin=>{
            //alert(poslasticara.naziv);
            let termin1=new Termin(termin.idTermina,termin.vreme,termin.brojtermina,termin.slobodan,termin.klijentID,termin.kozmeticarID,termin.salonID);
            //console.log(sto.idStola);
            //console.log(termin.brojtermina);
            console.log(termin.vreme);
            //console.log(termin.stanje);

                    if(termin1.salonID==this.id){
                    niz[brel++]=termin.brojtermina;
                    this.DodajTermin(termin1);
                    termin1.crtajTermin(red);
                    //termin1.ZakaziTermin(termin.vreme);
                   }
  
                
            });
            for(let i =0;i<this.maxbrojtermina;i++)
            {
                var zauzet = false;
                for(var j =0;j<brel;j++)
                {
                    if(i==niz[j])
                    {
                        zauzet= true;
                        break;
                    }
                }
                if(zauzet == false)
                {
                    
                    let termin = new Termin(" "," "," ",i," ",this.id);
                    if(termin.salonID===this.id){
                    this.DodajTermin(termin);
                    termin.crtajTermin(red);
                    //termin.ZakaziTermin(termin.vreme);
                    }

                }
            }
        
        });
    });

}
Klinuto(ime,prezime)
{
    let kontTer=this.kontejner.querySelector(".terminKontejner");
    kontTer.addEventListener("click", () => {
                                        
        confirm("Klijent " + ime + " " + prezime + " je zakazao termin ");
    });
}
ZakaziTermine(vreme)
{
    fetch("https://localhost:5001/Termin/VratiTermine/"+this.id,
        {
            method:"GET"
        }).then(p=>{
             p.json().then(data=>{
                 //data.forEach(t=>{
                     let t1=new Termin(data.idTermina,data.vreme,data.brojtermina,data.slobodan,data.klijentID,data.kozmeticarID,data.salonID);
                     this.DodajTermin(t1);
                 
              
                     if(t1.slobodan===false)
                        alert("Ovaj termin nije slobodan!");
                    else{
                        
                            //this.brojtermina=brojtermina;
                            
                            t1.vreme=vreme;
                            t1.slobodan=false;
                            this.kontejner.innerHTML+="Termin:" + t1.vreme +"\n je" + "\t zauzet";
                            //this.kontejner.style.backgroundColor=t.vratiStanje(); 
                        }
                    })
                })
                 
    //this.termini[vreme].ZakaziTermin(vreme);
}
OtkaziTermin(vreme)
{
    fetch("https://localhost:5001/Termin/VratiTermine/"+this.id,
        {
            method:"GET"
        }).then(p=>{
             p.json().then(data=>{
                 data.forEach(t=>{
                     let t1=new Termin(t.idTermina,t.vreme,t.brojtermina,t.stanje,t.klijentID,t.kozmeticarID,t.salonID);
                     t.vreme=vreme;
                     t.slobodan=true;
                     this.kontejner.innerHTML+="Termin:" + t.vreme +"\n je" + "\t slobodan";
                    //this.kontejner.style.backgroundColor=t.vratiStanje();
                    
                 })
                })
            })


}
Kliknuto(vreme)
    {
        this.kontejner.addEventListener("click", () => {
            
            confirm("Termin u vremenu " + vreme + " "+ "je zauzet");
        });
    }
IzmeniTermin(vreme)
{
    fetch("https://localhost:5001/Termin/VratiTermine/"+this.id,
        {
            method:"GET"
        }).then(p=>{
             p.json().then(data=>{
                 data.forEach(t=>{
                     let t1=new Termin(t.idTermina,t.vreme,t.brojtermina,t.stanje,t.klijentID,t.kozmeticarID,t.salonID);
                     t1.vreme=vreme;
                    this.konejner.innerHTML+= "Termin :" +  t1.vreme +"\n je" + "\t zauzet";})
                 })
                })
}


    /*nacrtaj(host)
    {
        const ter= document.createElement("div");
        ter.className="crtaniTermini";
        //const redTermina=document.createElement("div");
        //redTermina.className="redTermina";
        //this.kontejner.querySelector(".redTermina1").appendChild(ter);
        this.kontejner=document.createElement("div");
        this.kontejner.className="Termini";
        host.appendChild(this.kontejner);


            fetch("https://localhost:5001/Termin/VratiTermine/"+this.idsalona,
            {
                method:"GET"
            }).then(p=>{
             p.json().then(data=>{
            var niz = [];
            var brel =0;
            data.forEach(t=>{
            //alert(poslasticara.naziv);
            const termince=new Termin(t.vreme,t.brojtermina,t.stanje,this.id);
            //console.log(sto.idStola);
            console.log(termince);
            console.log(t.brojtermina);
           
                    niz[brel++]=t.brojtermina;
                    //this.dodajSto(sto1);
                    //sto1.crtajSto1(stolovi);
                    this.DodajTermin(termince);
                    termince.crtajTermin(this.kontejner);
                   
  
                
            });
            for(let i =0;i<this.maxbrojtermina;i++)
            {
                var zauzet = false;
                for(var j =0;j<brel;j++)
                {
                    if(i==niz[j])
                    {
                        zauzet= true;
                        break;
                    }
                }
                if(zauzet == false)
                {
                    const termin1 = new Termin(" ",1,"slobodan", 1);
                    this.DodajTermin(termin1);
                    termin1.crtajTermin(ter);

                }
            }
        });
    });*
       
           
    }
    /*vratiStanje(){
        /*if(this.termini.forEach)
            return "rgb(255,255,255)";
        else
            return "rgb(168, 117, 164)";*/
        /*this.termini.forEach(t=>{
            if(t.stanje==="slobodan")
            {
                return "rgb(255,255,255)";
            }
            else
            {
                return "rgb(168, 117, 164)"
            }
        })    

    }
    crtajTermin(host)
    {
        this.kont=document.createElement("div");
        this.kont.className="terminKontejner";
        this.termini.forEach(tr=>{
            this.kont.innerHTML=tr.brojtermina + "\n" +"\n slobodan";
        })
        //this.kont.innerHTML=this.brojtermina + "\n" +"\n slobodan";
        this.kont.style.backgroundColor=this.vratiStanje();
        host.appendChild(this.kont);
    }*/
    /*zakaziTermin()
    {
        fetch("https://localhost:5001/Termin/VratiTermine/"+this.idsalona,
        {
            method:"GET"
        }).then(p=>{
             p.json().then(data=>{
                data.forEach(termin=>{
                    let termin1=new Termin(termin.id,termin.vreme,termin.brojtermina,termin.stanje,this.idsalona);
                    termin1.ZakaziTermin(termin.vreme);
                });
            });
        });
    }*/
}

