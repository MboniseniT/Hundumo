using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Models
{
    public class kpa
    {
        public class Kpas
        {
            public int ID { get; set; }
            public string name { get; set; }
            public string description { get; set; }
            public Nullable<int> user_id { get; set; }
        }
    }
}
