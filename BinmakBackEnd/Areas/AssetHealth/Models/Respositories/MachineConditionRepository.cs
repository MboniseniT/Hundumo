using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class MachineConditionRepository : CrudRepository<MachineCondition>
    {
        public MachineConditionRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
