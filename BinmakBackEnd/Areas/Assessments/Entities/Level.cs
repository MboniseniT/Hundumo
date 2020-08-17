using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class Level
    {
        public int ID { get; set; }
        public string name { get; set; }
        public Nullable<int> user_id { get; set; }
    }
}
