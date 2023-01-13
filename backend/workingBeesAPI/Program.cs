using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;
using WorkingBees.Core.Services;
using WorkingBees.Infra.Data;
using workingBeesAPI.Mappers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("PolicyCors",
//        policy =>
//        {
//            policy.WithOrigins("*")
//                  .WithMethods("GET", "POST", "PUT", "DELETE");
//            policy.AllowAnyHeader();
//        });
//});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(ModelsMapper));

builder.Services.AddScoped<IService<Skill>, SkillService>();
builder.Services.AddScoped<IRepository<Skill>, SkillsRepository>();
builder.Services.AddScoped<IService<Experience>, ExperienceService>();
builder.Services.AddScoped<IRepository<Experience>, ExperiencesRepository>();
builder.Services.AddScoped<IService<SocialMediaInfo>, SocialMediaInfoService>();
builder.Services.AddScoped<IRepository<SocialMediaInfo>, SocialMediaInfoRepository>();
builder.Services.AddScoped<IService<UserInfo>, UserInfoService>();
builder.Services.AddScoped<IUserCompleteInfoService, UserInfoService>();
builder.Services.AddScoped<IRepository<UserInfo>, UserInfoRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
