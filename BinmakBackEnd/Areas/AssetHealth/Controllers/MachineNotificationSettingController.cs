using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class MachineNotificationSettingController : GenericController<MachineNotificationSetting, int>
    {
        public MachineNotificationSettingController(BinmakDbContext context) : base(context)
        {
        }
    }
}