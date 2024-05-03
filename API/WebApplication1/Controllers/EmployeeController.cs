using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IGraphClient _client;

        public EmployeeController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPut]
        [Route("EditEmployeeSalary/{email}/{salary}")]
        public async Task<IActionResult> EditEmployeeSalary(string email, int salary)
        {
            await _client.Cypher
                .Match("(e:Employee)")
                .Where("e.Email=$email")
                .Set("e.Salary=$salary")
                .WithParams(new { email, salary })
                .ExecuteWithoutResultsAsync();
            return Ok();

        }
    }
}
