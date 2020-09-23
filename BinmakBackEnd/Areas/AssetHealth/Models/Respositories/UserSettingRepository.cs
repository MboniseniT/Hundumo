using BinmakAPI.Data;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class UserSettingRepository : CrudRepository<UserSetting>
    {
        public readonly BinmakDbContext _context;
        public UserSettingRepository(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        public UserSetting FindByUserId(string userId) => _context.UserSettings.FirstOrDefault(a=>a.UserId.Equals(userId));
    }
}
