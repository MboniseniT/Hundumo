using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Assessments.Entities
{
    public class Assessment
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string assess_name { get; set; }
        public string assess_date { get; set; }
        public int assetNodeId { get; set; }
        public int version_id { get; set; }
        public int variant_id { get; set; }
        public int frmwrk_id { get; set; }
        public string user_id { get; set; }
        public string kpa1 { get; set; }
        public string kpa2 { get; set; }
        public string kpa3 { get; set; }
        public string kpa4 { get; set; }
        public string kpa5 { get; set; }
        public string kpa6 { get; set; }
        public string kpa7 { get; set; }
        public string kpa8 { get; set; }
        public string kpa9 { get; set; }
        public string kpa10 { get; set; }
        public string kpa11 { get; set; }
        public string kpa12 { get; set; }
        public string kpa13 { get; set; }
        public string kpa14 { get; set; }
        public string kpa15 { get; set; }
        public string kpa16 { get; set; }
        public string kpa17 { get; set; }
        public Nullable<int> isSaved { get; set; }
    }
}
