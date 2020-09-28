using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class MachineTypeController : GenericController<MachineType, int>
    {
        public MachineTypeController(BinmakDbContext context) : base(context)
        {
        }
    }
}