using Microsoft.EntityFrameworkCore;
namespace Models
{
    public class SalonContext:DbContext
    {
        public DbSet<Salon> Saloni{get;set;}
        public DbSet<Kozmeticar> Kozmeticari{get;set;}
        public DbSet<Klijent> Klijenti{get;set;}
        public DbSet<Termin> TerminiKlijenata{get;set;}
        //public DbSet<Spoj> KlijentiKozmeticari { get; set; }
        public DbSet<Usluga> Usluge{get;set;}
        public SalonContext(DbContextOptions options) : base(options)
        {

        }

    }
}