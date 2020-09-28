using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetCriticality.Entities;

namespace BinmakBackEnd.Areas.AssetCriticality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiskAcceptanceThresholdController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public RiskAcceptanceThresholdController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.RiskAcceptanceThreshold.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]RiskAcceptanceThreshold request)
        {
            _context.RiskAcceptanceThreshold.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]RiskAcceptanceThreshold request)
        {
            _context.RiskAcceptanceThreshold.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]RiskAcceptanceThreshold request)
        {
            _context.RiskAcceptanceThreshold.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

    }
}