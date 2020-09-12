using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class UserSettingController : GenericController<UserSetting, int>
    {
        public UserSettingController(BinmakDbContext context) : base(context)
        {
        }
    }
}