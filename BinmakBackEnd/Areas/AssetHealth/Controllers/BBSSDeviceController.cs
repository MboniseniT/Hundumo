using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class BBSSDeviceController : GenericController<BBSSDevice, int>
    {
        public readonly BinmakDbContext _context;
        public BBSSDeviceController(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpGet("device/{id}")]
        public IActionResult GetbyDeviceId([FromRoute]string id)
        {
            var data = new BBSSDeviceRepository(_context).FindByDeviceId(id);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);

        }

    }
}