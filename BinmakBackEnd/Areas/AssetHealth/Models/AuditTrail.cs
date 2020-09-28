using BinmakAPI.Entities;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class AuditTrail
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string InitialData { get; set; }
        public string FinalData { get; set; }
        public string Action { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
