﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Areas.Kwenza.Models
{
    public class MasterChart
    {
        public int KPAId { get; set; }
        public string KPAName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ControlLimit ControlLimit { get; set; }
        public Histogram Histogram { get; set; }
        public PlotBox PlotBox { get; set; }
    }
}
