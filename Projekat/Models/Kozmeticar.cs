using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
namespace Models
{
     [Table("Kozmeticar")]
    public class Kozmeticar
    {
        [Key]
         public int IDKozmeticara{get;set;}

        [Required]
        [MaxLength(255)] 
        public string Ime{get;set;}

        [Required]
        [MaxLength(255)] 
        public string Prezime{get;set;}
    

        [Required]
        public string Struka{get;set;}

        public virtual List<Termin> KozmeticarKlijent{get;set;}

        //public virtual List<Usluga> Usluge{get;set;}
        public virtual  Usluga Usluge{get;set;}

        public virtual  Salon Saloni{get;set;}


    }
}