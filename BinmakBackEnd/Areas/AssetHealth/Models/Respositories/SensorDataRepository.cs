using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class SensorDataRepository : CrudRepository<SensorData>
    {
        public BinmakDbContext _context;
        public SensorDataRepository(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<MachineStatistics> FindByMachineId(SearchMachineRequest request)
        {
            return _context.SensorData.Where(a => a.MachineId == request.MachineId && 
            a.RegiDate >= request.DateFrom &&
             a.RegiDate <= request.DateTo)
                .Include(a => a.Machine).ThenInclude(a => a.AssetNode)
                .Include(a => a.Machine).ThenInclude(a => a.MachineType)
                .Include(a => a.Machine).ThenInclude(a => a.MachineType).Select(a=> new MachineStatistics { 
                       AssetName = a.Machine.AssetNode.Name,
                       AxialRMS = a.AxialRMS,
                       DeviceId = a.DeviceId,
                       MachineName = a.Machine.Name,
                       OverallRMS = a.OverallRMS,
                       RadialRMS = a.RadialRMS,
                       RegiDate = a.RegiDate,
                       TangentialRMS = a.TangentialRMS,
                       Temperature = a.Temperature,
                       TimeStamp = a.TimeStamp,
                       RmsAlarm = a.Machine.RmsAlarm,
                       RmsAlert = a.Machine.RmsAlert
                });
                
        }
    }
}
