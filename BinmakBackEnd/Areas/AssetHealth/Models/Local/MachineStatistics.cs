using System;
using System.Collections.Generic;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class MachineStatistics
    {
        public double? TimeStamp { get; set; }
        public double? Temperature { get; set; }
        public double? AxialRMS { get; set; }
        public double? RadialRMS { get; set; }
        public double? TangentialRMS { get; set; }
        public double? OverallRMS { get; set; }
        public decimal? RmsAlert { get; set; }
        public decimal? RmsAlarm { get; set; }
        public decimal? TemperatureAlarm { get; set; }
        public decimal? TemperatureAlert { get; set; }
        public double[]? Xfft { get; set; }

        public double[]? Yfft { get; set; }

        public double[]? Zfft { get; set; }

        public double[]? ModFreq { get; set; }
    }
}
