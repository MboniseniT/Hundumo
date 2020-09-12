using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class MachineLoadRepository : CrudRepository<MachineLoad>
    {
        public MachineLoadRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
