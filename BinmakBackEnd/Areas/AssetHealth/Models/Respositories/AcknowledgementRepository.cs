using BinmakAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class AcknowledgementRepository : CrudRepository<Acknowledgement>
    {
        public readonly BinmakDbContext _context;
        public AcknowledgementRepository(BinmakDbContext context) : base(context) => _context = context;

        public Acknowledgement FindById(int id) => _context.Acknowledgements.Include(a => a.User).Include(a => a.Condition).Include(a => a.Machine).FirstOrDefault(a => a.Id == id);

        public IEnumerable<Acknowledgement> FindIncluding() => _context.Acknowledgements.Include(a => a.User).Include(a => a.Condition).Include(a => a.Machine);
    }
}
