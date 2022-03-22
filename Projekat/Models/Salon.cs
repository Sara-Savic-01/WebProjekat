using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
namespace Models
{
    [Table("Salon")]
    public class Salon
    {
        public int ID{get;set;}

        [Required]
        [MaxLength(255)] 
        public string Naziv{get;set;}
        [Required]
        [MaxLength(255)] 
         public string Adresa{get;set;}
        
        [Required]
        [MaxLength(9)]
        public int Telefon{get;set;}

        public int RadnoVremeOd{get;set;}
        public int RadnoVremeDo{get;set;}


        [Required]
        [MaxLength(20)]
        public int MaxBrojTermina{get;set;}

        public virtual List<Termin> Termini{get;set;}
        public List<Kozmeticar> Kozmeticari{get; set;}


    }
}