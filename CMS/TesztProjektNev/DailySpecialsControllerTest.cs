using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMS.Controllers;
using CMS.Models;
using CMS.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class DailySpecialsControllerTests
{
    private CMSContext CreateTestContext()
    {
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var context = new CMSContext(options);

        // Feltöltjük a tesztadatokat
        var items = new List<MenuItem>
        {
            new() { ItemId = 1, Name = "Halászlé", Category = "Leves", Price = 2800, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/halaszle.jpg" },
            new() { ItemId = 2, Name = "Rántott hagymakarikák", Category = "Előétel", Price = 1800, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/hagymakarika.jpg" },
            new() { ItemId = 3, Name = "Lángos tejföllel és sajttal", Category = "Főétel", Price = 2000, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/langostes.jpg" },
            new() { ItemId = 4, Name = "Strand Burger", Category = "Hamburger", Price = 2900, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/strandb.jpg" },
            new() { ItemId = 5, Name = "Hawaii Pizza", Category = "Pizza", Price = 3100, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/hawaiip.jpg" },
            new() { ItemId = 6, Name = "Nutellás Palacsinta", Category = "Desszert", Price = 1500, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/nutellasp.jpg" },
            new() { ItemId = 7, Name = "Házi Limonádé", Category = "Ital", Price = 1200, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/limonade.jpg" },
            new() { ItemId = 8, Name = "Jegeskávé", Category = "Kávé", Price = 1300, Description = "desc", IsAvailable = true, ImagePath = "/img/orders/jegesk.jpg" },
        };

        context.MenuItems.AddRange(items);
        context.SaveChanges();

        return context;
    }

    [Fact]
    public async Task PostDailySpecial_CreatesNewSpecial_WhenAllItemsExist()
    {
        using var context = CreateTestContext();
        var controller = new DailySpecialsController(context);

        var dto = new DailySpecialPostDto
        {
            SoupName = "Halászlé",
            AppetizerName = "Rántott hagymakarikák",
            MainCourseName = "Lángos tejföllel és sajttal",
            HamburgerName = "Strand Burger",
            PizzaName = "Hawaii Pizza",
            DessertName = "Nutellás Palacsinta",
            DrinkName = "Házi Limonádé",
            CoffeeName = "Jegeskávé"
        };

        var actionResult = await controller.PostDailySpecial(dto);
        var result = actionResult.Result;

        var createdAtResult = Assert.IsType<CreatedAtActionResult>(result);
        var special = Assert.IsType<DailySpecial>(createdAtResult.Value);

        Assert.Equal(1, special.SoupId);
        Assert.Equal(2, special.AppetizerId);
    }

    [Fact]
    public async Task PostDailySpecial_ReturnsBadRequest_WhenItemMissing()
    {
        using var context = CreateTestContext();
        var controller = new DailySpecialsController(context);

        var dto = new DailySpecialPostDto
        {
            SoupName = "Halászlé",
            AppetizerName = "Rántott hagymakarikák",
            MainCourseName = "Lángos tejföllel és sajttal",
            HamburgerName = "Strand Burger",
            PizzaName = "Hawaii Pizza",
            DessertName = "Nutellás Palacsinta",
            DrinkName = "Házi Limonádé",
            CoffeeName = "Nem létezik"
        };

        var actionResult = await controller.PostDailySpecial(dto);
        var result = actionResult.Result;

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("One or more menu items not found.", badRequest.Value);
    }

    [Fact]
    public async Task GetDailySpecials_ReturnsCorrectNames()
    {
        using var context = CreateTestContext();

        context.DailySpecials.Add(new DailySpecial
        {
            SoupId = 1,
            AppetizerId = 2,
            MainCourseId = 3,
            HamburgerId = 4,
            PizzaId = 5,
            DessertId = 6,
            DrinkId = 7,
            CoffeeId = 8
        });
        await context.SaveChangesAsync();

        var controller = new DailySpecialsController(context);
        var result = await controller.GetDailySpecials();

        var actionResult = Assert.IsType<ActionResult<IEnumerable<DailySpecialGetDto>>>(result);
        var specials = Assert.IsAssignableFrom<IEnumerable<DailySpecialGetDto>>(actionResult.Value);

        var special = specials.First();
        Assert.Equal("Halászlé", special.SoupName);
        Assert.Equal("Strand Burger", special.HamburgerName);
    }

    [Fact]
    public async Task DeleteDailySpecials_RemovesAll()
    {
        using var context = CreateTestContext();

        context.DailySpecials.Add(new DailySpecial
        {
            SoupId = 1,
            AppetizerId = 2,
            MainCourseId = 3,
            HamburgerId = 4,
            PizzaId = 5,
            DessertId = 6,
            DrinkId = 7,
            CoffeeId = 8
        });
        await context.SaveChangesAsync();

        var controller = new DailySpecialsController(context);
        var result = await controller.DeleteDailySpecials();

        Assert.IsType<NoContentResult>(result);
        Assert.Empty(context.DailySpecials);
    }
}
