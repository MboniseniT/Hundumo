using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class FrequencyPeriodController : GenericController<FrequencyPeriod, int>
    {
        public FrequencyPeriodController(BinmakDbContext context) : base(context)
        {
        }
    }
}