using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dal.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    Street = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    Zip = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    BuildingNumber = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    ApartmentNumber = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    EntryBuilding = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Address__3214EC072C6B5F19", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__3214EC07F6E949F0", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    FirstName = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    LastName = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    AddressId = table.Column<long>(type: "bigint", nullable: false),
                    Email = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    Password = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Client__3214EC07B2FDA95B", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hechsher",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Hechsher__3214EC0782C5FDC2", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Status__3214EC070E58C0BE", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orderes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    AddressId = table.Column<long>(type: "bigint", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    IsTreated = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Orderes__3214EC07C16ED9F1", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Orderes__Address__160F4887",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    PricePerKilo = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Hechsher = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true, collation: "SQL_Latin1_General_CP1_CI_AS"),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Products__3214EC07F702D097", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Products__Catego__68487DD7",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    OrderItemId = table.Column<long>(type: "bigint", nullable: false),
                    OrderId = table.Column<long>(type: "bigint", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    PriceOfItem = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderIte__57ED06819BD31855", x => x.OrderItemId);
                    table.ForeignKey(
                        name: "FK__OrderItem__Produ__6477ECF3",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orderes_AddressId",
                table: "Orderes",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ProductId",
                table: "OrderItem",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Hechsher");

            migrationBuilder.DropTable(
                name: "Orderes");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
