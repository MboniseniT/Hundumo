using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class SensorDataController : GenericController<SensorData, int>
    {
        public SensorDataController(BinmakDbContext context) : base(context)
        {
        }
    }
}