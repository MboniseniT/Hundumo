using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class AssessmentUsers
    {
        public int ID { get; set; }
        public string user_id { get; set; }
        public int assess_id { get; set; }
        public string reference { get; set; }
        public string link_name { get; set; }
        public Nullable<int> isSaved { get; set; }
        public Nullable<int> type { get; set; }
    }
}
