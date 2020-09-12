using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class ApplicationRepository : CrudRepository<Application>
    {
        public ApplicationRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
