using System;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class SearchMachineRequest
    {
        public int MachineId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
