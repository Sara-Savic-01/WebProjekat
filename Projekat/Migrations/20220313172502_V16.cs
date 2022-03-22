using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class V16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Klijent",
                columns: table => new
                {
                    IDKlijenta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    BrojTelefona = table.Column<int>(type: "int", maxLength: 9, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klijent", x => x.IDKlijenta);
                });

            migrationBuilder.CreateTable(
                name: "Salon",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Telefon = table.Column<int>(type: "int", maxLength: 9, nullable: false),
                    RadnoVremeOd = table.Column<int>(type: "int", nullable: false),
                    RadnoVremeDo = table.Column<int>(type: "int", nullable: false),
                    MaxBrojTermina = table.Column<int>(type: "int", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salon", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Usluga",
                columns: table => new
                {
                    IDUsluge = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VrstaUsluge = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usluga", x => x.IDUsluge);
                });

            migrationBuilder.CreateTable(
                name: "Kozmeticar",
                columns: table => new
                {
                    IDKozmeticara = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Struka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UslugeIDUsluge = table.Column<int>(type: "int", nullable: true),
                    SaloniID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kozmeticar", x => x.IDKozmeticara);
                    table.ForeignKey(
                        name: "FK_Kozmeticar_Salon_SaloniID",
                        column: x => x.SaloniID,
                        principalTable: "Salon",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Kozmeticar_Usluga_UslugeIDUsluge",
                        column: x => x.UslugeIDUsluge,
                        principalTable: "Usluga",
                        principalColumn: "IDUsluge",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TerminiKlijenata",
                columns: table => new
                {
                    IDTermina = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vreme = table.Column<int>(type: "int", nullable: false),
                    BrojTermina = table.Column<int>(type: "int", nullable: false),
                    Slobodan = table.Column<bool>(type: "bit", nullable: false),
                    KlijentIDKlijenta = table.Column<int>(type: "int", nullable: true),
                    KozmeticarIDKozmeticara = table.Column<int>(type: "int", nullable: true),
                    SaloniID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminiKlijenata", x => x.IDTermina);
                    table.ForeignKey(
                        name: "FK_TerminiKlijenata_Klijent_KlijentIDKlijenta",
                        column: x => x.KlijentIDKlijenta,
                        principalTable: "Klijent",
                        principalColumn: "IDKlijenta",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TerminiKlijenata_Kozmeticar_KozmeticarIDKozmeticara",
                        column: x => x.KozmeticarIDKozmeticara,
                        principalTable: "Kozmeticar",
                        principalColumn: "IDKozmeticara",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TerminiKlijenata_Salon_SaloniID",
                        column: x => x.SaloniID,
                        principalTable: "Salon",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kozmeticar_SaloniID",
                table: "Kozmeticar",
                column: "SaloniID");

            migrationBuilder.CreateIndex(
                name: "IX_Kozmeticar_UslugeIDUsluge",
                table: "Kozmeticar",
                column: "UslugeIDUsluge");

            migrationBuilder.CreateIndex(
                name: "IX_TerminiKlijenata_KlijentIDKlijenta",
                table: "TerminiKlijenata",
                column: "KlijentIDKlijenta");

            migrationBuilder.CreateIndex(
                name: "IX_TerminiKlijenata_KozmeticarIDKozmeticara",
                table: "TerminiKlijenata",
                column: "KozmeticarIDKozmeticara");

            migrationBuilder.CreateIndex(
                name: "IX_TerminiKlijenata_SaloniID",
                table: "TerminiKlijenata",
                column: "SaloniID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TerminiKlijenata");

            migrationBuilder.DropTable(
                name: "Klijent");

            migrationBuilder.DropTable(
                name: "Kozmeticar");

            migrationBuilder.DropTable(
                name: "Salon");

            migrationBuilder.DropTable(
                name: "Usluga");
        }
    }
}
