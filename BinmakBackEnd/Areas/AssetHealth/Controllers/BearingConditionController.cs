using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BearingConditionController : GenericController<BearingCondition, int>
    {
        public BearingConditionController(BinmakDbContext context) : base(context)
        {
        }
    }
}