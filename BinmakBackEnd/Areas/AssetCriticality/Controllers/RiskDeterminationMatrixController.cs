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
    public class RiskDeterminationMatrixController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public RiskDeterminationMatrixController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.RiskDeterminationMatrix.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]RiskDeterminationMatrix request)
        {
            _context.RiskDeterminationMatrix.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]RiskDeterminationMatrix request)
        {
            _context.RiskDeterminationMatrix.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]RiskDeterminationMatrix request)
        {
            _context.RiskDeterminationMatrix.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }
    }
}