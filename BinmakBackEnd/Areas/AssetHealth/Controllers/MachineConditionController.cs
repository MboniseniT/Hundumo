using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class MachineConditionController : GenericController<MachineCondition, int>
    {
        public MachineConditionController(BinmakDbContext context) : base(context)
        {
        }
    }
}