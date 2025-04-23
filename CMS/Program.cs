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

// SQLite
builder.Services.AddDbContext<CMSContext>(
    db => db.UseSqlite(builder.Configuration.GetConnectionString("CMSContext")));

// CORS policy hozzáadása
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

// CORS middleware használata
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

// Egyéni middleware a .html kiterjesztés nélküli fájlok kezeléséhez
app.UseMiddleware<HtmlExtensionMiddleware>();

// Statikus fájlok kiszolgálása
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(currentDir),
    RequestPath = ""
});

app.MapControllers();

// Végsõ fallback az index.html-re
app.MapFallbackToFile("index.html");

app.Run();
// Egyéni middleware osztály a .html kiterjesztés nélküli URL-ek kezeléséhez
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

        // Ha nincs kiterjesztés és nem végzõdik /-re
        if (!string.IsNullOrEmpty(path) && !Path.HasExtension(path) && !path.EndsWith("/"))
        {
            var htmlFilePath = Path.Combine(_rootPath, path + ".html");

            // Ellenõrizzük, hogy létezik-e a .html fájl
            if (File.Exists(htmlFilePath))
            {
                // Beállítjuk a megfelelõ fejléceket
                context.Response.ContentType = "text/html";
                context.Response.Headers[HeaderNames.CacheControl] = "no-cache";

                // Közvetlenül kiszolgáljuk a fájlt
                await context.Response.SendFileAsync(htmlFilePath);
                return;
            }
        }

        // Ha nem találtunk megfelelõ .html fájlt, folytatjuk a pipeline-t
        await _next(context);
    }
}