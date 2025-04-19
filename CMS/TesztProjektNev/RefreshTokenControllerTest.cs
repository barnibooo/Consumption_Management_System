using CMS.Controllers;
using CMS.Dtos;
using CMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

public class AuthControllerTests
{
    private CMSContext CreateTestContext()
    {
        var options = new DbContextOptionsBuilder<CMSContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new CMSContext(options);
    }

    private IConfiguration CreateTestConfiguration()
    {
        var inMemorySettings = new Dictionary<string, string> {
            {"Jwt:Key", "thisisaverysecretkey1234567890"},
            {"Jwt:Issuer", "TestIssuer"},
            {"Jwt:Audience", "TestAudience"},
            {"Jwt:ExpireMinutes", "60"},
            {"Jwt:RefreshExpireHours", "2"}
        };

        return new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();
    }

    private ClaimsPrincipal CreateAdminUser()
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "admin"),
            new Claim(ClaimTypes.Role, "Admin")
        };
        var identity = new ClaimsIdentity(claims, "TestAuthType");
        return new ClaimsPrincipal(identity);
    }

    [Fact]
    public async Task Register_AdminCanRegisterUser_ReturnsOk()
    {
        var context = CreateTestContext();
        var config = CreateTestConfiguration();
        var controller = new AuthController(context, config);

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = CreateAdminUser() }
        };

        var dto = new RegisterDto
        {
            Username = "newuser",
            Password = "password",
            FirstName = "John",
            LastName = "Doe",
            Role = "Admin"
        };

        var result = await controller.Register(dto);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("User registered successfully.", ((dynamic)okResult.Value).message);
    }

    [Fact]
    public async Task Register_InvalidRole_ReturnsBadRequest()
    {
        var context = CreateTestContext();
        var config = CreateTestConfiguration();
        var controller = new AuthController(context, config);

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = CreateAdminUser() }
        };

        var dto = new RegisterDto
        {
            Username = "test",
            Password = "pass",
            FirstName = "Test",
            LastName = "User",
            Role = "InvalidRole"
        };

        var result = await controller.Register(dto);
        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid role.", badRequest.Value);
    }


    [Fact]
    public async Task Login_WithWrongPassword_ReturnsUnauthorized()
    {
        var context = CreateTestContext();
        var config = CreateTestConfiguration();

        context.Employees.Add(new Employee
        {
            Username = "user2",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
            FirstName = "User",
            LastName = "Wrong",
            Role = "Admin"
        });
        context.SaveChanges();

        var controller = new AuthController(context, config);
        var dto = new LoginDto
        {
            UserName = "user2",
            Password = "wrongpass"
        };

        var result = await controller.Login(dto);
        Assert.IsType<UnauthorizedObjectResult>(result);
    }

    // A refresh token és logout tesztekhez szükséges lenne token létrehozása, ezt külön mockolással vagy e2e flow-val lehet jól tesztelni.
}
