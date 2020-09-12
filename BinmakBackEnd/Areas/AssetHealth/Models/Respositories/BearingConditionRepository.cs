using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class BearingConditionRepository : CrudRepository<BearingCondition>
    {
        public BearingConditionRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
