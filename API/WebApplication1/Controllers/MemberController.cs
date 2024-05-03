﻿using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MemberController : Controller
    {
        private readonly IGraphClient _client;

        public MemberController(IGraphClient client)
        {
            _client = client;
        }

        [HttpGet]
        [Route("GetMembers")]
        public async Task<IActionResult> GetMembers()
        {
            var members = await _client.Cypher.Match("(m:Member)")
                                            .Return(m => m.As<Member>())
                                            .ResultsAsync;

            if (!members.Any())
            {
                return BadRequest();
            }
            return Ok(members);


        }

        [HttpPost]
        [Route("RegisterMember/{username}/{password}")]
        public async Task<IActionResult> RegisterUser(string username, string password)
        {
            if (!string.IsNullOrWhiteSpace(username) && username.Length <= 20 && !string.IsNullOrWhiteSpace(password) && password.Length <= 20)
            {
                var member = await _client.Cypher.Match("(m:Member)").Where((Member m) => m.Username == username).Return(m => m.As<Member>()).ResultsAsync;
                if (member.Any())
                {
                    return StatusCode(202, "Member with that username already exists!");
                }
                Dictionary<string, object> queryDict = new Dictionary<string, object>();
                queryDict.Add("username", username);
                queryDict.Add("password", password);
                queryDict.Add("credits", 0);
                await _client.Cypher.Create("(b:Member {Username:$username,Password:$password, Credits:$credits})")
                                    .WithParams(queryDict)
                                    .ExecuteWithoutResultsAsync();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        [Route("AddCredits/{username}/{credits}")]
        public async Task<IActionResult> AddCredits(string username, int credits)
        {
            await _client.Cypher
                .Match("(m:Member)")
                .Where("m.Username=$username")
                .Set("m.Credits=$credits+m.Credits")
                .WithParams(new { username, credits })
                .ExecuteWithoutResultsAsync();
            return Ok();

        }
    }
}
