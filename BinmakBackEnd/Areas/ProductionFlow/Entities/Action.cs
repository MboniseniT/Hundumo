using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.ProductionFlow.Entities
{
    public class Action
    {
        public int ActionId { get; set; }
        public string ActionName { get; set; }
        public int AssetId { get; set; }
        public int ActionIndex { get; set; }
        public string Reference { get; set; }
        public DateTime DateStamp { get; set; }
        public DateTime DateProduction { get; set; }
    }
}
