using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BearingNonDrivingEndController : GenericController<BearingNonDrivingEnd, int>
    {
        public BearingNonDrivingEndController(BinmakDbContext context) : base(context)
        {
        }
    }
}