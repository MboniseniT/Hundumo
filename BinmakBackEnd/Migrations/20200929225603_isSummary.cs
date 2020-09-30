using Microsoft.EntityFrameworkCore.Migrations;

namespace BinmakBackEnd.Migrations
{
    public partial class isSummary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSummary",
                table: "KeyProcessAreas",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSummary",
                table: "KeyProcessAreas");
        }
    }
}
