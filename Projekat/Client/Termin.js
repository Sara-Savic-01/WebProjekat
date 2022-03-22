export class Termin{
    constructor(idTermina,vreme,brojtermina,slobodan,klijentID,kozmeticarID,salonID)
    {
        this.idTermina=idTermina;
        this.vreme=vreme;
        this.brojtermina=brojtermina;
        this.slobodan=slobodan;
        this.klijentID=klijentID;
        this.kozmeticarID=kozmeticarID;
        //this.salonID=salonID;
        //this.maxbrojtermina=maxbrojtermina;
        //this.brojtermina=brojtermina;
        this.salonID=salonID;
        //this.stanje=stanje;
        this.kont=null;
    }
    vratiStanje(){
        if(this.slobodan===true)
            return "rgb(243, 192, 241)";
        else
            return "rgb(243,115,226)";

    }
    crtajTermin(host){
        this.kont=document.createElement("div");
        this.kont.className="terminKontejner";
        this.kont.innerHTML+="Vreme termina: "+ this.vreme;
        this.kont.style.backgroundColor=this.vratiStanje();
        host.appendChild(this.kont);
    }
    crtajTermin1(host){
        this.kont=document.createElement("div");
        this.kont.className="terminKontejner";
        this.kont.innerHTMLL+="Vreme termina:"+this.vreme+"je zauzet ";
        this.kont.style.backgroundColor=this.vratiStanje();
        
        host.appendChild(this.kont);
    }
    ZakaziTermin(vreme)
    {
        if(this.slobodan===false)
            alert("Ovaj termin nije slobodan!");
        else{
            
                //this.brojtermina=brojtermina;
                this.vreme=vreme;
                this.slobodan=false;
                this.kont.innerHTML+="Termin:" + this.vreme +"\n je" + "\t zauzet";
                this.kont.style.backgroundColor=this.vratiStanje(); 
            //}
        }
    }
    OtkaziTermin(vreme)
    {
        this.slobodan=true;
        this.kont.innerHTML+="Termin:"+vreme + "\n" +"\n slobodan";
        this.kont.style.backgroundColor=this.vratiStanje();
    }
    IzmeniTermina(vreme)
    {
        this.vreme=vreme;
        this.kont.innerHTML= "Termin :" +  this.vreme +"\n je" + "\t zauzet";
    }
    
    
}