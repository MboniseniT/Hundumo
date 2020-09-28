using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Models
{
    public class TableBpResults
    {
        public int resultID { get; set; }
        public int resultKpaID { get; set; }
        public int resultQuestionId { get; set; }
        public int resultAssessId { get; set; }
        public int resultSect1 { get; set; }
        public int resultSect2 { get; set; }
        public int resultSect3 { get; set; }
        public int resultSect4 { get; set; }
        public int resultSect5 { get; set; }
        public int resultSect6 { get; set; }
    }
}
