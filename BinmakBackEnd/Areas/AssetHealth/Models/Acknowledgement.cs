using System;
using BinmakAPI.Entities;
namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class Acknowledgement
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public string UserId { get; set; }
        public string ConditionId { get; set; }
        public string Action { get; set; }
        public DateTime RegiDate { get; set; }

        public virtual ApplicationUser User { get; set; }
        public virtual SensorCondition Condition { get; set; }
        public virtual Machine Machine { get; set; }

    }
}
