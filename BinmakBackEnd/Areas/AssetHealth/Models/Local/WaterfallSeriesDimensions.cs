namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class WaterfallSeriesDimensions
    {
        public WaterfallSeries XWaterfallSeries { get; set; } = new WaterfallSeries();
        public WaterfallSeries YWaterfallSeries { get; set; } = new WaterfallSeries();
        public WaterfallSeries ZWaterfallSeries { get; set; } = new WaterfallSeries();
    }
}
