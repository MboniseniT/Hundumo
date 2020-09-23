namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class Spectrum
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("xfft")]
        public double[] Xfft { get; set; }

        [JsonProperty("yfft")]
        public double[] Yfft { get; set; }

        [JsonProperty("zfft")]
        public double[] Zfft { get; set; }

        [JsonProperty("freq")]
        public double[] Freq { get; set; }

        [JsonProperty("temp")]
        public double Temp { get; set; }

        [JsonProperty("samples")]
        public long Samples { get; set; }

        [JsonProperty("ts")]
        public long Ts { get; set; }

        [JsonProperty("ver")]
        public string Ver { get; set; }

        [JsonProperty("xr")]
        public long Xr { get; set; }

        [JsonProperty("yr")]
        public double Yr { get; set; }

        [JsonProperty("zr")]
        public double Zr { get; set; }

        [JsonProperty("or")]
        public long Or { get; set; }

        [JsonProperty("sfx")]
        public double Sfx { get; set; }

        [JsonProperty("sfy")]
        public double Sfy { get; set; }

        [JsonProperty("sfz")]
        public double Sfz { get; set; }

        [JsonProperty("batCap")]
        public long BatCap { get; set; }

        [JsonProperty("batSOC")]
        public long BatSoc { get; set; }

        [JsonProperty("batTTE")]
        public long BatTte { get; set; }

        [JsonProperty("fundFreq")]
        public double FundFreq { get; set; }

        [JsonProperty("modFreq")]
        public double[] ModFreq { get; set; }

        [JsonProperty("isFFT")]
        public bool IsFft { get; set; }

        [JsonProperty("isWaveForm")]
        public bool IsWaveForm { get; set; }
    }

}
