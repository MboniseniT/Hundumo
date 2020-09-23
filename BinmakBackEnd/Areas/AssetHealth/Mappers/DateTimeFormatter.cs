using System;

namespace BinmakBackEnd.Areas.AssetHealth.Mappers
{
    public static class DateTimeFormatter
    {
        public static DateTime UnixTimeStampToDateTime(this double unixTimeStamp)
        {
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime().AddHours(-2);
            return dtDateTime;
        }
    }
}
