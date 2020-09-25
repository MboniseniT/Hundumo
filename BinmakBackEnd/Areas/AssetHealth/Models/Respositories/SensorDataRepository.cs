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
             a.TimeStamp <= (request.DateTo.AddDays(1).Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000))
                .Include(a => a.Machine).ThenInclude(a => a.AssetNode)
                .Include(a => a.Machine).ThenInclude(a => a.FrequencyPeriod);

        public double GetLastDate()=> _context.SensorData.OrderByDescending(a=>a.Id).FirstOrDefault().TimeStamp;
        
        public MachineDetail SearchMachineStatistic(SearchMachineRequest request)
        {
            var data = Search(request);
            if (!data.Any()) return null;
            MachineDetail machineDetail = new MachineDetail
            {
                AssetName = data.First().Machine.AssetNode.Name,
                DeviceId = data.First().DeviceId,
                MachineName = data.First().Machine.Name,
                FrequencyPeriod = data.First().Machine.FrequencyPeriod.Name,
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

        public IEnumerable<WaterfallSeriesDimensions> SearchMachineWaterfall(SearchMachineRequest request)
        {
            var data = _context.SensorData.Where(a => a.MachineId == request.MachineId &&
             a.TimeStamp <= (request.DateTo.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000)).Include(a=>a.Machine).ThenInclude(a=>a.FrequencyPeriod);
            if (!data.Any()) return null;
            var lastData = data.OrderByDescending(a=>a.Id).FirstOrDefault();
            var aLog = JsonConvert.DeserializeObject<Spectrum>(lastData.Alog);
            var waterfallSeriesDimensionses = new List<WaterfallSeriesDimensions>();
            WaterfallSeriesDimensions waterfallSeriesDimensions = new WaterfallSeriesDimensions();

            
            for (int i =0; i<aLog.Xfft.Length; i++)
            {
                double[] vs = new double[3];
                vs[0] = aLog.ModFreq[i];
                vs[1] = aLog.Xfft[i];
                vs[2] = lastData.TimeStamp;
                waterfallSeriesDimensions.XWaterfallSeries.Data.Add(vs);
            }                    
            for (int i = 0; i < aLog.Yfft.Length; i++)
            {
                double[] yvs = new double[3];
                yvs[0] = aLog.ModFreq[i];
                yvs[1] = aLog.Yfft[i];
                yvs[2] = lastData.TimeStamp;
                waterfallSeriesDimensions.YWaterfallSeries.Data.Add(yvs);
            }
            for (int i = 0; i < aLog.Zfft.Length; i++)
            {
                double[] zvs = new double[3];
                zvs[0] = aLog.ModFreq[i];
                zvs[1] = aLog.Zfft[i];
                zvs[2] = lastData.TimeStamp;
                waterfallSeriesDimensions.ZWaterfallSeries.Data.Add(zvs);
            }
            waterfallSeriesDimensionses.Add(waterfallSeriesDimensions);
            SensorData sensorData;
            string periodFrequency = data.First().Machine.FrequencyPeriod.Name;
            for (int i = 1; i < 6; i++)
            {
                switch (periodFrequency)
                {
                    case "Hourly":
                        sensorData= GetValues(data, request.DateTo, ((int)PeriodFrequency.Hourly * i), request.MachineId);
                        if (sensorData == null) return waterfallSeriesDimensionses;
                        waterfallSeriesDimensionses.Add(LoadData(sensorData));
                        break;
                    case "Daily":
                        sensorData = GetValues(data, request.DateTo, ((int)PeriodFrequency.Daily * i), request.MachineId);
                        if (sensorData == null) return waterfallSeriesDimensionses;
                        waterfallSeriesDimensionses.Add(LoadData(sensorData));
                        break;
                    case "Weekly":
                        sensorData = GetValues(data, request.DateTo, ((int)PeriodFrequency.Weekly * i), request.MachineId);
                        if (sensorData == null) return waterfallSeriesDimensionses;
                        waterfallSeriesDimensionses.Add(LoadData(sensorData));
                        break;
                    case "Monthly":
                        sensorData = GetValues(data, request.DateTo, ((int)PeriodFrequency.Monthly * i), request.MachineId);
                        if (sensorData == null) return waterfallSeriesDimensionses;
                        waterfallSeriesDimensionses.Add(LoadData(sensorData));
                        break;
                }
            }           
            return waterfallSeriesDimensionses;
        }

        public WaterfallSeriesDimensions LoadData(SensorData data)
        {
            WaterfallSeriesDimensions waterfallSeriesDimensions = new WaterfallSeriesDimensions();
            var aLog = JsonConvert.DeserializeObject<Spectrum>(data.Alog);
           
            for (int i = 0; i < aLog.Xfft.Length; i++)
            {
                double[] vs = new double[3];
                vs[0] = aLog.ModFreq[i];
                vs[1]= aLog.Xfft[i];
                vs[2] = data.TimeStamp;
                waterfallSeriesDimensions.XWaterfallSeries.Data.Add(vs);
            }
            for (int i = 0; i < aLog.Yfft.Length; i++)
            {
                double[] yvs = new double[3];
                yvs[0] = aLog.ModFreq[i];
                yvs[1] = aLog.Yfft[i];
                yvs[2] = data.TimeStamp;
                waterfallSeriesDimensions.YWaterfallSeries.Data.Add(yvs);                
            }
            for (int i = 0; i < aLog.Zfft.Length; i++)
            {
                double[] zvs = new double[3];
                zvs[0] = aLog.ModFreq[i];
                zvs[1] = aLog.Zfft[i];
                zvs[2] = data.TimeStamp;
                waterfallSeriesDimensions.ZWaterfallSeries.Data.Add(zvs); 
            }
           return waterfallSeriesDimensions;
        }

        public SensorData GetValues(IEnumerable<SensorData> sensorDatas,DateTime dateTime,int hours, int machineId)
        {
            try
            {
                var timeStamp = (dateTime.AddHours(-hours).Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds * 1000);
                return _context.SensorData.Where(a => a.MachineId == machineId &&
              a.TimeStamp <= timeStamp).OrderByDescending(a => a.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
