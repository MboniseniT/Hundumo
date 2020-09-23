using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Mappers;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using BinmakBackEnd.Areas.Enums;
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

        public IEnumerable<SensorData> Search(SearchMachineRequest request) => _context.SensorData.Where(a => a.MachineId == request.MachineId &&
            a.TimeStamp >= (request.DateFrom.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000) &&
             a.TimeStamp <= (request.DateTo.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000))
                .Include(a => a.Machine).ThenInclude(a => a.AssetNode)
                .Include(a => a.Machine).ThenInclude(a => a.FrequencyPeriod).OrderBy(a => a.TimeStamp);

        public MachineDetail SearchMachineStatistic(SearchMachineRequest request)
        {
            var data = Search(request);
            if (!data.Any()) return null;
            MachineDetail machineDetail = new MachineDetail
            {
                AssetName = data.First().Machine.AssetNode.Name,
                DeviceId = data.First().DeviceId,
                MachineName = data.First().Machine.Name,
                FrequencyPeriod = data.First().Machine.FrequencyPeriod.Name
            };
            machineDetail.MachineStatistics= data.Select(a=> new MachineStatistics { 
                       AxialRMS = a.AxialRMS,
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

        public MachineSpectrum SearchMachineSpectrum(SearchMachineRequest request)
        {
            var data = Search(request);
            if (!data.Any()) return null;
            var lastData = data.Last();
            var aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
           return new MachineSpectrum
            {
                Xfft = aLog.Xfft,
                Zfft = aLog.Zfft,
                Yfft = aLog.Yfft,
                ModFreq = aLog.ModFreq,
                RevolutionPerMinute = lastData.Machine.RevolutionPerMinute
            };
        }

        public IEnumerable<MachineSpectrum> SearchMachineWaterfall(SearchMachineRequest request)
        {
            var data = _context.SensorData.Where(a => a.MachineId == request.MachineId &&
             a.TimeStamp <= (request.DateTo.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000))
                .Include(a => a.Machine).ThenInclude(a => a.AssetNode)
                .Include(a => a.Machine).ThenInclude(a => a.FrequencyPeriod).OrderBy(a => a.TimeStamp);
            if (!data.Any()) return null;
            var lastData = data.Last();
            var aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
            List<MachineSpectrum> machineSpectrums = new List<MachineSpectrum>();
            machineSpectrums.Add(new MachineSpectrum
            {
                Xfft = aLog.Xfft,
                Zfft = aLog.Zfft,
                Yfft = aLog.Yfft,
                ModFreq = aLog.ModFreq,
                RevolutionPerMinute = lastData.Machine.RevolutionPerMinute
            });
            SensorData sensorData;
            string periodFrequency = data.First().Machine.FrequencyPeriod.Name;
            for (int i = 1; i < 6; i++)
            {
                switch (periodFrequency)
                {
                    case "Hourly":
                        sensorData= GetValues(data, request.DateTo, ((int)PeriodFrequency.Hourly * i));
                        if (sensorData == null) return machineSpectrums;
                        aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
                        machineSpectrums.Add(new MachineSpectrum
                        {
                            Xfft = aLog.Xfft,
                            Zfft = aLog.Zfft,
                            Yfft = aLog.Yfft,
                            ModFreq = aLog.ModFreq,
                            RevolutionPerMinute = sensorData.Machine.RevolutionPerMinute
                        });
                        break;
                    case "Daily":
                        sensorData = GetValues(data, request.DateTo, ((int)PeriodFrequency.Daily * i));
                        if (sensorData == null) return machineSpectrums;
                        aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
                        machineSpectrums.Add(new MachineSpectrum
                        {
                            Xfft = aLog.Xfft,
                            Zfft = aLog.Zfft,
                            Yfft = aLog.Yfft,
                            ModFreq = aLog.ModFreq,
                            RevolutionPerMinute = sensorData.Machine.RevolutionPerMinute
                        });
                        break;
                    case "Weekly":
                        sensorData = GetValues(data, request.DateTo, ((int)PeriodFrequency.Weekly * i));
                        if (sensorData == null) return machineSpectrums;
                        aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
                        machineSpectrums.Add(new MachineSpectrum
                        {
                            Xfft = aLog.Xfft,
                            Zfft = aLog.Zfft,
                            Yfft = aLog.Yfft,
                            ModFreq = aLog.ModFreq,
                            RevolutionPerMinute = sensorData.Machine.RevolutionPerMinute
                        });
                        break;
                    case "Monthly":
                        sensorData = GetValues(data, request.DateTo, ((int)PeriodFrequency.Monthly * i));
                        if (sensorData == null) return machineSpectrums;
                        aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
                        machineSpectrums.Add(new MachineSpectrum
                        {
                            Xfft = aLog.Xfft,
                            Zfft = aLog.Zfft,
                            Yfft = aLog.Yfft,
                            ModFreq = aLog.ModFreq,
                            RevolutionPerMinute = sensorData.Machine.RevolutionPerMinute
                        });
                        break;
                }
            }           
            return machineSpectrums;
        }

        public SensorData GetValues(IEnumerable<SensorData> sensorDatas,DateTime dateTime,int hours)
        {
            try
            {
                return sensorDatas.Where(a => a.TimeStamp <= (dateTime.AddHours(-hours).Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000))
                                   .OrderBy(a => a.TimeStamp).Last();
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
