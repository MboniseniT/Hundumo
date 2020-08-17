using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.ProductionFlow.Entities
{
    public class FunctionUnit
    {
        public int FunctionUnitId { get; set; }
        public string FunctionUnitName { get; set; }
        public int AssetId { get; set; }
        public int ClientAssetNameId { get; set; }
    }
}
