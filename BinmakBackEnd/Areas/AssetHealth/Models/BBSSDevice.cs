using System;

namespace BinmakBackEnd.Areas.AssetHealth.Models
{
    public class BBSSDevice
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DeviceId { get; set; }
        public int BinmakTechnologyId { get; set; }
        public int ApplicationId { get; set; }
        public string FirmwareVersion { get; set; }
        public string HardwareVersion { get; set; }
        public DateTime ReleaseDate { get; set; }

        public virtual BinmakTechnology BinmakTechnology { get; set; }
        public virtual Application Application { get; set; }
    }
}
