using BinmakBackEnd.Entities;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DeviceId { get; set; }
        public int BBSSDeviceId { get; set; }
        public int AssetNodeId { get; set; }
        public int SizeCategoryId { get; set; }
        public int MachineTypeId { get; set; }
        public int RevolutionPerMinute { get; set; }
        public int InsulationLevelId { get; set; }
        public int FrequencyPeriodId { get; set; }
        public int MachineLoadId { get; set; }
        public string NonDrivingEnd { get; set; }
        public string DrivingEnd { get; set; }
        public string Criticality { get; set; }
 
        public virtual MachineLoad MachineLoad { get; set; }
        public virtual FrequencyPeriod FrequencyPeriod { get; set; }
        public virtual SizeCategory SizeCategory { get; set; }
        public virtual MachineType MachineType { get; set; }
        public virtual AssetNode AssetNode { get; set; }
        public virtual BBSSDevice BBSSDevice { get; set; }
        public virtual InsulationLevel InsulationLevel { get; set; }
    }
}
