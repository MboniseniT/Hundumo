using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetCriticality.Entities;

namespace BinmakBackEnd.Areas.AssetCriticality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiskAssessorLoginController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public RiskAssessorLoginController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.RiskAssessorLogin.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]RiskAssessorLogin request)
        {
            _context.RiskAssessorLogin.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]RiskAssessorLogin request)
        {
            _context.RiskAssessorLogin.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]RiskAssessorLogin request)
        {
            _context.RiskAssessorLogin.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

    }
}