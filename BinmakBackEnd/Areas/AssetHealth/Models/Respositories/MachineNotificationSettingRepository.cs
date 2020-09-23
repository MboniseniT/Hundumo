using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class MachineNotificationSettingRepository : CrudRepository<MachineNotificationSetting>
    {
        public MachineNotificationSettingRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}

