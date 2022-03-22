import {Kozmeticar} from "./Kozmeticar.js";
export class Usluga{
    constructor(idUsluge,vrstaUsluge,cena)
    {
        this.idUsluge=idUsluge;
        this.vrstaUsluge=vrstaUsluge;
        this.cena=cena;
        this.Kozmeticari=[];
    }
    
    DodajKozmeticara(kozmeticar)
    {
        if(this.IDUsluge==kozmeticar.uslugaid)
        {
            this.Kozmeticari.push(kozmeticar);
        }
    }
    
    
}

