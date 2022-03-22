using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
namespace Models
{
    [Table("Usluga")]
    public class Usluga
    {
        [Key]
        public int IDUsluge{get;set;}

        [Required]
        public string VrstaUsluge{get;set;}

        [Required]
        public int Cena{get;set;}

        

        //public virtual Kozmeticar Kozmeticari{get; set;}

        public List<Kozmeticar> Kozmeticari{get; set;}

    }
}