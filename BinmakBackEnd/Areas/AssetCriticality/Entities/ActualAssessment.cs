using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.AssetCriticality.Entities
{
    public class ActualAssessment
    {
        public int Id { get; set; }
        public string EquipmentId { get; set; }
        public string CapitalExpenditure { get; set; }
        public string ProjectSchedule { get; set; }
        public string OperatingCost { get; set; }
        public string ProductionVolume { get; set; }
        public string Revenue { get; set; }
        public string Safety { get; set; }
        public string Health { get; set; }
        public string Environment { get; set; }
        public string Community { get; set; }
        public string Compliance { get; set; }
        public string Reputation { get; set; }
        public string Risk { get; set; }
        public string Quality { get; set; }
        public string Budget { get; set; }
        public string Legal { get; set; }
        public string FailureFrequency { get; set; }
        public string DominantFrequency { get; set; }
        public string ThresholdRiskBand { get; set; }
        public string RiskRanking { get; set; }
    }
}
