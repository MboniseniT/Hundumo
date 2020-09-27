using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MachineController : GenericController<Machine, int>
    {
        private IWebHostEnvironment _hostingEnvironment;
        private readonly BinmakDbContext _context;
        public MachineController(BinmakDbContext context, IWebHostEnvironment environment) : base(context)
        {
            _context = context;
            _hostingEnvironment = environment;
        }

        [HttpGet("device/{id}")]
        public IActionResult GetbyDeviceId([FromRoute]string id)
        {
            var data = new MachineRepository(_context).FindByDeviceId(id);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }

        [HttpGet("sensor/{id}")]
        public IActionResult GetbySensorConditionId([FromRoute]int id, [FromQuery]Pagination pagination)
        {
            var data = new MachineRepository(_context).FindBySensorConditionId(id, pagination);
            if (data == null) return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            return Ok(data);
        }

        [ProducesResponseType(typeof(Exception), StatusCodes.Status403Forbidden)]
        [HttpPost]
        public override IActionResult Post([FromBody] Machine value)
        {
            try
            {
                //string filePath = _hostingEnvironment.WebRootPath + "//images";
                //var bytes = Convert.FromBase64String(value.ImageUrl);
                //using (var imageFile = new FileStream(filePath, FileMode.Create))
                //{
                //    imageFile.Write(bytes, 0, bytes.Length);
                //    imageFile.Flush();    
                //    value.ImageUrl = "//images" + imageFile.Name;
                //}
                return Ok(new Result<Machine>(true, "Saved successfully", new MachineRepository(_context).Add(value)));
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden, exception);
            }
        }

        [ProducesResponseType(typeof(Exception), StatusCodes.Status403Forbidden)]
        [HttpPut("{id}")]
        public override IActionResult Put([FromRoute]int id, [FromBody]Machine value)
        {
            try
            {
                //string filePath = _hostingEnvironment.ContentRootPath + "\\images";
                //var bytes = Convert.FromBase64String(value.ImageUrl.Replace("data:image/jpeg;base64,",""));
                //using (var imageFile = new FileStream(filePath, FileMode.Create))
                //{
                //    imageFile.Write(bytes, 0, bytes.Length);
                //    imageFile .Flush();
                //    value.ImageUrl = "//images" + imageFile.Name;
                //}
                return Ok(new Result<Machine>(true, "Updated successfully", new MachineRepository(_context).Update(id, value)));
               
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden, exception);
            }
        }
    }
}