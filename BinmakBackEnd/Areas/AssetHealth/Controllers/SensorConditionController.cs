using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class SensorConditionController : GenericController<SensorCondition, int>
    {
        public SensorConditionController(BinmakDbContext context) : base(context)
        {
        }
    }
}