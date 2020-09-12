using BinmakAPI.Data;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class MachineRepository : CrudRepository<Machine>
    {
        public readonly BinmakDbContext _context;
        public MachineRepository(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        public Machine FindByDeviceId(string deviceId) => _context.Machines.FirstOrDefault(a=>a.DeviceId.Equals(deviceId));
    }
}

