using System.Collections.Generic;
using System.Threading.Tasks;
using CMS.Controllers;
using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class CardsControllerTests
{
    [Fact]
    public async Task GetCustomerIdByCardId_ReturnsCustomerId_WhenCustomerExistsAndIsActive()
    {
        // Arrange: InMemory adatbázis
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase1")
            .Options;

        using (var context = new CMSContext(options))
        {
            var customer = new Customer
            {
                CustomerId = 1,
                CardId = "123ABC",
                Name = "John Doe",
                IsActive = true
            };
            context.Customers.Add(customer);
            context.SaveChanges();

            var controller = new CardsController(context);

            // Act: Metódus hívása
            var result = await controller.GetCustomerIdByCardId("123ABC");

            // Assert: Ellenőrzés
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            dynamic value = okResult.Value;
            Assert.Equal(1, value.CustomerId);
        }
    }

    [Fact]
    public async Task GetCustomerIdByCardId_ReturnsNotFoundMessage_WhenCustomerDoesNotExist()
    {
        // Arrange: InMemory adatbázis
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase2")
            .Options;

        using (var context = new CMSContext(options))
        {
            var controller = new CardsController(context);

            // Act: Metódus hívása nem létező kártya ID-val
            var result = await controller.GetCustomerIdByCardId("NonExistingCardId");

            // Assert: Ellenőrzés
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            dynamic value = notFoundResult.Value;
            Assert.Equal("Customer not found.", (string)value.Message);
        }
    }

    [Fact]
    public async Task GetCustomerIdByCardId_ReturnsInactiveMessage_WhenCustomerIsNotActive()
    {   
        // Arrange: InMemory adatbázis
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase3")
            .Options;

        using (var context = new CMSContext(options))
        {
            var customer = new Customer
            {
                CustomerId = 2,
                CardId = "456DEF",
                Name = "Jane Doe",
                IsActive = false
            };
            context.Customers.Add(customer);
            context.SaveChanges();

            var controller = new CardsController(context);

            // Act: Metódus hívása
            var result = await controller.GetCustomerIdByCardId("456DEF");

            // Assert: Ellenőrzés
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            dynamic value = okResult.Value;
            Assert.Equal("Customer is not active.", (string)value.Message);
        }
    }
}
