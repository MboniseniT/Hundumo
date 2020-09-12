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

                var message = Created("", KPA);
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

        //Run Results
        [HttpPost("getCurrentUserResults")]
        public IActionResult GetCurrentUserResults([FromBody] RunResults idSet)
        {
            try
            {
                var lAction = _context.results.Where(r => r.kpa_id == idSet.kpaID && r.level_id == idSet.levelID && r.assess_id == idSet.assessID && r.user_id == idSet.userID).ToList();

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The Results not found!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("getAllUserResults")]
        public IActionResult GetAllUserResults([FromBody] RunResults idSet)
        {
            try
            {
                var lAction = _context.results.Where(r => r.kpa_id == idSet.kpaID && r.level_id == idSet.levelID && r.assess_id == idSet.assessID).ToList();

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The Results not found!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("addResult")]
        public IActionResult AddResult([FromBody] Results Result)
        {
            try
            {
                _context.results.Add(Result);
                _context.SaveChanges();

                var message = Created("", Result);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editResult")]
        public IActionResult editResult([FromBody] Results Result)
        {
            try
            {
                var lAction = _context.results.FirstOrDefault(a => a.ID == Result.ID);
                if (lAction == null)
                {
                    return NotFound("The Result with ID = " + Result.ID + " not found to update!");
                }
                else
                {
                    lAction.value = Result.value;
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

        //Asset Nodes
        [HttpPost("getAssestNodes")]
        public IActionResult GetAssetNodes([FromBody] Reference Ref)
        {
            try
            {
                //May need to use the reference to narrow down the list
                var lAction = _context.AssetNodes.Where(a => (a.Reference == Ref.reference) && (a.AssetNodeTypeId == 1 || a.AssetNodeTypeId == 2)).ToList(); //a.AssetNodeTypeId == 1 || a.AssetNodeTypeId == 2 && 
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
        [HttpPost("getAssessments")]
        public IActionResult GetAllAssessments([FromBody] Reference Ref)
        {
            try
            {
                //May need to use the reference parameter to narrow down the list
                var lAction = _context.assessments.Where(a => a.user_id == Ref.reference).ToList();
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
        public IActionResult GetAssessmentById([FromBody] Reference Assess)
        {
            try
            {
                var lAction = _context.assessments.FirstOrDefault(a => a.ID == int.Parse(Assess.reference));

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return NotFound("The Assessment with ID = " + Assess.reference + " not found!");
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


        [HttpPut("saveAssessment")]
        public IActionResult SaveAssessment([FromBody] SaveAssessIdSet idSet)
        {
            try
            {
                var lAction = _context.assessmentUsers.FirstOrDefault(a => a.assess_id == idSet.assessID && a.user_id == idSet.userID);
                if (lAction == null)
                {
                    return NotFound("Only the user assigned to this Assessment can Save it!");
                }
                else
                {
                    lAction.isSaved = 1;
                    _context.SaveChanges();
                    return Ok(lAction);
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
        
        [HttpPost("addAssessmentUser")]
        public IActionResult AddAssessmentUser([FromBody] AssessmentUsers AssessUser)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(a => a.Id == AssessUser.user_id);
                var assessment = _context.assessments.FirstOrDefault(a => a.ID == AssessUser.assess_id);
                if (user != null && assessment != null)
                {
                    AssessUser.link_name = assessment.assess_name + "-" + user.FirstName + " " + user.LastName;
                    _context.assessmentUsers.Add(AssessUser);
                    _context.SaveChanges();

                    var message = Created("", AssessUser);
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

        [HttpPost("getAssessmentUsers")]
        public IActionResult GetAssessmentUsers([FromBody] Reference Ref)
        {
            try
            {
                //May need to use the reference parameter to narrow down the list
                List<AssessmentUsers> assessUsers = _context.assessmentUsers.Where(a => a.reference == Ref.reference).ToList();
                var assessmentUsers = assessUsers.Select(result => new
                {
                    AssessUserId = result.ID,
                    AssessmentId = result.assess_id,
                    AssessmentIsSaved = result.isSaved,
                    AssessmentName = _context.assessments.FirstOrDefault(id => id.ID == result.assess_id).assess_name,
                    UserEmail = _context.Users.FirstOrDefault(id => id.Id == result.user_id).Email,
                    UserNames = _context.Users.FirstOrDefault(id => id.Id == result.user_id).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.user_id).LastName,
                    Reference = _context.Users.FirstOrDefault(id => id.Id == result.reference).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.reference).LastName,
                });

                return Ok(assessmentUsers);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("getAssessmentUsersForSelection")]
        public IActionResult GetAssessmentUsersForSelection([FromBody] Reference userID)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == userID.reference);
                //May need to use the reference parameter to narrow down the list
                List<AssessmentUsers> assessUsers = _context.assessmentUsers.Where(a => a.reference == user.Reference).ToList();
                var assessmentUsers = assessUsers.Select(result => new
                {
                    AssessUserId = result.ID,
                    AssessmentId = result.assess_id,
                    AssessmentName = _context.assessments.FirstOrDefault(id => id.ID == result.assess_id).assess_name,
                    UserEmail = _context.Users.FirstOrDefault(id => id.Id == result.user_id).Email,
                    UserNames = _context.Users.FirstOrDefault(id => id.Id == result.user_id).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.user_id).LastName,
                    Reference = _context.Users.FirstOrDefault(id => id.Id == result.reference).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.reference).LastName,
                });

                return Ok(assessmentUsers);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("deleteAssessmentUser")]
        public IActionResult DeleteAssessmentUser([FromBody] TableAssessUser AssessUser)
        {
            try
            {
                var lAction = _context.assessmentUsers.FirstOrDefault(a => a.ID == AssessUser.assessUserId);
                if (lAction == null)
                {
                    return NotFound("The assessUser with ID = " + AssessUser.assessUserId + " not found to delete!");
                }
                else
                {
                    _context.assessmentUsers.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }
    }
}
