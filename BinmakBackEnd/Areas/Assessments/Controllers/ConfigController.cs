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

        //Levels
        [HttpGet("getLevels")]
        public IActionResult getLevels()
        {
            try
            {
                var lAction = _context.levels.ToList();
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

        [HttpGet("getLevelByID")]
        public IActionResult GetLevelById(int id)
        {
            try
            {
                var lAction = _context.levels.FirstOrDefault(a => a.ID == id);

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The Level with ID = " + id + " not found!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("addLevel")]
        public IActionResult AddLevel([FromBody] Levels Level)
        {
            try
            {
                _context.levels.Add(Level);
                _context.SaveChanges();

                var message = Created("", Level);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpDelete("deleteLevel")]
        public IActionResult DeleteLevel(int id)
        {
            try
            {
                var lAction = _context.levels.FirstOrDefault(a => a.ID == id);
                if (lAction == null)
                {
                    return NotFound("The Level with ID = " + id + " not found to delete!");
                }
                else
                {
                    _context.levels.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editLevel")]
        public IActionResult EditLevel([FromBody] Levels Level)
        {
            try
            {
                var lAction = _context.levels.FirstOrDefault(a => a.ID == Level.ID);
                if (lAction == null)
                {
                    return NotFound("The Level with ID = " + Level.ID + " not found to update!");
                }
                else
                {
                    lAction.name = Level.name;
                    _context.SaveChanges();
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        //Characteristics
        [HttpGet("getCharacteristics")]
        public IActionResult GetAllCharacteristics()
        {
            try
            {
                var lAction = _context.characteristics.ToList();
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

        [HttpPost("getKPALevelChars")]
        public IActionResult GetKPALevelChars([FromBody] KPALevel kpaLevel)
        {
            try
            {
                var lAction = _context.characteristics.Where(a => a.kpa_id == kpaLevel.kpaID && a.level_id == kpaLevel.LevelID).ToList();

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The kpaLevel Characteristic with kpaID = " + kpaLevel.kpaID + " and levelID = "+ kpaLevel.LevelID +" not found!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("getRunKPALevelChars")]
        public IActionResult GetRunKPALevelChars([FromBody] RunChars idSet)
        {
            try
            {
                var lAction = _context.characteristics.Where(r => r.kpa_id == idSet.kpaID && r.level_id == idSet.levelID && r.frmwrk_id == idSet.frmwrk && r.version_id == idSet.version && r.variant_id == idSet.variant).ToList();

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The Characteristics not found!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("addChar")]
        public IActionResult AddChar([FromBody] Characteristics Char)
        {
            try
            {
                _context.characteristics.Add(Char);
                _context.SaveChanges();

                var message = Created("", Char);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("deleteChar")]
        public IActionResult DeleteChar([FromBody] Characteristics Char)
        {
            try
            {
                var lAction = _context.characteristics.FirstOrDefault(a => a.ID == Char.ID);
                if (lAction == null)
                {
                    return NotFound("The characteristic with ID = " + Char.ID + " not found to delete!");
                }
                else
                {
                    _context.characteristics.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editChar")]
        public IActionResult EditChar([FromBody] Characteristics Char)
        {
            try
            {
                var lAction = _context.characteristics.FirstOrDefault(a => a.ID == Char.ID);
                if (lAction == null)
                {
                    return NotFound("The characteristic with ID = " + Char.ID + " not found to update!");
                }
                else
                {
                    lAction.description = Char.description;
                    lAction.frmwrk_id = Char.frmwrk_id;
                    lAction.user_id = Char.user_id;
                    lAction.variant_id = Char.variant_id;
                    lAction.version_id = Char.version_id;
                    _context.SaveChanges();
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        //Frameworks
        [HttpGet("getFrameworks")]
        public IActionResult GetFrameworks()
        {
            try
            {
                var lAction = _context.frmwrks.ToList();
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

        //Versions
        [HttpGet("getVersions")]
        public IActionResult GetVersions()
        {
            try
            {
                var lAction = _context.versions.ToList();
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

        //Variants
        [HttpGet("getVariants")]
        public IActionResult GetVariants()
        {
            try
            {
                var lAction = _context.variants.ToList();
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

        //Variants
        [HttpGet("getAssestNodes")]
        public IActionResult GetAssetNodes()
        {
            try
            {
                //May need to use the reference to narrow down the list
                var lAction = _context.AssetNodes.Where(a => a.AssetNodeTypeId == 1 || a.AssetNodeTypeId == 2).ToList();
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

        //Assessments
        [HttpGet("getAssessments")]
        public IActionResult GetAllAssessments()
        {
            try
            {
                //May need to use the reference parameter to narrow down the list
                var lAction = _context.assessments.ToList();
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

        [HttpPost("getAssessmentById")]
        public IActionResult GetAssessmentById([FromBody] Assessment Assess)
        {
            try
            {
                var lAction = _context.assessments.FirstOrDefault(a => a.ID == Assess.ID);

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The Assessment with ID = " + Assess.ID + " not found!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("addAssessment")]
        public IActionResult AddAssessment([FromBody] Assessment Assess)
        {
            try
            {
                //may need to add a reference parameter similar to the one used in assetNodes
                var lAction = _context.AssetNodes.FirstOrDefault(a => a.AssetNodeId == Assess.assetNodeId);
                if (lAction != null)
                {
                    //return Ok(lAction);
                    Assess.assess_name = lAction.Name + "_" + Assess.assess_date;
                    _context.assessments.Add(Assess);
                    _context.SaveChanges();

                    var message = Created("", Assess);
                    return message;
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

        [HttpPost("deleteAssessment")]
        public IActionResult DeleteAssessment([FromBody] Assessment Assess)
        {
            try
            {
                var lAction = _context.assessments.FirstOrDefault(a => a.ID == Assess.ID);
                if (lAction == null)
                {
                    return NotFound("The Assessment with ID = " + Assess.ID + " not found to delete!");
                }
                else
                {
                    _context.assessments.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("clearAssessment")]
        public IActionResult ClearAssessment([FromBody] Assessment Assess)
        {
            try
            {
                var lAction = _context.results.Where(a => a.assess_id == Assess.ID).ToList();
                if (lAction == null)
                {
                    return NotFound("The Assessment with ID = " + Assess.ID + " not found to clear!");
                }
                else
                {
                    _context.results.RemoveRange(lAction);
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
