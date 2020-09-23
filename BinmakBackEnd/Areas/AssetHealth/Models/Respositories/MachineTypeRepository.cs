using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class MachineTypeRepository : CrudRepository<MachineType>
    {
        public MachineTypeRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}

