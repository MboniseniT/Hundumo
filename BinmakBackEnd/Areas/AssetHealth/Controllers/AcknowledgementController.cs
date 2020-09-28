using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]

    public class AcknowledgementController : GenericController<Acknowledgement, int>
    {
        public readonly BinmakDbContext _context;
        public AcknowledgementController(BinmakDbContext context) : base(context) => _context = context;

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("including")]
        public IActionResult GetIncluding([FromQuery]Pagination pagination)
        {
            var data = new Pageable<Acknowledgement>(new AcknowledgementRepository(_context).FindIncluding(), pagination.Page, pagination.Size);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("including/{id}")]
        public virtual IActionResult GetIncludingById([FromRoute]int id)
        {
            var data = new AcknowledgementRepository(_context).FindById(id);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }
    }
}