using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Kwenza.Entities
{
    public class FormulaCreation
    {
        public int FormulaCreationId { get; set; }
        public int KeyProcessAreaId { get; set; }
        public string FormulaString { get; set; }
        public string MasterFormularArray { get; set; }
    }
}
