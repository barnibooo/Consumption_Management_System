using Microsoft.Extensions.FileProviders;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
//RunBuildScript();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
