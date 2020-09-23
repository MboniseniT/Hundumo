using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class Bps
    {
        public int ID { get; set; }
        public int kpa_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string user_id { get; set; }
    }
}
