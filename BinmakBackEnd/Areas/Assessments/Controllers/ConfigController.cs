using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BinmakAPI.Data;
using BinmakBackEnd.Areas.Assessments.Entities;
using BinmakBackEnd.Areas.Assessments.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.Assessments.Controllers
{
    [EnableCors("CorsPolicy")]
    [Area("Assessments")]
    [ApiController]
    [Route("Assessments/[controller]")]
    public class ConfigController : ControllerBase
    {
        private readonly BinmakDbContext _context;

        public ConfigController(BinmakDbContext context)
        {
            _context = context;
        }

        //Exec KPAs
        [HttpGet("getExecKPAs")]
        public IActionResult GetExecKPAs()
        {
            try
            {
                    var lAction = _context.kpas.ToList();
                    if (lAction != null)
                    {
                        return Ok(lAction);
                }
                    else
                    {
                    return NotFound("HTTP resource is currently unavailable!");
                    }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpGet("getExecKPAByID")]
        public IActionResult GetExecKPAByID(int id)
        {
            try
            {
                    var lAction = _context.kpas.FirstOrDefault(a => a.ID == id);

                    if (lAction != null)
                    {
                        return Ok(lAction);
                }
                    else
                    {
                    return NotFound("The KPA with ID = " + id + " not found!");
                    }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("addExecKPAs")]
        public IActionResult AddExecKPA([FromBody] Kpas KPA)
        {
            try
            {
                    _context.kpas.Add(KPA);
                    _context.SaveChanges();

                    var message = Created("",KPA);
                    return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpDelete("deleteExecKPAs")]
        public IActionResult DeleteExecKPA(int id)
        {
            try
            {
                    var lAction = _context.kpas.FirstOrDefault(a => a.ID == id);
                    if (lAction == null)
                    {
                    return NotFound("The KPA with ID = " + id + " not found to delete!");
                    }
                    else
                    {
                    _context.kpas.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editExecKPAs")]
        public IActionResult EditExecKPA([FromBody] Kpas KPA)
        {
            try
            {
                    var lAction = _context.kpas.FirstOrDefault(a => a.ID == KPA.ID);
                    if (lAction == null)
                    {
                    return NotFound("The KPA with ID = " + KPA.ID + " not found to update!");
                    }
                    else
                    {
                    lAction.name = KPA.name;
                    lAction.description = KPA.description;
                    _context.SaveChanges();
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }
    }
}
