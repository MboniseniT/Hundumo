using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Models
{
    public class TableAssessUser
    {
        public int assessUserId { get; set; }
        public int assessmentId { get; set; }
        public string assessmentName { get; set; }
        public string reference { get; set; }
        public string userEmail { get; set; }
        public string userNames { get; set; }
    }
}
