using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMS.Controllers;
using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class EmployeesControllerTests
{
    [Fact]
    public async Task GetEmployees_ReturnsAllEmployees()
    {
        // Arrange: InMemory adatbázis létrehozása
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase1")
            .Options;

        using (var context = new CMSContext(options))
        {
            // Tesztadatok inicializálása
            context.Employees.AddRange(
                new Employee { EmployeeId = 1, FirstName = "John", LastName = "Doe", Role = "Manager", Username = "johndoe", PasswordHash = "hashedpassword1" },
                new Employee { EmployeeId = 2, FirstName = "Jane", LastName = "Doe", Role = "Cashier", Username = "janedoe", PasswordHash = "hashedpassword2" }
            );
            context.SaveChanges();

            var controller = new EmployeesController(context);

            // Act: Metódus hívása
            var result = await controller.GetEmployees();

            // Assert: Eredmények ellenőrzése
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Employee>>>(result);
            var employees = Assert.IsType<List<Employee>>(actionResult.Value);
            Assert.Equal(2, employees.Count);
            Assert.Equal("John", employees[0].FirstName);
            Assert.Equal("Jane", employees[1].FirstName);
        }
    }

    [Fact]
    public async Task GetRoles_ReturnsDistinctRoles()
    {
        // Arrange: InMemory adatbázis létrehozása
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase2")
            .Options;

        using (var context = new CMSContext(options))
        {
            // Tesztadatok inicializálása, egyedi EmployeeId értékekkel
            context.Employees.AddRange(
                new Employee { EmployeeId = 1, FirstName = "John", LastName = "Doe", Role = "Manager", Username = "johndoe", PasswordHash = "hashedpassword1" },
                new Employee { EmployeeId = 2, FirstName = "Jane", LastName = "Doe", Role = "Manager", Username = "janedoe", PasswordHash = "hashedpassword2" },
                new Employee { EmployeeId = 3, FirstName = "Sam", LastName = "Smith", Role = "Cashier", Username = "samsmith", PasswordHash = "hashedpassword3" }
            );
            context.SaveChanges();

            var controller = new EmployeesController(context);

            // Act: Metódus hívása
            var result = await controller.GetRoles();

            // Assert: Eredmények ellenőrzése
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var roles = Assert.IsType<List<string>>(okResult.Value);
            Assert.Equal(2, roles.Count); // Distinct roles: Manager, Cashier
            Assert.Contains("Manager", roles);
            Assert.Contains("Cashier", roles);
        }
    }

}
