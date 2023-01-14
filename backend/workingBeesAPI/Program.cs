using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;
using WorkingBees.Core.Services;
using WorkingBees.Infra.Data;
using workingBeesAPI.Mappers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
	options.AddPolicy("PolicyCors",
		policy =>
		{
			policy.AllowAnyOrigin()
				  .WithMethods("GET", "POST", "PUT", "DELETE")
				  .AllowAnyHeader();
		});
});

builder.Services.AddControllers();

var key = Encoding.ASCII.GetBytes(builder.Configuration["secretKey"]);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) //Adiciono o esquema de JWT Bearer
	.AddJwtBearer(options =>
	{
		//Adiciona as op��es de valida��o
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = false,
			IssuerSigningKey = new SymmetricSecurityKey(key),
			ValidateIssuer = false, // para inativar a valida��o do issuer, informar false e remover ValidIssuer
			ValidateAudience = false, // para inativar a valida��o da audience, informar false e remover ValidAudience
		};
	});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
	{
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		Scheme = "Bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "Autentica��o baseada em Json Web Token (JWT). Entrar SOMENTE com o token no campo abaixo."
	});
	c.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						  new OpenApiSecurityScheme
						  {
							  Reference = new OpenApiReference
							  {
								  Type = ReferenceType.SecurityScheme,
								  Id = "Bearer"
							  }
						  },
						 new string[] {}
					}
				});
});

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
builder.Services.AddScoped<ITokenService, TokenService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("PolicyCors");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
