using BinmakAPI.Entities;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class UserSetting
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public bool MessageMeasurement { get; set; }
        public bool MessageAlert { get; set; }
        public bool MessageAlarm { get; set; }
        public bool MessageBatteryLow { get; set; }
        public bool MessageDaily { get; set; }
        public bool WAMeasurement { get; set; }
        public bool WAAlert { get; set; }
        public bool WAAlarm { get; set; }
        public bool WABatteryLow { get; set; }
        public bool WADaily { get; set; }
        public bool EmailMeasurement { get; set; }
        public bool EmailAlert { get; set; }
        public bool EmailAlarm { get; set; }
        public bool EmailBatteryLow { get; set; }
        public bool EmailDaily { get; set; }
        public bool CallAlert { get; set; }
        public bool CallAlarm { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
