using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.Json.Serialization;
namespace Models
{
    public class Termin
    {
        [Key]
        public int IDTermina { get; set; }

        [Required]
        public int Vreme { get; set; }

        

        [Required]
        public int BrojTermina{get;set;}

        [Required]
        public bool Slobodan{ get; set;}


        
        public virtual Klijent Klijent { get; set; }

        public virtual Kozmeticar Kozmeticar { get; set; }

        public Salon Saloni{get;set;}
    }
}