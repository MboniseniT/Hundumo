namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class MachineNotificationSetting
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public int NumberOfAlarms { get; set; }
        public int NumberOfAlerts { get; set; }
        public int NumberOfAcknowledgementAlerts { get; set; }
        public int NumberOfAcknowledgementAlarms { get; set; }

        public virtual Machine Machine { get; set; }
    }
}
