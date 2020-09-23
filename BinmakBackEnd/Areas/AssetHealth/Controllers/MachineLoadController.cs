using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class MachineLoadController : GenericController<MachineLoad, int>
    {
        public MachineLoadController(BinmakDbContext context) : base(context)
        {
        }
    }
}