using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
namespace Models
{
   [Table("Klijent")]
   public class Klijent
   {
       [Key]
       public int IDKlijenta{get;set;}

       [Required]

       [MaxLength(255)] 
       public string Ime{get;set;}
       
       [Required]

       [MaxLength(255)] 
       public string Prezime{get;set;}

       [Required]
       [MaxLength(9)]
       public int BrojTelefona{get;set;}

       [Required]
       [MaxLength(50)]
       public string Email{get;set;}
       public virtual List<Termin> KlijentKozmeticar{get;set;}
   }

}