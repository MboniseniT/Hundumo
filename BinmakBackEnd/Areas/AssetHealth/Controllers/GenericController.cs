using System;
using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GenericController<T, Tkey> : ControllerBase where T : class
                                                             where Tkey : struct
    {
        private readonly BinmakDbContext _context;
        public GenericController(BinmakDbContext context) => _context = context;

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        public IActionResult Get([FromQuery]Pagination pagination)
        {
            var data = new Pageable<T>(new CrudRepository<T>(_context).Find(),pagination.Page,pagination.Size);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public virtual IActionResult Get([FromRoute]Tkey id)
        {
            var data = new CrudRepository<T>(_context).Find(id);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }

        [ProducesResponseType(typeof(Exception), StatusCodes.Status403Forbidden)]
        [HttpPost]
        public virtual IActionResult Post([FromBody] T value)
        {
            try
            {
                return Ok(new Result<T>(true, "Saved successfully", new CrudRepository<T>(_context).Add(value)));
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden, exception);
            }
        }

        [ProducesResponseType(typeof(Exception), StatusCodes.Status403Forbidden)]
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute]Tkey id)
        {
            try
            {
                new CrudRepository<T>(_context).Delete(id);
                return Ok(new Result<T>(true, "Deleted successfully"));
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden, exception);
            }
        }

        [ProducesResponseType(typeof(Exception), StatusCodes.Status403Forbidden)]
        [HttpPut("{id}")]
        public virtual IActionResult Put([FromRoute]Tkey id, [FromBody] T value)
        {
            try
            {
                return Ok(new Result<T>(true, "Updated successfully", new CrudRepository<T>(_context).Update(id, value)));
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden, exception);
            }
        }
    }
}