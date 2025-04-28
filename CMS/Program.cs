using CMS.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Diagnostics;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CMSContext>(
    db => db.UseSqlite(builder.Configuration.GetConnectionString("CMSContext")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole(nameof(Roles.Admin)));
    options.AddPolicy("RestaurantOnly", policy => policy.RequireRole(nameof(Roles.RestaurantAssistant)));
    options.AddPolicy("TicketOnly", policy => policy.RequireRole(nameof(Roles.TicketAssistant)));
    options.AddPolicy("AdminOrRestaurantOnly", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.RestaurantAssistant)));
    options.AddPolicy("AdminOrTicketOnly", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.TicketAssistant)));
});

var app = builder.Build();

app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

string currentDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

app.UseMiddleware<HtmlExtensionMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(currentDir),
    RequestPath = ""
});

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
public class HtmlExtensionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _rootPath;

    public HtmlExtensionMiddleware(RequestDelegate next, IWebHostEnvironment env)
    {
        _next = next;
        _rootPath = Path.Combine(env.ContentRootPath, "wwwroot");
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value?.TrimStart('/');

        if (!string.IsNullOrEmpty(path) && !Path.HasExtension(path) && !path.EndsWith("/"))
        {
            var htmlFilePath = Path.Combine(_rootPath, path + ".html");

            if (File.Exists(htmlFilePath))
            {
                context.Response.ContentType = "text/html";
                context.Response.Headers[HeaderNames.CacheControl] = "no-cache";

                await context.Response.SendFileAsync(htmlFilePath);
                return;
            }
        }

        await _next(context);
    }
}