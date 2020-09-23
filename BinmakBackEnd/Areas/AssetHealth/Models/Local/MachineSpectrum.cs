namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class MachineSpectrum
    {
        public double[]? Xfft { get; set; }
        public int RevolutionPerMinute { get; set; }

        public double[]? Yfft { get; set; }

        public double[]? Zfft { get; set; }

        public double[]? ModFreq { get; set; }
    }
}
