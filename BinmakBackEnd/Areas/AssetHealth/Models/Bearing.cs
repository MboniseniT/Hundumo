namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class Bearing
    {
        public int Id { get; set; }
        public int BearingNonDrivingEndId { get; set; }
        public int BearingDrivingEndId { get; set; }
        public int MachineId { get; set; }
        public decimal StructureLooseCondition { get; set; }
        public decimal StructureLooseAlert { get; set; }
        public decimal StructureLooseAlarm { get; set; }
        public decimal RotorLooseCondition { get; set; }
        public decimal FastFourierTransformPeriod { get; set; }
        public decimal RotorLooseAlert { get; set; }
        public decimal RotorLooseAlarm { get; set; }
        public decimal MisAlignmentCondtion { get; set; }
        public decimal MisAlignmentAlert { get; set; }
        public decimal MisAlignmentAlarm { get; set; }
        public decimal Unbalance { get; set; }
        public decimal UnbalanceAlert { get; set; }
        public decimal UnbalanceAlarm { get; set; }
        public decimal LastFastFourierTransform { get; set; }
        public decimal TemperatureAlert { get; set; }
        public decimal TemperatureAlarm { get; set; }
        public virtual Machine Machine { get; set; }
        public virtual BearingDrivingEnd BearingDrivingEnd { get; set; }
        public virtual BearingNonDrivingEnd BearingNonDrivingEnd { get; set; }
    }
}
