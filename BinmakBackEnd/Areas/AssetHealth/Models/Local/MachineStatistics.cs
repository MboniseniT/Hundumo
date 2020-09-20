using System;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class MachineStatistics
    {
        public string DeviceId { get; set; }
        public long TimeStamp { get; set; }
        public double Temperature { get; set; }
        public double AxialRMS { get; set; }
        public double RadialRMS { get; set; }
        public double TangentialRMS { get; set; }
        public double OverallRMS { get; set; }
        public string MachineName { get; set; }
        public string AssetName { get; set; }
        public decimal RmsAlert { get; set; }
        public decimal RmsAlarm { get; set; }
        public DateTime RegiDate { get; set; }
    }
}
