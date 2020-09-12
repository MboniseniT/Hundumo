using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class BearingNonDrivingEndRepository : CrudRepository<BearingNonDrivingEnd>
    {
        public BearingNonDrivingEndRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
