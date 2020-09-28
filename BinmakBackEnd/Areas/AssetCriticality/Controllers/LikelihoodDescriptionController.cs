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
    public class LikelihoodDescriptionController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public LikelihoodDescriptionController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.LikelihoodDescriptions.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]LikelihoodDescription request)
        {
            _context.LikelihoodDescriptions.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]LikelihoodDescription request)
        {
            _context.LikelihoodDescriptions.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]LikelihoodDescription request)
        {
            _context.LikelihoodDescriptions.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


    }
}