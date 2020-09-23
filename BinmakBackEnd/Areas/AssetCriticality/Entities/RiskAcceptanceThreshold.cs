using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.AssetCriticality.Entities
{
    public class RiskAcceptanceThreshold
    {
        public int Id { get; set; }
        public string ThresholdRiskBand { get; set; }
        public string RiskAcceptanceThresholds { get; set; }
    }
}
