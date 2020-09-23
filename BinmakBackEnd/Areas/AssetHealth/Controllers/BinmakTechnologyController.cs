using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class BinmakTechnologyController : GenericController<BinmakTechnology, int>
    {
        public BinmakTechnologyController(BinmakDbContext context) : base(context)
        {
        }
    }
}