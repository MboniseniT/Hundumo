using Microsoft.EntityFrameworkCore.Migrations;

namespace BinmakBackEnd.Migrations
{
    public partial class CreateAssessmentTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "characteristics",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kpa_id = table.Column<int>(nullable: false),
                    level_id = table.Column<int>(nullable: false),
                    user_id = table.Column<int>(nullable: true),
                    frmwrk_id = table.Column<int>(nullable: false),
                    version_id = table.Column<int>(nullable: false),
                    variant_id = table.Column<int>(nullable: false),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_characteristics", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "frmwrks",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_frmwrks", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kpa",
                columns: table => new
                {
                    ID = table.Column<string>(nullable: false),
                    assess_name = table.Column<string>(nullable: true),
                    assess_date = table.Column<string>(nullable: true),
                    op_name = table.Column<string>(nullable: true),
                    version_id = table.Column<int>(nullable: false),
                    variant_id = table.Column<int>(nullable: false),
                    frmwrk_id = table.Column<int>(nullable: false),
                    user_id = table.Column<int>(nullable: true),
                    kpa1 = table.Column<string>(nullable: true),
                    kpa2 = table.Column<string>(nullable: true),
                    kpa3 = table.Column<string>(nullable: true),
                    kpa4 = table.Column<string>(nullable: true),
                    kpa5 = table.Column<string>(nullable: true),
                    kpa6 = table.Column<string>(nullable: true),
                    kpa7 = table.Column<string>(nullable: true),
                    kpa8 = table.Column<string>(nullable: true),
                    kpa9 = table.Column<string>(nullable: true),
                    kpa10 = table.Column<string>(nullable: true),
                    kpa11 = table.Column<string>(nullable: true),
                    kpa12 = table.Column<string>(nullable: true),
                    kpa13 = table.Column<string>(nullable: true),
                    kpa14 = table.Column<string>(nullable: true),
                    kpa15 = table.Column<string>(nullable: true),
                    kpa16 = table.Column<string>(nullable: true),
                    kpa17 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kpa", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "levels",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    user_id = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_levels", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "results",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    characteristic_id = table.Column<int>(nullable: false),
                    assess_id = table.Column<string>(nullable: true),
                    user_id = table.Column<int>(nullable: true),
                    kpa_id = table.Column<int>(nullable: true),
                    level_id = table.Column<int>(nullable: true),
                    value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_results", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "variants",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_variants", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "versions",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_versions", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "characteristics");

            migrationBuilder.DropTable(
                name: "frmwrks");

            migrationBuilder.DropTable(
                name: "Kpa");

            migrationBuilder.DropTable(
                name: "levels");

            migrationBuilder.DropTable(
                name: "results");

            migrationBuilder.DropTable(
                name: "variants");

            migrationBuilder.DropTable(
                name: "versions");
        }
    }
}
