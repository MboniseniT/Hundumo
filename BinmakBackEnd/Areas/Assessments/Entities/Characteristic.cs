using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class Characteristic
    {
        public int ID { get; set; }
        public int kpa_id { get; set; }
        public int level_id { get; set; }
        public Nullable<int> user_id { get; set; }
        public int frmwrk_id { get; set; }
        public int version_id { get; set; }
        public int variant_id { get; set; }
        public string description { get; set; }
    }
}
