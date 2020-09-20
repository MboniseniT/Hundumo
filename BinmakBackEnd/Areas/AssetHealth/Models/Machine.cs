using BinmakBackEnd.Entities;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
        public string DeviceId { get; set; }
        public int BBSSDeviceId { get; set; }
        public int AssetNodeId { get; set; }
        public int SizeCategoryId { get; set; }

        public double RmsAlert { get; set; }
        public double RmsAlarm { get; set; }
        public int MachineTypeId { get; set; }
        public int RevolutionPerMinute { get; set; }
        public int InsulationLevelId { get; set; }
        public int FrequencyPeriodId { get; set; }
        public int MachineLoadId { get; set; }
        public int NonDrivingEndId { get; set; }
        public int DrivingEndId { get; set; }
        public string Criticality { get; set; }
        public int ConditionId { get; set; }

        public virtual SensorCondition Condition { get; set; }
        public virtual Bearing NonDrivingEnd { get; set; }
        public virtual Bearing DrivingEnd { get; set; }
        public virtual MachineLoad MachineLoad { get; set; }
        public virtual FrequencyPeriod FrequencyPeriod { get; set; }
        public virtual SizeCategory SizeCategory { get; set; }
        public virtual MachineType MachineType { get; set; }
        public virtual AssetNode AssetNode { get; set; }
        public virtual BBSSDevice BBSSDevice { get; set; }
        public virtual InsulationLevel InsulationLevel { get; set; }
    }
}
