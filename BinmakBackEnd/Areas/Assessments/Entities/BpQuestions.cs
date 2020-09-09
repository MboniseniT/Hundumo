using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class BpQuestions
    {
        public int ID { get; set; }
        public int bp_id { get; set; }
        public int frmwrk_id { get; set; }
        public int version_id { get; set; }
        public int variant_id { get; set; }
        public string question { get; set; }
        public string description { get; set; }
        public string user_id { get; set; }
    }
}
