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

        //KPAs
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

        //KPIs
        [HttpGet("getKPIs")]
        public IActionResult GetKPIs()
        {
            try
            {
                var tableKpis = _context.kpis.ToList();
                /*List<Kpis> KPIs = _context.kpis.ToList();
                var tableKpis = KPIs.Select(result => new
                {
                    KpiID = result.ID,
                    KpiFrmwrk = result.frmwrk_id,
                    KpiVersion = result.version_id,
                    KpiVariant = result.variant_id,
                    KpiKpaID = result.kpa_id,
                    KpiKpa = _context.kpas.FirstOrDefault(a => a.ID == result.kpa_id).name,
                    KpiName = result.name,
                    KpiDescription = result.description,
                    KpiGuideline = result.guideline,
                    KpiInnocence = result.innocence,
                    KpiAwareness = result.awareness,
                    KpiUnderstanding = result.understanding,
                    KpiCompetence = result.competence,
                    KpiExcellence = result.excellence,
                    LastEdittedBy = _context.Users.FirstOrDefault(id => id.Id == result.user_id).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.user_id).LastName
                });*/
                return Ok(tableKpis);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("addKPIs")]
        public IActionResult AddKPIs([FromBody] Kpis KPI)
        {
            try
            {
                _context.kpis.Add(KPI);
                _context.SaveChanges();

                var message = Created("", KPI);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("deleteKPI")]
        public IActionResult DeleteKPI([FromBody] Kpis KPI)
        {
            try
            {
                var lAction = _context.kpis.FirstOrDefault(a => a.ID == KPI.ID);
                if (lAction == null)
                {
                    return NotFound("The KPI with ID = " + KPI.ID + " not found to delete!");
                }
                else
                {
                    _context.kpis.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editKPIs")]
        public IActionResult EditKPIs([FromBody] Kpis KPI)
        {
            try
            {
                var lAction = _context.kpis.FirstOrDefault(a => a.ID == KPI.ID);
                if (lAction == null)
                {
                    return NotFound("The KPI with ID = " + KPI.ID + " not found to update!");
                }
                else
                {
                    lAction.frmwrk_id = KPI.frmwrk_id;
                    lAction.version_id = KPI.version_id;
                    lAction.variant_id = KPI.variant_id;
                    lAction.kpa_id = KPI.kpa_id;
                    lAction.name = KPI.name;
                    lAction.description = KPI.description;
                    lAction.guideline = KPI.guideline;
                    lAction.innocence = KPI.innocence;
                    lAction.awareness = KPI.awareness;
                    lAction.understanding = KPI.understanding;
                    lAction.competence = KPI.competence;
                    lAction.excellence = KPI.excellence;
                    lAction.user_id = KPI.user_id;
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

        [HttpPost("getSectionNodes")]
        public IActionResult GetSectionNodes([FromBody] SectionNodesIdSet SNIdSet)
        {
            try
            {
                //May need to use the reference to narrow down the list
                var lAction = _context.AssetNodes.Where(a => (a.Reference == SNIdSet.reference) && (a.AssetNodeTypeId == 1 || a.AssetNodeTypeId == 2) && (a.ParentAssetNodeId == SNIdSet.ParentAssetNodeId)).ToList(); //a.AssetNodeTypeId == 1 || a.AssetNodeTypeId == 2 && 
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

        [HttpPost("deleteAssessment")]

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
        
        [HttpPost("addExecAssessmentUser")]
        public IActionResult AddExecAssessmentUser([FromBody] AssessmentUsers AssessUser)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(a => a.Id == AssessUser.user_id);
                var assessment = _context.assessments.FirstOrDefault(a => a.ID == AssessUser.assess_id);
                if (user != null && assessment != null)
                {
                    AssessUser.link_name = assessment.assess_name + "-" + user.FirstName + " " + user.LastName;
                    AssessUser.type = 1;
                    AssessUser.isSaved = 0;
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
                    AssessUser.type = 2;
                    AssessUser.isSaved = 0;
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

        [HttpPost("getExecAssessmentUsers")]
        public IActionResult GetExecAssessmentUsers([FromBody] Reference Ref)
        {
            try
            {
                //May need to use the reference parameter to narrow down the list
                List<AssessmentUsers> assessUsers = _context.assessmentUsers.Where(a => a.reference == Ref.reference && a.type == 1).ToList();
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

        [HttpPost("getAssessmentUsers")]
        public IActionResult GetAssessmentUsers([FromBody] Reference Ref)
        {
            try
            {
                //May need to use the reference parameter to narrow down the list
                List<AssessmentUsers> assessUsers = _context.assessmentUsers.Where(a => a.reference == Ref.reference && a.type == 2).ToList();
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

        [HttpPost("getExecAssessmentUsersForSelection")]
        public IActionResult GetExecAssessmentUsersForSelection([FromBody] Reference userID)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == userID.reference);
                //May need to use the reference parameter to narrow down the list
                List<AssessmentUsers> assessUsers = _context.assessmentUsers.Where(a => a.reference == user.Reference && a.user_id == userID.reference && a.type == 1).ToList();
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
                List<AssessmentUsers> assessUsers = _context.assessmentUsers.Where(a => a.reference == user.Reference && a.user_id == userID.reference && a.type == 2).ToList();
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

        [HttpPost("getSections")]
        public IActionResult GetSections([FromBody] Reference Assess)
        {
            try
            {
                //var assessSects = _context.assessmentSections.FirstOrDefault(a => a.assess_id == int.Parse(Assess.reference));
                List<AssessmentSections> assessSects = _context.assessmentSections.Where(a => a.assess_id == int.Parse(Assess.reference)).ToList();
                var assessmentSects = assessSects.Select(result => new
                {
                    SectionsId = result.ID,
                    section1 = ConvertSection(result.sect_1),
                    section2 = ConvertSection(result.sect_2),
                    section3 = ConvertSection(result.sect_3),
                    section4 = ConvertSection(result.sect_4),
                    section5 = ConvertSection(result.sect_5),
                    section6 = ConvertSection(result.sect_6),
                });

                return Ok(assessmentSects);

                /*if (assessSects != null)
                {
                    return Ok(assessSects);
                }
                else
                {
                    return NotFound("The AssessmentSection with ID = " + Assess.reference + " not found!");
                }*/
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("addSections")]
        public IActionResult AddSections([FromBody] AssessmentSections AssessSect)
        {
            try
            {
                _context.assessmentSections.Add(AssessSect);
                _context.SaveChanges();

                var message = Created("", AssessSect);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        //Consensus Results
        [HttpPost("addkpiResults")]
        public IActionResult AddKpiResults([FromBody] KpiResults Result)
        {
            try
            {
                _context.kpiResults.Add(Result);
                _context.SaveChanges();

                var message = Created("", Result);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("getkpiResults")]
        public IActionResult GetkpiResults([FromBody] KpiResultIdSet IdSet)
        {
            try
            {
                var lAction = _context.kpiResults.Where(a => a.assess_id == IdSet.assess_id).ToList();

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPost("getkpiResultById")]
        public IActionResult GetkpiResultById([FromBody] KpiResultIdSet IdSet)
        {
            try
            {
                var lAction = _context.kpiResults.FirstOrDefault(a => a.kpi_id == IdSet.kpi_id && a.assess_id == IdSet.assess_id);

                if (lAction != null)
                {
                    return Ok(lAction);
                }
                else
                {
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }

        [HttpPut("updateKpiResults")]
        public IActionResult UpdateKpiResults([FromBody] KpiResults Result)
        {
            try
            {
                var lAction = _context.kpiResults.FirstOrDefault(a => a.ID == Result.ID);
                if (lAction == null)
                {
                    return NotFound("The Result with ID = " + Result.ID + " not found to update!");
                }
                else
                {
                    lAction.sect_1 = Result.sect_1;
                    lAction.sect_2 = Result.sect_2;
                    lAction.sect_3 = Result.sect_3;
                    lAction.sect_4 = Result.sect_4;
                    lAction.sect_5 = Result.sect_5;
                    lAction.sect_6 = Result.sect_6;
                    _context.SaveChanges();
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }


        //Helper Methods
        string ConvertSection(Nullable<int> AssetNodeId)
        {
            if(AssetNodeId != null)
            {
                return _context.AssetNodes.FirstOrDefault(a => a.AssetNodeId == AssetNodeId).Name;
            }
            else
            {
                return "";
            }
        }
    }
}
