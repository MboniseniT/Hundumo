using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineLoadController : GenericController<MachineLoad, int>
    {
        public MachineLoadController(BinmakDbContext context) : base(context)
        {
        }
    }
}