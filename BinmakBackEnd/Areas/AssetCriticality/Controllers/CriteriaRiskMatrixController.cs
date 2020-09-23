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
    public class CriteriaRiskMatrixController : ControllerBase
    {
        private readonly BinmakDbContext _context;
        public CriteriaRiskMatrixController(BinmakDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.CriteriaRiskMatrix.ToList();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post([FromBody]CriteriaRiskMatrix request)
        {
            _context.CriteriaRiskMatrix.Add(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


        [HttpPut]
        public IActionResult Put([FromBody]CriteriaRiskMatrix request)
        {
            _context.CriteriaRiskMatrix.Update(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]CriteriaRiskMatrix request)
        {
            _context.CriteriaRiskMatrix.Remove(request);
            _context.SaveChanges();
            return Ok("Save successfully");
        }


    }
}