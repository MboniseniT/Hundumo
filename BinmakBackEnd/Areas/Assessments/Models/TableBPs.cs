using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Models
{
    public class TableBPs
    {
        public int BpID { get; set; }
        public int BpKpaID { get; set; }
        public string BpKpa { get; set; }
        public string BpName { get; set; }
        public string BpDescription { get; set; }
        public string LastEdittedBy { get; set; }
    }
}
