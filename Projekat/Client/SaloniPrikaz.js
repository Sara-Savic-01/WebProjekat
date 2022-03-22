import {Termin} from "./Termin.js";
import {Salon}  from "./Salon.js";
import {Kozmeticar} from "./Kozmeticar.js";
import {Usluga} from "./Usluga.js";
import {Klijent} from "./Klijent.js";


export class SaloniPrikaz{
    constructor(listaSalona,listaUsluga,listaKozmeticara)
    {
        this.listaSalona=listaSalona;
        this.listaUsluga=listaUsluga;
        this.listaKozmeticara=listaKozmeticara;
        this.terminicici=[];
        this.kontejner=null;
        
        this.kon1=null;
        this.kon2=null;
        this.kon3=null;
        this.kon4=null;
    }
    DodajTermine(termince)
    {
        this.terminicici.push(termince);
    }
    crtajSalon(host){
        this.kontejner=document.createElement("div");
        this.kontejner.className="kontSalon";
        host.appendChild(this.kontejner);
        console.log(this.kontejner);
        let kon1=document.createElement("div");
        kon1.className="Form";
        kon1.id="Form1";
        this.kontejner.appendChild(kon1);
        this.kon1=kon1;
        this.kon2=document.createElement("div");
        this.kon2.className="Forma";
        //kon2.id="Form2";
        host.appendChild(this.kon2);
        console.log(this.kon2);
        
        let kon3=document.createElement("div");
        kon3.className="Form";
        kon3.id="Form3";
        this.kon2.appendChild(kon3);
        this.kon3=kon3;
        let kon4=document.createElement("div");
        kon4.className="Form";
        kon4.id="Form4";
        this.kon2.appendChild(kon4);
        this.kon4=kon4;
        this.CrtajKon1();
        this.CrtajKon2();
        
    }
    CrtajKon1()
    {
        let salon=this.crtajSalon1(this.kon1,"salon");
        this.Labela(salon,"Salon","labelSalon");
        let odaberiSalon = this.crtajSelect(salon, "selectSalon");
            this.listaSalona.forEach(s =>{
        this.crtajOption(odaberiSalon, s);
        })
        let dugmeIzaberiSalon = this.crtajDugme(salon, "Izaberite salon", "dugmeIzaberiSalon");
        let usluga=this.crtajSalon1(this.kon1,"usluga");
        usluga.idUsluge="usluga";

        let redTermina1 = this.crtajSalon1(this.kon4, "redTermina1");
        redTermina1.idsalona = "redTermina1";
        
        
        /*let kozmeticar=this.crtajSalon1(this.kon2,"kozmeticar");
        kozmeticar.idKozmeticara="kozmeticar";*/



        dugmeIzaberiSalon.onclick=(ev)=>this.IzaberiSalon();
        
    }
    CrtajKon2(){
        //this.Labela(this.kon2,"Zakazite termin","labelNaslov");
        this.crtajSalon1(this.kon3,"UnesitePodatke");
        this.crtajSalon1(this.kon3,"Ime");
        this.crtajSalon1(this.kon3,"Prezime");
        this.crtajSalon1(this.kon3,"Email");
        this.crtajSalon1(this.kon3,"BrojTelefona");
        this.crtajSalon1(this.kon3,"Vreme");
        this.crtajSalon1(this.kon3,"BrojTermina");
        //this.crtajSalon1(this.kon2,"VremeZaIzmenu");
        let kozmeticar=this.crtajSalon1(this.kon3,"kozmeticar");
        kozmeticar.idKozmeticara="kozmeticar";
        this.crtajSalon1(this.kon3,"ZakaziTermin");
        this.crtajSalon1(this.kon3,"VremeZaIzmenu");
        
        this.crtajSalon1(this.kon3,"ZameniTermin");
        this.crtajSalon1(this.kon3,"OtkaziTermin");
        this.crtajSalon1(this.kon3,"IzbrisiTermin");
        /*let kozmeticar=this.crtajSalon1(this.kon2,"kozmeticar");
        kozmeticar.idkozmeticara="kozmeticar";*/
        //kozmeticar=this.crtajCheckBox("kozmeticar");



    
    } 
    crtajInput(host, className){
        let input = document.createElement("input");
        input.className = className;
        host.appendChild(input);
    }
    crtajSalon1(host,className)
    {
        let s=document.createElement("div");
        s.className=className;
        host.appendChild(s);
        return s;
    }
    Labela(host,name,className)
    {
        let label=document.createElement("label");
        label.innerHTML=name+":";
        label.className=className;
        host.appendChild(label);
        return label;


    }
    crtajSelect(host,className)
    {
        let s=document.createElement("select");
        s.className=className;
        host.appendChild(s);
        return s;

    }
    crtajOption(host,obj)
    {
        let o=document.createElement("option");
        o.innerHTML=obj.naziv;
        o.value=obj.id;
        host.appendChild(o);

    }
    crtajDugme(host,name,className)
    {
        let but=document.createElement("button");
        but.innerHTML=name;
        but.className=className;
        host.appendChild(but);
        return but;
    }
    IzaberiSalon()
    {
        //this.RefreshSadrzaj(".usluga");
        //this.RefreshSalon();
        
            
        
        
        let usluga=this.kon1.querySelector(".usluga");
        this.Labela(usluga,"Usluga","labelUsluga");
        let odaberiUslugu = this.crtajSelect(usluga, "selectUsluga");
            this.listaUsluga.forEach(u=>{
                let op = document.createElement("option");
                op.innerHTML = u.vrstaUsluge;
                op.value = u.idUsluge;
                odaberiUslugu.appendChild(op);
            }
                )
        let dugmeIzaberiUslugu = this.crtajDugme(usluga, "Izaberite uslugu", "dugmeIzaberiUslugu");
        var btn=this.kon1.querySelector(".dugmeIzaberiSalon");
        btn.disabled=true;
    
            //this.listaUsluga.forEach(u =>{
        //this.crtajOption(odaberiUslugu, u);
        /*let o=document.createElement("option");
        o.innerHTML=obj.vrsta;
        o.value=obj.id;
        host.appendChild(o);*/

       
        //if(u.idusluge == idusluge){
        /*let op = document.createElement("option");
        op.innerHTML = u.vrsta;
        op.value = u.idusluge;
        odaberiUslugu.appendChild(op);*/
                
            
        
        //let dugmeIzaberiUslugu = this.crtajDugme(usluga, "Izaberite uslugu", "dugmeIzaberiUslugu");
        dugmeIzaberiUslugu.onclick=(ev)=>this.IzaberiUslugu();
        

        /*let saloni=this.kon1.querySelector(".salon");
        let op1=saloni.querySelector("select");
        var salonid=op1.options[op1.selectedIndex].value;
        //let termini = this.listaTermina.filter(t=> t.salonid == salonid);
        let redTermina=this.kon1.querySelector(".redTermina1");
        this.listaSalona.forEach(p=>{
            p.CrtajSveTermine(redTermina);
        })*/
            
            




    }
    IzaberiUslugu()
    {
       
        
        var btn=this.kon1.querySelector(".dugmeIzaberiUslugu");
        btn.disabled=true;
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonID = optionEl.options[optionEl.selectedIndex].value;
        console.log(salonID);
        let ZakaziteTermin = this.kon3.querySelector(".UnesitePodatke");
        let dugmeZakaziteTermin = this.crtajDugme(ZakaziteTermin, "Unesite podatke", "dugmeZakaziteTermin");
        ZakaziteTermin.appendChild(dugmeZakaziteTermin);
        dugmeZakaziteTermin.onclick=(ev)=>this.ZakaziTermin();
        
        /*let saloni=this.kon1.querySelector(".salon");
        let op1=saloni.querySelector("select");
        var salonid=op1.options[op1.selectedIndex].value;
        //let termini = this.listaTermina.filter(t=> t.salonid == salonid);
        let redTermina=this.kon1.querySelector(".redTermina");
        this.listaSalona.forEach(p=>{
            p.termini.forEach(t=>{
                if(t.idsalona==salonid)
                {
                    t.crtajTermine(redTermina,salonid);
                }
            })})*/
     
            //let termini = this.listaTermina.filter(t=> t.salonid == salonid);
        

        let redTermina=this.kon4.querySelector(".redTermina1");
        let saloni=this.listaSalona.filter(s=>s.id==salonID);
        saloni.forEach(s1=>{
            s1.CrtajSveTermine(redTermina);
        })
        let redStanje = this.crtajSalon1(this.kon1, "redStanje");
        redStanje.id = "redStanje";
        let labela=document.createElement("label");
        labela.innerHTML="Stanje Termina";
        labela.className="labele";
        redStanje.appendChild(labela);

        let dugmeZauzeto=document.createElement("button");
        dugmeZauzeto.innerHTML="Zauzeto";
        dugmeZauzeto.className="dugmici";
        redStanje.appendChild(dugmeZauzeto);
        let dugmeSlobodno=document.createElement("button");
        dugmeSlobodno.innerHTML="Slobodno";
        dugmeSlobodno.className="dugmici1";
        redStanje.appendChild(dugmeSlobodno);
        //this.RefreshSadrzaj1(".UnesitePodatke");*/

        //})
        /*this.listaSalona.forEach(s=>{
           // s.termini.forEach(t=>{
                //if(t.salonID==salonID)
                //{
                    s.CrtajSveTermine(redTermina);
                //}
            })*/
            
                
                    //s.CrtajSveTermine(redTermina);
                
            
                //p.nacrtaj(redTermina);
            
                    
            //}) 

            //this.RefreshSadrzaj();
        
            
        
    }
    /*Kliknuto()
    {
        let idTermina;
        let ime;
        let prezime;
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonid = optionEl.options[optionEl.selectedIndex].value;
        fetch("https://localhost:5001/Termin/VratiTermine/"+salonid,
        {
            method:"GET"
        }).then(p=>{
             p.json().then(data=>{
                data.forEach(termin=>{
                    let termin1=new Termin(termin.idTermina,termin.vreme,termin.brojtermina,termin.slobodan,termin.klijentID,termin.kozmeticarID,termin.salonID);
                    idTermina=termin1.idTermina;
                    fetch("https://localhost:5001/Klijent/VratiKlijenta/"+idTermina,
                    {
                        method:"GET"
                    }).then(k=>{
                        k.json().then(data1=>{
                            data1.forEach(klijent=>{
                                let klijent1=new Klijent(klijent.idKlijenta,klijent.ime,klijent.prezime,klijent.brojtelefona,klijent.email);
                                ime=klijent1.ime;
                                prezime=klijent1.prezime;
                                this.kontejner.addEventListener("click", () => {
            
                                    confirm("Klijent " + ime + prezime +" je zakazao termin " + vreme);
                                });

                            })

                        }

                        )
                    })
                })
            })
        })
        
    }*/
    ZakaziTermin()
    {

        /*let l1=document.createElement("label");
        l1.innerHTML="Zakazite Termin";
        this.kon2.appendChild(l1);*/
        var btn=this.kon3.querySelector(".dugmeZakaziteTermin");
        btn.disabled=true;
        let Ime = this.kon3.querySelector(".Ime");
        let label1 = this.Labela(Ime, "Ime", "labelIme");
        let input = this.crtajInput(Ime, "inputIme");
        let Prezime = this.kon3.querySelector(".Prezime");
        label1 = this.Labela(Prezime, "Prezime", "labelPrezime");
        input = this.crtajInput(Prezime, "inputPrezime");
        let Email = this.kon3.querySelector(".Email");
        label1 = this.Labela(Email, "Email", "labelEmail");
        input = this.crtajInput(Email, "inputEmail");
        let BrojTelefona = this.kon3.querySelector(".BrojTelefona");
        label1 = this.Labela(BrojTelefona, "Broj Telefona", "labelBrojTelefona");
        input = this.crtajInput(BrojTelefona, "inputBrojTelefona");
        let Vreme=this.kon3.querySelector(".Vreme");
        label1 = this.Labela(Vreme, "Vreme termina", "labelVreme");
        input = this.crtajInput(Vreme, "inputVreme");
        let BrojTermina=this.kon3.querySelector(".BrojTermina");
        label1 = this.Labela(BrojTermina, "Broj Termina", "labelBrojTermina");
        input = this.crtajInput(BrojTermina, "inputBrojTermina");


        

        let Zakazi = this.kon3.querySelector(".ZakaziTermin");
        let dugmeZakazi = this.crtajDugme(Zakazi, "Zakazite ", "dugmeZakazi");
        dugmeZakazi.onclick=(ev)=>this.ZakaziteTermin();
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonID = optionEl.options[optionEl.selectedIndex].value;
        let redUsluga = this.kon1.querySelector(".usluga");
        let optionEl1 = redUsluga.querySelector("select");
        var uslugaID = optionEl.options[optionEl1.selectedIndex].value;
        console.log(uslugaID);
        let kozmeticar=this.kon3.querySelector(".kozmeticar");
        this.Labela(kozmeticar,"Kozmeticar","labelKozmeticar");
        let odaberiKozmeticara = this.crtajSelect(kozmeticar, "selectKozmeticar");
           
            let kozm=this.listaKozmeticara.filter(k=>k.uslugaID==uslugaID&&k.salonID==salonID);
            kozm.forEach(k=>{
                let op = document.createElement("option");
                op.innerHTML += k.ime + k.prezime;
                op.value = k.idKozmeticara;
                odaberiKozmeticara.appendChild(op);
            })
           

    }
    /*crtajCheckBox(host)
    {
        let labelaKoz=document.createElement("label");
        labelaKoz.innerHTML="Kozmeticari";
        host.appendChild(labelaKoz);
        let cbbox=document.createElement("div");
        cbbox.cbbox="cbbox";
        host.appendChild(cbbox);
        let cb;
        this.listaUsluga.forEach(p=>{
            p.kozmeticari.forEach(k=>{
                cb=document.createElement("input");
                cb.type="checkbox";
                cb.value=k.idKozmeticara;
                cbbox.appendChild(cb);
                labelaKoz=document.createElement("label");
                labelaKoz.innerHTML=k.ime;
                cbbox.appendChild(labelaKoz);
                labelaKoz=document.createElement("label");
                labelaKoz.innerHTML=k.prezime;
                cbbox.appendChild(labelaKoz);


            })
        })
        return cbbox;

    }*/
    ZakaziteTermin()
    {

        let ulazi=this.kon3.querySelectorAll("input");
        let ime=ulazi[0].value;
        console.log(ime);
        let prezime=ulazi[1].value;
        console.log(prezime);
        let email=ulazi[2].value;
        console.log(email);
        let brojtelefona=ulazi[3].value;
        console.log(brojtelefona);
        var status=true;
        if(ime.length === 0 || /\d/.test(ime) || ime.length>255){
            alert("Ime nije validno!");
            status = false;
        }
        if(prezime.length === 0 || /\d/.test(prezime) || prezime.length>255){
            alert("Prezime nije validno!");
            status = false;
        }
        if(email.length === 0 /*|| !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(email)*/){
            alert("Email nije validan!");
            status = false;
        }
        if(brojtelefona===0 /*||/\d/.test(brojtelefona)*/ )
        {
            alert("Broj telefona nije validan!");
            status = false;
        }
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonid = optionEl.options[optionEl.selectedIndex].value;
        console.log(salonid);
        //let redKozmeticara = this.kon2.querySelector(".kozmeticar");
        let optionEl1 = this.kon3.querySelector(".selectKozmeticar");
        //console.log(optionEl1);
        var KozmeticarID = optionEl1.options[optionEl1.selectedIndex].value;
        console.log(KozmeticarID);
        var KlijentID;
        var idTermina;
        let vreme=ulazi[4].value;
        console.log(vreme);
        let brojtermina=ulazi[5].value;
        console.log(brojtermina);
        //let trajanje;
        //console.log(stanje);
        var slobodan=new Boolean(true);
        if(status===true)
        {
            fetch("https://localhost:5001/Klijent/DodatiKlijenta/"+ime+"/"+prezime+"/"+brojtelefona+"/"+email,
            {
                method:"POST"
            }).then(kl=>{
                kl.json().then(k=>{
                    KlijentID=k;
                    console.log(KlijentID);

                    fetch("https://localhost:5001/Termin/DodajTermin/"+vreme+"/"+brojtermina+"/"+slobodan+"/"+KlijentID+"/"+KozmeticarID+"/"+salonid,
                    {
                        method:"POST"
                        
                        
                    }).then(tr=>{
                        tr.json().then(t=>{
                            idTermina=t.idTermina;
                            console.log(idTermina);
                            //(slobodan===true){
                                fetch("https://localhost:5001/Termin/ZakaziTermin/"+idTermina+"/"+KlijentID,
                                {
                                    method:"PUT"
                                }).then(p=>{
                                    
                                        if(p.ok){
                                            
                                            this.RefreshTermin();
                                            let redTermina=this.kon4.querySelector(".redTermina1");
                                            
                                            let saloni=this.listaSalona.filter(s=>s.id==salonid);
                                            saloni.forEach(s1=>{
                                                    //s1.ZakaziTermine(vreme);
                                                    //this.RefreshTermin();
                                                    s1.CrtajSveTermine(redTermina);
                                                    //s1.ZakaziTermine(vreme);
                                                    fetch("https://localhost:5001/Klijent/VratiKlijenta/"+idTermina,
                                                    {
                                                        method:"GET"
                                                    }).then(k=>{
                                                        //k.json().then(data1=>{
                                                            if(k.ok){
                                                                k.ime=ime;
                                                                k.prezime=prezime;
                                                                //s1.Klinuto(ime,prezime);
                                                                alert("Klijent" + " " +ime+ " " + prezime + " je zauzeo termin");
                                                                
                                                        }             
                                                                        })
                                                                    })
                                                                }
                                                                    
                                                            })
                        //}
                        /*else{
                            alert("Termin je zauzet!");
                        }                             
                                                        
                                
                        })*/
                    })
                    
                       
                        
                    })
                

            
                
                
                   
                
                    })
                })
        }
        //this.Kliknuto(vreme,ime,prezime);
        //}

            
                         
                    
                
                    
                            
                            
                            
                           
                        
                        //this.termini[vreme].ZakaziTermin(vreme);
                //})
           // })
        
            
                                
                                    
                                
                           //})

                       // })
                    
                
            
        
    
         var btn=this.kon3.querySelector(".dugmeZakazi");
        btn.disabled=true;
        let Otkazi = this.kon3.querySelector(".OtkaziTermin");
        let dugmeOtkazi = this.crtajDugme(Otkazi, "Otkazite Termin ", "dugmeOtkazi");
        dugmeOtkazi.onclick=(ev)=>this.OtkaziteTermin();
        let VremeZaIzmenu=this.kon3.querySelector(".VremeZaIzmenu");
        let label1 = this.Labela(VremeZaIzmenu, "Unesite vreme koje zelite da izmenite", "labelVremeZaIzmenu");
        let input = this.crtajInput(VremeZaIzmenu, "inputVremeZaIzmenu");
        

        let Zameni = this.kon3.querySelector(".ZameniTermin");
        let dugmeZameni = this.crtajDugme(Zameni, "Zamenite vreme termina ", "dugmeZameni");
        dugmeZameni.onclick=(ev)=>this.ZameniteTermin(idTermina);
        let Izbrisi=this.kon3.querySelector(".IzbrisiTermin");
        let dugmeIzbrisi=this.crtajDugme(Izbrisi, "Oznacite da ste zavrsili ", "dugmeIzbrisi");
        dugmeIzbrisi.onclick=(ev)=>this.IzbrisiTermin(vreme,brojtermina);
        let dugmeIzaberiteDrugiSalon=document.createElement("button");
        dugmeIzaberiteDrugiSalon.innerHTML="Izaberite drugi salon";
        dugmeIzaberiteDrugiSalon.className="dugmeDrugiSalon";
        this.kon3.appendChild(dugmeIzaberiteDrugiSalon);
        dugmeIzaberiteDrugiSalon.onclick=(ev)=>this.IzaberiteDrugiSalon();
        


        

    }
   
    
    OtkaziteTermin()
    {
        let ulazi=this.kon3.querySelectorAll("input");
        let ime=ulazi[0].value;
        console.log(ime);
        let prezime=ulazi[1].value;
        console.log(prezime);
        let email=ulazi[2].value;
        console.log(email);
        let brojtelefona=ulazi[3].value;
        console.log(brojtelefona);
        var status=true;
        if(ime.length === 0 || /\d/.test(ime) || ime.length>255){
            alert("Ime nije validno!");
            status = false;
        }
        if(prezime.length === 0 || /\d/.test(prezime) || prezime.length>255){
            alert("Prezime nije validno!");
            status = false;
        }
        if(email.length === 0 || !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(email)){
            alert("Email nije validan!");
            status = false;
        }
        if(brojtelefona===0 /*||/\d/.test(brojtelefona)*/ )
        {
            alert("Broj telefona nije validan!");
            status = false;
        }
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonid = optionEl.options[optionEl.selectedIndex].value;
        console.log(salonid);
        
        //let redKozmeticara = this.kon2.querySelector(".kozmeticar");
        let optionEl1 = this.kon3.querySelector(".selectKozmeticar");
        //console.log(optionEl1);
        var KozmeticarID = optionEl1.options[optionEl1.selectedIndex].value;
        console.log(KozmeticarID);
        var KlijentID;
        var idTermina;
        let vreme=ulazi[4].value;
        console.log(vreme);
        let brojtermina=ulazi[5].value;
        console.log(brojtermina);
        /*let vreme1=ulazi[6].value;
        console.log(vreme1);*/
        //let trajanje;
        //console.log(stanje);
        var slobodan=new Boolean(true);
        if(status===true)
        {
            fetch("https://localhost:5001/Klijent/DodatiKlijenta/"+ime+"/"+prezime+"/"+brojtelefona+"/"+email,
            {
                method:"POST"
            }).then(kl=>{
                kl.json().then(k=>{
                    KlijentID=k;
                    console.log(KlijentID);

                    fetch("https://localhost:5001/Termin/DodajTermin/"+vreme+"/"+brojtermina+"/"+slobodan+"/"+KlijentID+"/"+KozmeticarID+"/"+salonid,
                    {
                        method:"POST"
                        
                        
                    }).then(tr=>{
                        tr.json().then(t=>{
                            idTermina=t.idTermina;
                            console.log(idTermina);
                            fetch("https://localhost:5001/Termin/OtkaziTermin/"+idTermina,
                            {
                                method:"PUT"
                            }).then(p=>{
                                if(p.ok){
                                    this.RefreshTermin();
                                    let redTermina=this.kon4.querySelector(".redTermina1");
                                    let saloni=this.listaSalona.filter(s=>s.id==salonid);
                                    saloni.forEach(s1=>{
                                            //s1.ZakaziTermine(vreme);
                                            //this.RefreshTermin();
                                            s1.CrtajSveTermine(redTermina);
                                            //this.RefreshTermin();
                                            //this.Kliknuto(vreme,brojtermina);
                                            //location.reload();
                                    })
                                }
                            })
                        })
                    })
                })
            })
        }


    }
    IzbrisiTermin(vreme,brojtermina)
    {
        let ulazi=this.kon2.querySelectorAll("input");
        vreme=ulazi[4].value;
        console.log(vreme);
        brojtermina=ulazi[5].value;
        console.log(brojtermina);
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonid = optionEl.options[optionEl.selectedIndex].value;
        console.log(vreme);

        fetch("https://localhost:5001/Termin/IzbrisiTermin/"+salonid+"/"+brojtermina+"/"+vreme,
        {
            method:"DELETE"
        }).then(resp=>{
            if(resp.ok)
            {
                this.RefreshTermin();
                let redTermina=this.kon4.querySelector(".redTermina1");
                let saloni=this.listaSalona.filter(s=>s.id==salonid);
                saloni.forEach(s1=>{
                        //s1.OtkaziTermin(vreme);
                        s1.CrtajSveTermine(redTermina);
                    })
            }
        })
        /*let dugmeIzaberiteDrugiSalon=document.createElement("button");
        dugmeIzaberiteDrugiSalon.innerHTML="Izaberite drugi salon";
        dugmeIzaberiteDrugiSalon.className="dugmeDrugiSalon";
        this.kon4.appendChild(dugmeIzaberiteDrugiSalon);
        dugmeIzaberiteDrugiSalon.onclick=(ev)=>this.IzaberiteDrugiSalon();*/
    }
    ZameniteTermin(idTermina)
    {
        
        let ulazi=this.kon3.querySelectorAll("input");
        let ime=ulazi[0].value;
        console.log(ime);
        let prezime=ulazi[1].value;
        console.log(prezime);
        let email=ulazi[2].value;
        console.log(email);
        let brojtelefona=ulazi[3].value;
        console.log(brojtelefona);
        var status=true;
        if(ime.length === 0 || /\d/.test(ime) || ime.length>255){
            alert("Ime nije validno!");
            status = false;
        }
        if(prezime.length === 0 || /\d/.test(prezime) || prezime.length>255){
            alert("Prezime nije validno!");
            status = false;
        }
        if(email.length === 0 || !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(email)){
            alert("Email nije validan!");
            status = false;
        }
        if(brojtelefona===0 /*||/\d/.test(brojtelefona)*/ )
        {
            alert("Broj telefona nije validan!");
            status = false;
        }
        let redSalona = this.kon1.querySelector(".salon");
        let optionEl = redSalona.querySelector("select");
        var salonid = optionEl.options[optionEl.selectedIndex].value;
        console.log(salonid);
        
        //let redKozmeticara = this.kon2.querySelector(".kozmeticar");
        let optionEl1 = this.kon3.querySelector(".selectKozmeticar");
        //console.log(optionEl1);
        var KozmeticarID = optionEl1.options[optionEl1.selectedIndex].value;
        console.log(KozmeticarID);
        var KlijentID;
        var idTermina;
        let vreme=ulazi[4].value;
        console.log(vreme);
        let brojtermina=ulazi[5].value;
        console.log(brojtermina);
        let vreme1=ulazi[6].value;
        console.log(vreme1);
        //let trajanje;
        //console.log(stanje);
        var slobodan=new Boolean(false);
        if(status===true)
        {
            fetch("https://localhost:5001/Klijent/DodatiKlijenta/"+ime+"/"+prezime+"/"+brojtelefona+"/"+email,
            {
                method:"POST"
            }).then(kl=>{
                kl.json().then(k=>{
                    KlijentID=k;
                    console.log(KlijentID);

                    fetch("https://localhost:5001/Termin/DodajTermin/"+vreme+"/"+brojtermina+"/"+slobodan+"/"+KlijentID+"/"+KozmeticarID+"/"+salonid,
                    {
                        method:"POST"
                        
                        
                    }).then(tr=>{
                        tr.json().then(t=>{
                            idTermina=t.idTermina;
                            console.log(idTermina);
                            fetch("https://localhost:5001/Termin/IzmeniTermin/"+idTermina+"/"+vreme1,
                            {
                                method:"PUT"
                            }).then(p=>{
                                if(p.ok){
                                    this.RefreshTermin();
                                    let redTermina=this.kon4.querySelector(".redTermina1");
                                    let saloni=this.listaSalona.filter(s=>s.id==salonid);
                                    saloni.forEach(s1=>{
                                            s1.IzmeniTermin(vreme);
                                            s1.CrtajSveTermine(redTermina);
                                            
                                            //location.reload();
                                    })
                                }
                            })
                            
                        })
                        
                })
                
                
                   
                
                    })
                })
            }
              
       
    }
    IzaberiteDrugiSalon()
    {
        location.reload();
    }
    /*CrtajTermine(host)
    {
        
        let saloni=this.kon1.querySelector(".salon");
        let op1=saloni.querySelector("select");
        var salonid=op1.options[op1.selectedIndex].value;
        let slobodnitermini=[];
        fetch("https://localhost:5001/Termin/PreuzmiSveTermine/"+salonid,
        {
            method:"GET"
        }).then(p=>{
            p.json().then(d1=>
                {
                    d1.forEach(d2=>
                        {
                            slobodnitermini.push(d2.vreme);
                        }

                    )
                })
                let maxbrojtermina = this.listaSalona.find(s=> s.id == salonid);
                /*maxbrojtermina.forEach(brojterMax=>{
                    //let trMax;
                    /*if(brojterMax.id==salonid){
                        let trMax=brojterMax.maxbrojtermina;
                        
                    }
                    let trMax=brojterMax.
                   
                })
                this.kont=document.createElement("div");
                this.kont.className="Termini";
                host.appendChild(this.kont);
                let ter=document.createElement("div");
                ter.className="ter";
                ter.innerHTML="Termin";
                this.kont.appendChild(ter);

                let brel=1;
                for(let i=0;i<maxbrojtermina;i++)
                {
                    ter=document.createElement("div");
                    ter.className="redTermina";
                    this.kont.appendChild(ter);

                    let label1=docuemnt.createElement("label");
                    label1.className="brojsalona";
                    label1.innerHTML=brel;
                    ter.appendChild(label1);

                    let but=document.createElement("button");
                    but.className="dugmeTermin";
                    but.innerHTML=brel;
                    but.onclick=(ev)=>this.Kliknijednom(but);
                    but.ondblclick=(ev)=>this.KlikniDVaput(but);
                    if(slobodnitermini.length!=0)
                    {
                        for(let i=0;i<slobodnitermini.length;i++)
                        {
                            if(but.innerHTML==slobodnitermini.lenght)
                            {
                                but.onclick=(ev)=>this.ZauzetTermin(but);
                                //but.style.backgroundColor=""
                            }
                        }
                    }
                    ter.appendChild(but);
                    brel++;

                }
            })
            let dugmici=[];
            let labele=[];
            for(let i=0; i<3; i++){
                dugmici[i] = document.createElement("button");
                dugmici[i].className = "dugmeTermin";
                dugmici[i].disabled = true;
                labele[i] = document.createElement("label");
                labele[i].className = "labelaZaDugmeTermin";
                ter.appendChild(dugmici[i]);
                ter.appendChild(labele[i]);
            }
            console.log(slobodnitermini);
    }*/
    /*crtajSveTermine(host){
        const termini= document.createElement("div");
        termini.className="crtaniTermini";
        this.kontejner.querySelector(".redTermina1").appendChild(termini);
        let saloni=this.kon1.querySelector(".salon");
        let op1=saloni.querySelector("select");
        var salonid=op1.options[op1.selectedIndex].value;
        //let slobodnitermini=[];
        fetch("https://localhost:5001/Termin/PreuzmiSveTermine"+salonid,
        {
            method:"GET"
        }).then(p=>{
            p.json().then(d1=>
                {
                    d1.forEach(d2=>
                        {
                            this.listaTermina.push(d1);
                            const tr=new Termin(d2.id,d2.vreme,d2.brojtermina,d2.stanje,salonid);
                            tr.crtajTermin(termini);
                        }
                        

                    )
                })
            });

            fetch("https://localhost:5001/Poslasticara/PreuzmiStolove1").then(p=>{
             p.json().then(data=>{
            var niz = [];
            var brel =0;
            data.forEach(sto=>{
            //alert(poslasticara.naziv);
            const sto1=new Sto(sto.brojStola,sto.stanje,sto.maxKapacitet,sto.kapacitetStola,sto.ime,sto.prezime);
            //console.log(sto.idStola);
            console.log(sto.brojStola);
           
                    niz[brel++]=sto.brojStola;
                    this.dodajSto(sto1);
                    sto1.crtajSto1(stolovi);
                   
  
                
            });
    }*/
    /*Kliknijednom(but1)
    {
        but1.style.backgroundColor="purple";
        but1.style.color="white";

    }
    KlikniDVaput(but1)
    {
        but1.style.backgroundColor="white";
        but1.style.color="purple";

    }
    ZauzetTermim()
    {
        alert("Izabrani termin je zauzet");
    }*/
    RefreshSadrzaj(className)
    {
        let sadrzaj=this.kon1.querySelector(className);
        if(sadrzaj.querySelector("label")!=null&&sadrzaj.querySelector("select")!=null&&sadrzaj.querySelector("button")!=null)
        {
            let l=sadrzaj.querySelector("label");
            let s=sadrzaj.querySelector("select");
            let b=sadrzaj.querySelector("button");
            let par=l.parentNode;
            par.removeChild(l);
            par.removeChild(s);
            par.removeChild(b);
        }
    }
    RefreshSadrzaj1(className)
    {
        let sadrzaj=this.kon2.querySelector(className);
        if(sadrzaj.querySelector("label")!=null&&sadrzaj.querySelector("select")!=null&&sadrzaj.querySelector("button")!=null)
        {
            let l=sadrzaj.querySelector("label");
            let s=sadrzaj.querySelector("select");
            let b=sadrzaj.querySelector("button");
            let par=l.parentNode;
            par.removeChild(l);
            par.removeChild(s);
            par.removeChild(b);
        }
    }
    RefreshButton(host,sadrzajclassName,butclassName)
    {
        let sadrzaj=host.querySelector(sadrzajclassName);
        if(sadrzaj.querySelector(butclassName)!=null)
        {
            let button=sadrzaj.querySelector(butclassName);
            let par=button.parentNode;
            par.removeChild(button);
        }

    }
    RefreshInput()
    {
        let ime=this.kon2.querySelector(".Ime");
        let prezime=this.kon2.querySelector(".Prezime");
        let email=this.kon2.querySelector(".Email");
        let brojtelefona=this.kon2.querySelector(".BrojTelefona");
        if(ime.querySelector("input")!=null&&prezime.querySelector("input")!=null&&email.querySelector("input")!=null&&brojtelefona.querySelector("input")!=null){
            let inputIme=ime.querySelector("input");
            let inputPrezime=prezime.querySelector("input");
            let inputEmail=email.querySelector("input");
            let inputBrojTelefona=brojtelefona.querySelector("input");
            let labelIme=ime.querySelector("label");
            let labelPrezime=prezime.querySelector("label");
            let labelEmail=email.querySelector("label");
            let labelBrojTelefona=brojtelefona.querySelector("label");
            let parIme=inputIme.parentNode;
            let parPrezime=inputPrezime.parentNode;
            let parEmail=inputEmail.parentNode;
            let parBrojTelefona=inputBrojTelefona.parentNode;
            parIme.removeChild(inputIme);
            parPrezime.removeChild(inputPrezime);
            parEmail.removeChild(inputEmail);
            parBrojTelefona.removeChild(inputBrojTelefona);
            parIme.removeChild(labelIme);
            parPrezime.removeChild(labelPrezime);
            parEmail.removeChild(labelEmail);
            parBrojTelefona.removeChild(labelBrojTelefona);

        }
    }
    RefreshTermin()
    {
        if(this.kon4.querySelector(".redTermina1")!=null)
        {
            let t=this.kon4.querySelector(".redTermina1");
            let par=t.parentNode;
            par.removeChild(t);
        }
        let t=this.crtajSalon1(this.kon4,"redTermina1");
    }
    
}