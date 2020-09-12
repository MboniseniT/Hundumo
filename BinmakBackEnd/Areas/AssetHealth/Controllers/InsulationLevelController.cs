using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsulationLevelController : GenericController<InsulationLevel, int>
    {
        public InsulationLevelController(BinmakDbContext context) : base(context)
        {
        }
    }
}