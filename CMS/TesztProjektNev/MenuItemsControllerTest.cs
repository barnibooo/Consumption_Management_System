using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMS.Controllers;
using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class MenuItemsControllerTests
{
    [Fact]
    public async Task GetMenuItems_ReturnsAllMenuItems()
    {
        // Arrange: InMemory adatbázis létrehozása
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase1")
            .Options;

        using (var context = new CMSContext(options))
        {
            // Tesztadatok inicializálása
            context.MenuItems.AddRange(
                new MenuItem
                {
                    ItemId = 1,
                    Name = "Margherita Pizza",
                    Category = "Pizza",
                    Price = 15,
                    Description = "Classic Italian Pizza",
                    IsAvailable = true,
                    ImagePath = "/images/margherita.jpg"
                },
                new MenuItem
                {
                    ItemId = 2,
                    Name = "Cheeseburger",
                    Category = "Burger",
                    Price = 10,
                    Description = "Delicious Cheeseburger",
                    IsAvailable = true,
                    ImagePath = "/images/cheeseburger.jpg"
                }
            );
            context.SaveChanges();

            var controller = new MenuItemsController(context);

            // Act: Metódus hívása
            var result = await controller.GetMenuItems();

            // Assert: Eredmények ellenőrzése
            var actionResult = Assert.IsType<ActionResult<IEnumerable<MenuItem>>>(result);
            var menuItems = Assert.IsType<List<MenuItem>>(actionResult.Value);

            Assert.Equal(2, menuItems.Count);
            Assert.Equal("Margherita Pizza", menuItems[0].Name);
            Assert.Equal("Cheeseburger", menuItems[1].Name);
        }
    }
}
