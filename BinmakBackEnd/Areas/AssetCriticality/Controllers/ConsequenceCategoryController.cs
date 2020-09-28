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
    public class ConsequenceCategoryController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public ConsequenceCategoryController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.ConsequenceCategory.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]ConsequenceCategory request)
        {
            _context.ConsequenceCategory.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]ConsequenceCategory request)
        {
            _context.ConsequenceCategory.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]ConsequenceCategory request)
        {
            _context.ConsequenceCategory.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }
    }
}