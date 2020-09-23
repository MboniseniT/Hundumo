using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class SizeCategoryController : GenericController<SizeCategory, int>
    {
        public SizeCategoryController(BinmakDbContext context) : base(context)
        {
        }
    }
}