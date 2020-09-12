namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class BearingNonDrivingEnd
    {
        public int Id { get; set; }
        public int BearingConditionId { get; set; }
        public decimal BPFO { get; set; }
        public decimal BPFOAlert { get; set; }
        public decimal BPFOAlarm { get; set; }
        public decimal BPFI { get; set; }
        public decimal BPFIAlert { get; set; }
        public decimal BPFIAlarm { get; set; }
        public decimal BSF { get; set; }
        public decimal BSFAlert { get; set; }
        public decimal BSFAlarm { get; set; }

        public virtual BearingCondition BearingCondition { get; set; }
    }
}
