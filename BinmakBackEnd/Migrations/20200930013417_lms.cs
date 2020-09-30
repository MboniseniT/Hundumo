using Microsoft.EntityFrameworkCore.Migrations;

namespace BinmakBackEnd.Migrations
{
    public partial class lms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LearningManagementSystemLinks",
                columns: table => new
                {
                    LearningManagementSystemLinkId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientName = table.Column<string>(nullable: true),
                    Link = table.Column<string>(nullable: true),
                    KeyName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningManagementSystemLinks", x => x.LearningManagementSystemLinkId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LearningManagementSystemLinks");
        }
    }
}
