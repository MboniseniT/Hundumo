using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class Result
    {
        public int ID { get; set; }
        public int characteristic_id { get; set; }
        public string assess_id { get; set; }
        public Nullable<int> user_id { get; set; }
        public Nullable<int> kpa_id { get; set; }
        public Nullable<int> level_id { get; set; }
        public int value { get; set; }
    }
}
