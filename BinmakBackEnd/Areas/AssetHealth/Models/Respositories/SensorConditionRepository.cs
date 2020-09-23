using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class SensorConditionRepository : CrudRepository<SensorCondition>
    {
        public SensorConditionRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
