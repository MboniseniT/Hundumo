using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class AssessmentsActionManager
    {
        public int ID { get; set; }
        public int assess_id { get; set; }
        public int sect_id { get; set; }
        public int bpQuestion_id { get; set; }
        public string action { get; set; }
        public string biz_impact { get; set; }
        public string ease_of_imp { get; set; }
        public string cost_of_imp { get; set; }
        public string time_to_imp { get; set; }
        public string priority { get; set; }
        public string responsible_person { get; set; }
        public string target_date { get; set; }
        public string status { get; set; }
    }
}
