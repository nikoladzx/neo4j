using Neo4jClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var client = new BoltGraphClient(new Uri("bolt://localhost:7687"), "neo4j", "neo4jneo4j");
client.ConnectAsync();
builder.Services.AddSingleton<IGraphClient>(client);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5173", "http://localhost:5174");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
