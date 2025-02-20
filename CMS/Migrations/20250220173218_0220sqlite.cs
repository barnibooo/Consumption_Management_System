using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Migrations
{
    /// <inheritdoc />
    public partial class _0220sqlite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActives",
                table: "Customers",
                newName: "IsActive");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "MenuItemOrders",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "MenuItemOrders");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Customers",
                newName: "IsActives");
        }
    }
}
