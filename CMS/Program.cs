using CMS.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Diagnostics;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
//RunBuildScript();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//MSSQL-es
//builder.Services.AddDbContext<CMSContext>(db => db.UseSqlServer(
//builder.Configuration.GetConnectionString("CMSContext")));

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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

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

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


builder.Services.AddAuthorization(options =>
{

    options.AddPolicy("AdminOnly", policy => policy.RequireRole(nameof(Roles.Admin)));

    options.AddPolicy("RestaurantOnly", policy => policy.RequireRole(nameof(Roles.RestaurantAssistant)));
    options.AddPolicy("TicketOnly", policy => policy.RequireRole(nameof(Roles.TicketAssistant)));

});

var app = builder.Build();

app.UseAuthentication();

app.UseAuthorization();

// CORS middleware használata
app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}




app.UseRouting();
app.UseAuthorization();
app.MapControllers();

#region Static frontend serving
app.UseDefaultFiles(); // Serve the index.html file by default
string currentDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(currentDir),
    RequestPath = ""
});
#endregion 


app.Run();
//Script for build
void RunBuildScript()
{
    try
    {
        var processInfo = new ProcessStartInfo
        {
            FileName = "cmd.exe",
            Arguments = "/c builder.cmd",
            WorkingDirectory = Directory.GetCurrentDirectory(),
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        var process = new Process { StartInfo = processInfo };
        process.Start();
        process.WaitForExit();

        Console.WriteLine("React build sikeresen lefutott.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Hiba történt a React build során: {ex.Message}");
    }
}
