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
    public class AssessmentReferenceController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public AssessmentReferenceController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.AssessmentReference.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AssessmentReference request)
        {
            _context.AssessmentReference.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]AssessmentReference request)
        {
            _context.AssessmentReference.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]AssessmentReference request)
        {
            _context.AssessmentReference.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

    }
}