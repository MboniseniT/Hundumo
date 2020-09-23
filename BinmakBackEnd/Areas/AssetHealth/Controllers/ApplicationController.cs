using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class ApplicationController : GenericController<Application, int>
    {
        public ApplicationController(BinmakDbContext context) : base(context)
        {
        }
    }
}