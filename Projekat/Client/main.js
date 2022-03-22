import {Salon} from "./Salon.js";
import { SaloniPrikaz } from "./SaloniPrikaz.js";
import {Kozmeticar} from "./Kozmeticar.js";
import {Usluga} from "./Usluga.js";






var listaSalona=[];
var listaKozmeticara=[];
var listaUsluga=[];




fetch("https://localhost:5001/Salon/PreuzmiSalone").
then(s=>{
    s.json().then(saloni=>{
        saloni.forEach(salon => {
            console.log(salon);
            var s=new Salon(salon.id,salon.naziv,salon.adresa,salon.telefon,salon.radnoVremeOd,salon.radnoVremeDo,salon.maxbrojtermina);
            listaSalona.push(s);
            s.termini.forEach((s1,index)=>{
                s.termini[index]=s1.vreme;
            })
            
            
        });
        fetch("https://localhost:5001/Usluga/PreuzmiUsluge").
        then(u=>{
            u.json().then(usluge=>{
                usluge.forEach(usluga => {
                    console.log(usluga);
                    var u=new Usluga(usluga.idUsluge,usluga.vrstaUsluge,usluga.cena);
                    listaUsluga.push(u);
            
                });
            }
            )
            
            
            
            
            fetch("https://localhost:5001/Kozmeticar/PreuzmiKozmeticare").
            then(k=>{
                k.json().then(kozmeticari=>{
                    kozmeticari.forEach(kozmeticar=>{
                        console.log(kozmeticar);
                        var t=new Kozmeticar(kozmeticar.idKozmeticara,kozmeticar.ime,kozmeticar.prezime,kozmeticar.struka,kozmeticar.uslugaID,kozmeticar.salonID);
                        listaKozmeticara.push(t);
                    })
                    listaKozmeticara.forEach(k=>{
                        listaUsluga.forEach(u=>{
                            u.DodajKozmeticara(k);
                        })
                    })
                    listaKozmeticara.forEach(k=>{
                        listaSalona.forEach(u=>{
                            u.DodajKozmeticara(k);
                        })
                    })
                });
            }

            )
            

            let s=new SaloniPrikaz(listaSalona,listaUsluga,listaKozmeticara);
            s.crtajSalon(document.body);
            

        })
    })
       

    }

    )

console.log(listaSalona);
console.log(listaUsluga);
console.log(listaKozmeticara);


