using Microsoft.EntityFrameworkCore.Migrations;

namespace BinmakBackEnd.Migrations
{
    public partial class formular1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormulaCreations_MathematicalOperators_MathematicalOperatorId",
                table: "FormulaCreations");

            migrationBuilder.DropIndex(
                name: "IX_FormulaCreations_MathematicalOperatorId",
                table: "FormulaCreations");

            migrationBuilder.DropColumn(
                name: "FormularOwnerKPAId",
                table: "FormulaCreations");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "FormulaCreations");

            migrationBuilder.DropColumn(
                name: "MathematicalOperatorId",
                table: "FormulaCreations");

            migrationBuilder.AddColumn<string>(
                name: "FormulaString",
                table: "FormulaCreations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MasterFormularArray",
                table: "FormulaCreations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FormulaString",
                table: "FormulaCreations");

            migrationBuilder.DropColumn(
                name: "MasterFormularArray",
                table: "FormulaCreations");

            migrationBuilder.AddColumn<int>(
                name: "FormularOwnerKPAId",
                table: "FormulaCreations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "FormulaCreations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MathematicalOperatorId",
                table: "FormulaCreations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FormulaCreations_MathematicalOperatorId",
                table: "FormulaCreations",
                column: "MathematicalOperatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormulaCreations_MathematicalOperators_MathematicalOperatorId",
                table: "FormulaCreations",
                column: "MathematicalOperatorId",
                principalTable: "MathematicalOperators",
                principalColumn: "MathematicalOperatorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
