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
    public class ActualAssessmentController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public ActualAssessmentController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.ActualAssessment.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]ActualAssessment request)
        {
            _context.ActualAssessment.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]ActualAssessment request)
        {
            _context.ActualAssessment.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]ActualAssessment request)
        {
            _context.ActualAssessment.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

    }
}