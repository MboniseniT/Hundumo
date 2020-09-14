using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class InsulationLevelController : GenericController<InsulationLevel, int>
    {
        public InsulationLevelController(BinmakDbContext context) : base(context)
        {
        }
    }
}