using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SensorDataController : GenericController<SensorData, int>
    {
        public readonly BinmakDbContext _context;
        public SensorDataController(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpPost("machine")]
        public IActionResult GetByDeviceId([FromBody]SearchMachineRequest request)
        {
            var data = new SensorDataRepository(_context).FindByMachineId(request);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }
    }
}