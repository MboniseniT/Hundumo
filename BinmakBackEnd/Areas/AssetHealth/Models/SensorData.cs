using System;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class SensorData
    {
        public int Id { get; set; }
        public string DeviceId { get; set; }
        public int MachineId { get; set; }
        public long TimeStamp { get; set; }
        public bool Waveform { get; set; }
        public bool FFT { get; set; }
        public double Temperature { get; set; }
        public double AxialRMS { get; set; }
        public double RadialRMS { get; set; }
        public double TangentialRMS { get; set; }
        public double OverallRMS { get; set; }
        public double BatCap { get; set; }
        public double BatSOC { get; set; }
        public double BatTTE { get; set; }
        public string Alog { get; set; }
        public DateTime RegiDate { get; set; }

        public virtual Machine Machine { get; set; }
    }
}
