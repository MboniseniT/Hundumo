using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class SensorDataRepository : CrudRepository<SensorData>
    {
        public SensorDataRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
