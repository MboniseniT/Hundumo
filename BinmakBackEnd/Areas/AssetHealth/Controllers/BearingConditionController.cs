using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class BearingConditionController : GenericController<BearingCondition, int>
    {
        public BearingConditionController(BinmakDbContext context) : base(context)
        {
        }
    }
}