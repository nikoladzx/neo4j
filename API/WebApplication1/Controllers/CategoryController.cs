using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CategoryController : Controller
    {
        private readonly IGraphClient _client;

        public CategoryController(IGraphClient client)
        {
            _client = client;
        }
        [HttpGet]
        [Route("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _client.Cypher.Match("(c:Category)")
                                            .Return(c => c.As<Category>())
                                            .ResultsAsync;

            if (!categories.Any())
            {
                return BadRequest();
            }
            return Ok(categories);


        }

        [HttpPost]
        [Route("AddCategory/{name}/{price}/{numberofdevices}")]
        public async Task<IActionResult> AddCategory(string name, int price, int numberofdevices)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                var category = await _client.Cypher.Match("(c:Category)").Where((Category c) => c.Name == name).Return(c => c.As<Category>()).ResultsAsync;
                if (category.Any())
                {
                    return StatusCode(202, "Category with that name already exists!");
                }
                await _client.Cypher.Create("(b:Category {Name:$name,Price:$price, NumberOfDevices:$numberofdevices})")
                                    .WithParams(new {name, price, numberofdevices })
                                    .ExecuteWithoutResultsAsync();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        [Route("EditCategory/{name}/{price}/{numberofdevices}")]
        public async Task<IActionResult> EditCategory(string name, int price, int numberofdevices)
        {
            await _client.Cypher
                .Match("(c:Category)")
                .Where("c.Name=$name")
                .Set("c.Price=$price, c.NumerOfDevices=$numberofdevices")
                .WithParams(new { name, price, numberofdevices })
                .ExecuteWithoutResultsAsync();
            return Ok();

        }

    }
}
