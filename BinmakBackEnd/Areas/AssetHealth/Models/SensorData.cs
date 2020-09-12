using System;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class SensorData
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public long TimeStamp { get; set; }
        public bool Waveform { get; set; }
        public bool FFT { get; set; }
        public string Temperature { get; set; }
        public decimal AxialRMS { get; set; }
        public decimal RadialRMS { get; set; }
        public decimal TangentialRMS { get; set; }
        public decimal OverallRMS { get; set; }
        public decimal BatCap { get; set; }
        public decimal BatSOC { get; set; }
        public decimal BatTTE { get; set; }
        public string Alog { get; set; }
        public DateTime RegiDate { get; set; }
        public int ConditionId { get; set; }

        public virtual SensorCondition Condition { get; set; }
        public virtual Machine Machine { get; set; }
    }
}
