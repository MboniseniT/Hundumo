using DocumentFormat.OpenXml.Office2010.ExcelAc;
using System.Collections.Generic;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class WaterfallSeries
    {
        public string Name { get; set; } = "";
        public int lineWidth { get; set; } = 2;
        public List<double[]> Data { get; set; } = new List<double[]>();
    }
}
