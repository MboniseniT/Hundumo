using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class BearingController : GenericController<Bearing, int>
    {
        public BearingController(BinmakDbContext context) : base(context)
        {
        }
    }
}