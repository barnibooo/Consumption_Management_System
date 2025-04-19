using CMS.Controllers;
using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class CheckoutControllerSplitTests
{
    private async Task<OkObjectResult> ExecuteTestController()
    {
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()) // külön adatbázis minden teszthez
            .Options;

        using (var context = new CMSContext(options))
        {
            var customer = new Customer
            {
                CustomerId = 1,
                Name = "Test Customer",
                CardId = "CARD123",
                IsActive = true
            };
            context.Customers.Add(customer);

            var menuItem = new MenuItem
            {
                ItemId = 1,
                Name = "Burger",
                Description = "Beef burger",
                Category = "Food",
                Price = 12,
                IsAvailable = true,
                ImagePath = "/img/burger.jpg"
            };
            context.MenuItems.Add(menuItem);

            var order = new Order
            {
                OrderId = 1,
                CustomerId = customer.CustomerId,
                CreatedAt = DateTime.Now
            };
            context.Orders.Add(order);

            var menuItemOrder = new MenuItemOrder
            {
                MenuItemOrderId = 1,
                OrderId = order.OrderId,
                ItemId = menuItem.ItemId,
                Quantity = 3
            };
            context.MenuItemOrders.Add(menuItemOrder);

            context.SaveChanges();

            var controller = new CheckoutController(context);
            var result = await controller.GetCustomerConsumption("CARD123");

            return Assert.IsType<OkObjectResult>(result);
        }
    }

    [Fact]
    public async Task TotalAmount_Is_Correct()
    {
        var okResult = await ExecuteTestController();
        dynamic value = okResult.Value;

        Assert.Equal(36, (int)value.TotalAmount); // 3 x 12
    }

    [Fact]
    public async Task Consumption_Has_Single_Item()
    {
        var okResult = await ExecuteTestController();
        dynamic value = okResult.Value;

        Assert.Single(value.Consumption);
    }

    [Fact]
    public async Task ProductName_Is_Correct()
    {
        var okResult = await ExecuteTestController();
        dynamic value = okResult.Value;

        Assert.Equal("Burger", (string)value.Consumption[0].ProductName);
    }

    [Fact]
    public async Task Description_Is_Correct()
    {
        var okResult = await ExecuteTestController();
        dynamic value = okResult.Value;

        Assert.Equal("Beef burger", (string)value.Consumption[0].Description);
    }

    [Fact]
    public async Task Quantity_Is_Correct()
    {
        var okResult = await ExecuteTestController();
        dynamic value = okResult.Value;

        Assert.Equal(3, (int)value.Consumption[0].Quantity);
    }
}
