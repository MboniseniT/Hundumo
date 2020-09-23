using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class BpKpiAssessmentAvgs
    {
        public int ID { get; set; }
        public int assess_id { get; set; }
        public int bp_avg { get; set; }
        public int kpi_avg { get; set; }
    }
}
