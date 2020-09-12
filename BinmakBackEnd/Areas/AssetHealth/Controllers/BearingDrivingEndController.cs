using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BearingDrivingEndController : GenericController<BearingDrivingEnd, int>
    {
        public BearingDrivingEndController(BinmakDbContext context) : base(context)
        {
        }
    }
}