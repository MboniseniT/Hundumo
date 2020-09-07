using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class KpiResults
    {
        public int ID { get; set; }
        public int kpa_id { get; set; }
        public int kpi_id { get; set; }
        public int assess_id { get; set; }
        public int sect_1 { get; set; }
        public int sect_2 { get; set; }
        public int sect_3 { get; set; }
        public int sect_4 { get; set; }
        public int sect_5 { get; set; }
        public int sect_6 { get; set; }
        public string user_id { get; set; }
    }
}
