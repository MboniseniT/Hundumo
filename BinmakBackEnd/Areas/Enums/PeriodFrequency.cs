namespace BinmakBackEnd.Areas.Enums
{
    public enum PeriodFrequency
    {
        [EnumDescription("Hourly")]
        Hourly = 1,
        [EnumDescription("Daily")]
        Daily = 24,
        [EnumDescription("Weekly")]
        Weekly = 168,
        [EnumDescription("Monthly")]
        Monthly = 5040,
    }
}
