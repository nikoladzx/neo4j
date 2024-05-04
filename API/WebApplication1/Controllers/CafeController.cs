using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CafeController : Controller
    {
        private readonly IGraphClient _client;

        public CafeController(IGraphClient client)
        {
            _client = client;
        }


        [HttpGet]
        [Route("GetCafes")]
        public async Task<IActionResult> GetCafes()
        {
            var cafes = await _client.Cypher.Match("(c:Cafe)")
                                            .Return(c => c.As<Cafe>())
                                            .ResultsAsync;

            if (!cafes.Any())
            {
                return BadRequest();
            }
            return Ok(cafes);


        }

        [HttpGet]
        [Route("GetEmployeesByCafe/{name}")]
        public async Task<IActionResult> GetEmployeesByCafe(string name)
        {
            var employees = await _client.Cypher.Match("(e:Employee)")
                                            .Where("e.CafeName=$name")
                                            .WithParams(new { name})
                                            .Return(e => e.As<Employee>())
                                            .ResultsAsync;

            if (!employees.Any())
            {
                return BadRequest();
            }
            return Ok(employees);


        }


        [HttpPost]
        [Route("AddEmployee/{cafename}/{name}/{salary}/{age}/{email}")]
        public async Task<IActionResult> AddCategory(string cafename, string name, int salary, int age, string email)
        {
            if (!string.IsNullOrWhiteSpace(email))
            {
                var employee = await _client.Cypher.Match("(e:Employee)").Where((Employee e) => e.Email == email).Return(e => e.As<Employee>()).ResultsAsync;
                if (employee.Any())
                {
                    return StatusCode(202, "Employee with that email already exists!");
                }
                await _client.Cypher.Create("(b:Employee {Name:$name,Salary:$salary, Age:$age, Email:$email, CafeName:$cafename})")
                                    .WithParams(new { name, salary, age, email, cafename })
                                    .ExecuteWithoutResultsAsync();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost]
        [Route("AddCafe/{name}/{address}")]
        public async Task<IActionResult> AddCafe(string name, string address)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                var cafe = await _client.Cypher.Match("(c:Cafe)").Where((Cafe c) => c.Name == name).Return(c => c.As<Cafe>()).ResultsAsync;
                if (cafe.Any())
                {
                    return StatusCode(202, "Cafe with that name already exists!");
                }
                await _client.Cypher.Create("(b:Cafe {Name:$name,Address:$address})")
                                    .WithParams(new { name, address })
                                    .ExecuteWithoutResultsAsync();
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("DeleteCafe/{name}")]
        public async Task<IActionResult> DeleteCafe(string name)
        {
            var cafe = await _client.Cypher.Match("(c:Cafe)")
                                           .Where((Cafe c) => c.Name == name)
                                           .Return(c => c.As<Cafe>())
                                           .ResultsAsync;
            if (!cafe.Any())
            {
                return StatusCode(202, "Cafe not found");
            }

            await _client.Cypher.Match("(c:Cafe)")
                                            .Where((Cafe c) => c.Name == name)
                                            .DetachDelete("c")
                                            .ExecuteWithoutResultsAsync();

            return Ok("Deleted");


        }
    }
}
