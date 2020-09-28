using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Models
{
    public class RunResults
    {
        public int kpaID { get; set; }
        public int levelID { get; set; }
        public int assessID { get; set; }
        public string userID { get; set; }
    }
}
