using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AspNetCore.Identity.MongoDbCore.Extensions;
using Microsoft.AspNetCore.Identity;
using test.Models;


var builder = WebApplication.CreateBuilder(args);


BsonSerializer.RegisterSerializer(new GuidSerializer(MongoDB.Bson.BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeSerializer(MongoDB.Bson.BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(MongoDB.Bson.BsonType.String));
builder.Services.AddSignalR();



//var updateResult = await _propertyCollection.UpdateOneAsync(
//    Builders<RentalProperty>.Filter.Eq(p => p.Id, id),
//    Builders<RentalProperty>.Update.Push(p => p.PhotoPaths, filePath));

var mongoDbIdentityConfig = new MongoDbIdentityConfiguration
{
    MongoDbSettings = new MongoDbSettings
    {
        ConnectionString = "mongodb://localhost:27017",

        //ConnectionString = "",
        DatabaseName = "testmongo"
    },
    IdentityOptionsAction = options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 0;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;

        //lockout
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
        options.Lockout.MaxFailedAccessAttempts = 5;

        options.User.RequireUniqueEmail = true;

    }

};

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Replace all occurrences of 'services' with 'builder.Services'
// Replace all occurrences of 'app' with 'builder'
builder.Services.Configure<MongoDbIdentityConfiguration>(options =>
{
    options.MongoDbSettings = mongoDbIdentityConfig.MongoDbSettings;
    options.IdentityOptionsAction = mongoDbIdentityConfig.IdentityOptionsAction;
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opt =>
    new Dictionary<string, UserConnection>());

builder.Services.AddSingleton<IMongoDatabase>(serviceProvider =>
{
    var settings = mongoDbIdentityConfig.MongoDbSettings;
    var client = new MongoClient(settings.ConnectionString);
    return client.GetDatabase(settings.DatabaseName);
});
// ...

builder.Services.AddDataProtection();
// ...
// ...


builder.Services.AddAuthentication(x =>
{
x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = "http://localhost:7154",
        ValidAudience = "http://localhost:7154",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("q209c nwojnq2uorycqonfjlawfq3p489crn oqc[ldwwfchlf njkf b")),
        ClockSkew = TimeSpan.Zero

    };
});

// Add services to the container.
builder.Services.AddDataProtection();
builder.Services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, Guid>(mongoDbIdentityConfig)
    .AddUserManager<UserManager<ApplicationUser>>()
    .AddRoleManager<RoleManager<ApplicationRole>>()
    .AddDefaultTokenProviders();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowMyOrigin"); // Use the CORS policy

app.UseStaticFiles();

app.MapGet("/", () => "Hello World!");
app.MapHub<ChatHub>("/chat");

app.UseAuthorization();

app.MapControllers();

app.Run();