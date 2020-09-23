using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class InsulationLevelRepository : CrudRepository<InsulationLevel>
    {
        public InsulationLevelRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
