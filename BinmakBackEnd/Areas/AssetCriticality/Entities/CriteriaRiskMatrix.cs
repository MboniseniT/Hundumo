using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.AssetCriticality.Entities
{
    public class CriteriaRiskMatrix
    {
        public int Id { get; set; }
        public string ConsequenceImpact { get; set; }
        public string LikelihoodRanking { get; set; }
    }
}
