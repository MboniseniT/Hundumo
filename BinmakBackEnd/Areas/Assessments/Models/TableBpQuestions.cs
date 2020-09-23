using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Models
{
    public class TableBpQuestions
    {
        public int qstnID { get; set; }
        public int qstnKpaID { get; set; }
        public string qstnKpaName { get; set; }
        public int qstnBpID { get; set; }
        public string qstnBpName { get; set; }
        public int qstnFrmwrkID { get; set; }
        public int qstnVersionID { get; set; }
        public int qstnVariantID { get; set; }
        public string qstnQuestion { get; set; }
        public string qstnDescription { get; set; }
        public string lastEdittedBy { get; set; }
    }
}
