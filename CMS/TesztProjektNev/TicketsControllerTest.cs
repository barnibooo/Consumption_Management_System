using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMS.Controllers;
using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class TicketsControllerTests
{
    [Fact]
    public async Task GetTickets_ReturnsAllTickets()
    {
        // Arrange: InMemory adatbázis létrehozása
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase("TestDatabase1")
            .Options;

        using (var context = new CMSContext(options))
        {
            // Tesztadatok inicializálása
            context.Tickets.AddRange(
                new Ticket
                {
                    TicketId = 1,
                    TicketName = "VIP Ticket",
                    Category = "VIP",
                    Price = 200,
                    Description = "Access to all VIP areas",
                    ImagePath = "/images/vip-ticket.jpg"
                },
                new Ticket
                {
                    TicketId = 2,
                    TicketName = "Regular Ticket",
                    Category = "Standard",
                    Price = 100,
                    Description = "General admission ticket",
                    ImagePath = "/images/regular-ticket.jpg"
                }
            );
            context.SaveChanges();

            var controller = new TicketsController(context);

            // Act: Metódus hívása
            var result = await controller.GetTickets();

            // Assert: Eredmények ellenőrzése
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Ticket>>>(result);
            var tickets = Assert.IsType<List<Ticket>>(actionResult.Value);

            Assert.Equal(2, tickets.Count);
            Assert.Equal("VIP Ticket", tickets[0].TicketName);
            Assert.Equal("Regular Ticket", tickets[1].TicketName);
        }
    }
}
