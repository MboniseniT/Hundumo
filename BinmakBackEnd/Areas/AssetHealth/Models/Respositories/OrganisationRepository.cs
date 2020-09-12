using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class OrganisationRepository : CrudRepository<Organisation>
    {
        public OrganisationRepository(BinmakDbContext context) : base(context)
        {
        }
    }
}
