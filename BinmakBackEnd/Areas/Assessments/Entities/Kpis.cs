using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class Kpis
    {
        public int ID { get; set; }
        public int frmwrk_id { get; set; }
        public int version_id { get; set; }
        public int variant_id { get; set; }
        public int kpa_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string guideline { get; set; }
        public string innocence { get; set; }
        public string awareness { get; set; }
        public string understanding { get; set; }
        public string competence { get; set; }
        public string excellence { get; set; }
        public string user_id { get; set; }
    }
}
