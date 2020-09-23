using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Mappers;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
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

        public MachineDetail FindByMachineId(SearchMachineRequest request)
        {
            var data = _context.SensorData.Where(a => a.MachineId == request.MachineId &&
            a.TimeStamp >= (request.DateFrom.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds *1000) &&
             a.TimeStamp <= (request.DateTo.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000))
                .Include(a => a.Machine).ThenInclude(a => a.AssetNode)
                .Include(a => a.Machine).ThenInclude(a => a.FrequencyPeriod).OrderBy(a => a.TimeStamp);
            if (!data.Any()) return null;
            MachineDetail machineDetail = new MachineDetail
            {
                AssetName = data.First().Machine.AssetNode.Name,
                DeviceId = data.First().DeviceId,
                MachineName = data.First().Machine.Name,
                FrequencyPeriod = data.First().Machine.FrequencyPeriod.Name
            };

            machineDetail.MachineStatistics= data.Select(a=> new MachineStatistics { 
                       Xfft = JsonConvert.DeserializeObject<Spectrum>(a.Alog).Xfft,
                       AxialRMS = a.AxialRMS,
                       Zfft = JsonConvert.DeserializeObject<Spectrum>(a.Alog).Zfft,
                       Yfft = JsonConvert.DeserializeObject<Spectrum>(a.Alog).Yfft,
                       ModFreq = JsonConvert.DeserializeObject<Spectrum>(a.Alog).ModFreq,
                       OverallRMS = a.OverallRMS,
                       RadialRMS = a.RadialRMS,
                       TangentialRMS = a.TangentialRMS,
                       Temperature = a.Temperature,
                       TimeStamp = a.TimeStamp,
                       RmsAlarm = a.Machine.RmsAlarm,
                       RmsAlert = a.Machine.RmsAlert,
                       TemperatureAlarm = a.Machine.TemperatureAlarm,
                       TemperatureAlert = a.Machine.TemperatureAlert
                });
            return machineDetail;
        }
    }
}
