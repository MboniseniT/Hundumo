using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class BearingRepository : CrudRepository<Bearing>
    {
        public BearingRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
