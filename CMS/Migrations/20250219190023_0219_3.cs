using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Migrations
{
    /// <inheritdoc />
    public partial class _0219_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Admissions_AdmissionId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_AdmissionId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "AdmissionId",
                table: "Customers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdmissionId",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_AdmissionId",
                table: "Customers",
                column: "AdmissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Admissions_AdmissionId",
                table: "Customers",
                column: "AdmissionId",
                principalTable: "Admissions",
                principalColumn: "AdmissionId");
        }
    }
}
