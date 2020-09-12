using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class MachineController : GenericController<Machine, int>
    {
        public readonly BinmakDbContext _context;
        public MachineController(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpGet("device/{id}")]
        public IActionResult GetbyDeviceId([FromRoute]string id)
        {
            var data = new MachineRepository(_context).FindByDeviceId(id);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }
    }
}