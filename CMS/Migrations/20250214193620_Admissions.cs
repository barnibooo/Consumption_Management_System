using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Migrations
{
    /// <inheritdoc />
    public partial class Admissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdmissionId",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Admissions",
                columns: table => new
                {
                    AdmissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdmissionName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admissions", x => x.AdmissionId);
                });

            migrationBuilder.CreateTable(
                name: "CustomerAdmissions",
                columns: table => new
                {
                    CustomerAdmissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    AdmissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerAdmissions", x => x.CustomerAdmissionId);
                    table.ForeignKey(
                        name: "FK_CustomerAdmissions_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "AdmissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerAdmissions_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_AdmissionId",
                table: "Customers",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerAdmissions_AdmissionId",
                table: "CustomerAdmissions",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerAdmissions_CustomerId",
                table: "CustomerAdmissions",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Admissions_AdmissionId",
                table: "Customers",
                column: "AdmissionId",
                principalTable: "Admissions",
                principalColumn: "AdmissionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Admissions_AdmissionId",
                table: "Customers");

            migrationBuilder.DropTable(
                name: "CustomerAdmissions");

            migrationBuilder.DropTable(
                name: "Admissions");

            migrationBuilder.DropIndex(
                name: "IX_Customers_AdmissionId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "AdmissionId",
                table: "Customers");
        }
    }
}
