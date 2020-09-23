using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class SizeCategoryRepository : CrudRepository<SizeCategory>
    {
        public SizeCategoryRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
