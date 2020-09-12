using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class UserSettingRepository : CrudRepository<UserSetting>
    {
        public UserSettingRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
