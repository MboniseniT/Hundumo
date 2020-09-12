namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class BearingDrivingEnd
    {
        public int Id { get; set; }
        public int BearingContionId { get; set; }
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
