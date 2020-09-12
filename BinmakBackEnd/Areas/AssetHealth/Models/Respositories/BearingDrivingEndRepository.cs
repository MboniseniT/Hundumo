using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class BearingDrivingEndRepository : CrudRepository<BearingDrivingEnd>
    {
        public BearingDrivingEndRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
