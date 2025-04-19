using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMS.Controllers;
using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class AdmissionsControllerTests
{
    [Fact]
    public async Task GetAdmissions_ReturnsListOfAdmissions()
    {
        // Arrange: InMemory adatbázis létrehozása
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        // Teszt adatok inicializálása
        using (var context = new CMSContext(options))
        {
            context.Admissions.AddRange(
                new Admission
                {
                    AdmissionId = 1,
                    AdmissionName = "VIP Entry",
                    Category = "VIP",
                    Price = 200,
                    Description = "Access to all areas",
                    ImagePath = "/images/vip.jpg"
                },
                new Admission
                {
                    AdmissionId = 2,
                    AdmissionName = "Standard Entry",
                    Category = "Standard",
                    Price = 100,
                    Description = "Access to general areas",
                    ImagePath = "/images/standard.jpg"
                }
            );
            context.SaveChanges();

            // Controller példányosítása
            var controller = new AdmissionsController(context);

            // Act: Meghívod a GetAdmissions metódust
            var result = await controller.GetAdmissions();

            // Assert: Eredmények ellenőrzése
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Admission>>>(result);
            var model = Assert.IsType<List<Admission>>(actionResult.Value);
            Assert.Equal(2, model.Count);
        }
    }
}
