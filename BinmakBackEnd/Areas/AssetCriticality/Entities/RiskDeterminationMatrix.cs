using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.AssetCriticality.Entities
{
    public class RiskDeterminationMatrix
    {
        public int Id { get; set; }
        public string FailureFrequency { get; set; }
        public string Minor { get; set; }
        public string Medium { get; set; }
        public string Serious { get; set; }
        public string Major { get; set; }
        public string Catastrophic { get; set; }

    }
}
