using BinmakAPI.Data;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class BBSSDeviceRepository : CrudRepository<BBSSDevice>
    {
        public readonly BinmakDbContext _context;
        public BBSSDeviceRepository(BinmakDbContext context) : base(context)
        {
            _context = context;
        }
        public BBSSDevice FindByDeviceId(string deviceId) => _context.BBSSDevices.FirstOrDefault(a => a.DeviceId.Equals(deviceId));
    }
}
