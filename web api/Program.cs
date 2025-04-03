//using Bl;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
////builder.Services.AddSingleton<IBLManager, BLManager>();
//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
//builder.Services.AddSingleton<IBLManager, BLManager>();
////builder.Services.AddSingleton<IDalManager, DalManager>();

//var app = builder.Build();


//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

using Bl;
using Bl.API;
using Bl.Services;
using Dal;
using Dal.Models;
using Dal.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IBLManager, BLManager>();
builder.Services.AddScoped<IDalManager, DalManager>();
builder.Services.AddScoped<IDalClientService, DalClientService>(); // ‰ÂÒÛ Ê‡˙
builder.Services.AddScoped<IDalClientService, DalClientService>();
builder.Services.AddScoped<IBLOrderService, BLOrderService>();
builder.Services.AddScoped<IBLClientService, BLClientService>();
builder.Services.AddScoped<IBLManager, BLManager>();

builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"C:\\Users\\This User\\Documents\\limodim\\fullstack_Project\\Full_Stack_Haker_Web\\Dal\\Data\\Database.mdf\";Integrated Security=True\r\n"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
app.UseCors(policy =>//Ó‡Ù˘¯ ÏFRONTEND Ï‚˘˙ ÏBACKEND
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();




