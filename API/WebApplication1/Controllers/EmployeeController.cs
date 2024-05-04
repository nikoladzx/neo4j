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
            var employee = await _client.Cypher
                .Match("(e:Employee)")
                .Where("e.Email=$email")
                .Set("e.Salary=$salary")
                .WithParams(new { email, salary })
                .Return(e => e.As<Employee>())
                .ResultsAsync;
            return Ok(employee);

        }

        [HttpDelete]
        [Route("DeleteEmployee/{email}")]
        public async Task<IActionResult> DeleteEmployee(string email)
        {
            var employee = await _client.Cypher.Match("(e:Employee)")
                                           .Where((Employee e) => e.Email == email)
                                           .Return(e => e.As<Employee>())
                                           .ResultsAsync;
            if (!employee.Any())
            {
                return StatusCode(202, "Employee not found");
            }

            await _client.Cypher.Match("(e:Employee)")
                                            .Where((Employee e) => e.Email == email)
                                            .DetachDelete("e")
                                            .ExecuteWithoutResultsAsync();

            return Ok("Deleted");


        }
    }
}
