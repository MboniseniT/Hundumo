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

        [HttpPost("getFilteredKPIs")]
        public IActionResult GetKpis([FromBody] Assessment assess)
        {
            try
            {
                var KPIs = GetFilteredKPIs(assess);
                return Ok(KPIs);
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

        //BPs
        [HttpGet("getBPs")]
        public IActionResult GetBPs()
        {
            try
            {
                //var tableKpis = _context.kpis.ToList();
                List<Bps> BPs = _context.bps.ToList();
                var tableBPs = GetTableBPs(BPs);
                return Ok(tableBPs);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("addBp")]
        public IActionResult AddBp([FromBody] Bps BP)
        {
            try
            {
                _context.bps.Add(BP);
                _context.SaveChanges();

                var message = Created("", BP);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editBPs")]
        public IActionResult EditBP([FromBody] Bps BP)
        {
            try
            {
                var lAction = _context.bps.FirstOrDefault(a => a.ID == BP.ID);
                if (lAction == null)
                {
                    return NotFound("The BP with ID = " + BP.ID + " not found to update!");
                }
                else
                {
                    lAction.kpa_id = BP.kpa_id;
                    lAction.name = BP.name;
                    lAction.description = BP.description;
                    lAction.user_id = BP.user_id;
                    _context.SaveChanges();
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("deleteBP")]
        public IActionResult DeleteBP([FromBody] TableBPs BP)
        {
            try
            {
                var lAction = _context.bps.FirstOrDefault(a => a.ID == BP.BpID);
                if (lAction == null)
                {
                    return NotFound("The BP with ID = " + BP.BpID + " not found to delete!");
                }
                else
                {
                    _context.bps.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        //BP Questions
        [HttpGet("getBpQuestions")]
        public IActionResult GetBpQuestions()
        {
            try
            {
                //var tableKpis = _context.kpis.ToList();
                List<BpQuestions> Questions = _context.bpQuestions.ToList();
                var tableBpQuestions = GetTableBPQuestions(Questions);
                return Ok(tableBpQuestions);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }
        [HttpPost("addBPQuestion")]
        public IActionResult AddBPQuestion([FromBody] BpQuestions Question)
        {
            try
            {
                _context.bpQuestions.Add(Question);
                _context.SaveChanges();

                var message = Created("", Question);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editBPQuestion")]
        public IActionResult EditBPQuestion([FromBody] BpQuestions Question)
        {
            try
            {
                var lAction = _context.bpQuestions.FirstOrDefault(a => a.ID == Question.ID);
                if (lAction == null)
                {
                    return NotFound("The Question with ID = " + Question.ID + " not found to update!");
                }
                else
                {
                    lAction.bp_id = Question.bp_id;
                    lAction.frmwrk_id = Question.frmwrk_id;
                    lAction.version_id = Question.version_id;
                    lAction.variant_id = Question.variant_id;
                    lAction.question = Question.question;
                    lAction.description = Question.description;
                    lAction.user_id = Question.user_id;
                    _context.SaveChanges();
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("deleteBPQuestion")]
        public IActionResult DeleteBPQuestion([FromBody] TableBpQuestions Question)
        {
            try
            {
                var lAction = _context.bpQuestions.FirstOrDefault(a => a.ID == Question.qstnID);
                if (lAction == null)
                {
                    return NotFound("The Question with ID = " + Question.qstnID + " not found to delete!");
                }
                else
                {
                    _context.bpQuestions.Remove(lAction);
                    _context.SaveChanges();
                    return Ok();
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
                    return NotFound("The kpaLevel Characteristic with kpaID = " + kpaLevel.kpaID + " and levelID = " + kpaLevel.LevelID + " not found!");
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

        [HttpPost("getKpiProgress")]
        public IActionResult GetKpiProgress([FromBody] Assessment assess)
        {
            try
            {
                List<Assessment> assessment = _context.assessments.Where(a => a.ID == assess.ID).ToList();
                var allKPIResults = _context.kpiResults.Where(a => a.assess_id == assess.ID).ToList();
                var allKPIs = GetFilteredKPIs(assess);
                var progress = assessment.Select(result => new
                {
                    AssessProgress = (allKPIResults.Count * 100) / allKPIs.Count,
                    kpa1Progress = GetKPIsResultsForKPA(assess, 1),
                    kpa2Progress = GetKPIsResultsForKPA(assess, 2),
                    kpa3Progress = GetKPIsResultsForKPA(assess, 3),
                    kpa4Progress = GetKPIsResultsForKPA(assess, 4),
                    kpa5Progress = GetKPIsResultsForKPA(assess, 5),
                    kpa6Progress = GetKPIsResultsForKPA(assess, 6),
                    kpa7Progress = GetKPIsResultsForKPA(assess, 7),
                    kpa8Progress = GetKPIsResultsForKPA(assess, 8),
                    kpa9Progress = GetKPIsResultsForKPA(assess, 9),
                    kpa10Progress = GetKPIsResultsForKPA(assess, 10),
                    kpa11Progress = GetKPIsResultsForKPA(assess, 11),
                    kpa12Progress = GetKPIsResultsForKPA(assess, 12),
                    kpa13Progress = GetKPIsResultsForKPA(assess, 13),
                    kpa14Progress = GetKPIsResultsForKPA(assess, 14),
                    kpa15Progress = GetKPIsResultsForKPA(assess, 15),
                    kpa16Progress = GetKPIsResultsForKPA(assess, 16),
                    kpa17Progress = GetKPIsResultsForKPA(assess, 17),
                    TotalScore = GetKPITotalScore(assess)
                });


                return Ok(progress);

            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }


        //Helper Methods

         IEnumerable<object> GetTableBPs(List<Bps> BPs)
        {
            var tableBPs = BPs.Select(result => new
            {
                BpID = result.ID,
                BpKpaID = result.kpa_id,
                BpKpa = _context.kpas.FirstOrDefault(a => a.ID == result.kpa_id).name,
                BpName = result.name,
                BpDescription = result.description,
                LastEdittedBy = _context.Users.FirstOrDefault(id => id.Id == result.user_id).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.user_id).LastName
            });
            return tableBPs;
        }
        IEnumerable<object> GetTableBPQuestions(List<BpQuestions> Questions)
        {
            
            var tableBPQuestions = Questions.Select(result => new
            {
                qstnID = result.ID,
                qstnKpaID = _context.bps.FirstOrDefault(a => a.ID == result.bp_id).kpa_id,
                qstnKpaName = _context.kpas.FirstOrDefault(a => a.ID == (_context.bps.FirstOrDefault(a => a.ID == result.bp_id).kpa_id)).name,
                qstnBpID = result.bp_id,
                qstnBpName = _context.bps.FirstOrDefault(a => a.ID == result.bp_id).name,
                qstnFrmwrkID = result.frmwrk_id,
                qstnVersionID = result.version_id,
                qstnVariantID = result.variant_id,
                qstnQuestion = result.question,
                qstnDescription = result.description,
                lastEdittedBy = _context.Users.FirstOrDefault(id => id.Id == result.user_id).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.user_id).LastName
            });
            return tableBPQuestions;
        }

        List<Kpis> GetFilteredKPIs(Assessment assess)
        {
            var tableKpis = _context.kpis.Where(a => (a.frmwrk_id == assess.frmwrk_id && a.version_id == assess.version_id && a.variant_id == assess.variant_id) && 
            (a.kpa_id == DeactivateKPA1(assess.kpa1) || 
            a.kpa_id == DeactivateKPA2(assess.kpa2) || 
            a.kpa_id == DeactivateKPA3(assess.kpa3) ||
            a.kpa_id == DeactivateKPA4(assess.kpa4) ||
            a.kpa_id == DeactivateKPA5(assess.kpa5) ||
            a.kpa_id == DeactivateKPA6(assess.kpa6) ||
            a.kpa_id == DeactivateKPA7(assess.kpa7) ||
            a.kpa_id == DeactivateKPA8(assess.kpa8) ||
            a.kpa_id == DeactivateKPA9(assess.kpa9) ||
            a.kpa_id == DeactivateKPA10(assess.kpa10) ||
            a.kpa_id == DeactivateKPA11(assess.kpa11) ||
            a.kpa_id == DeactivateKPA12(assess.kpa12) ||
            a.kpa_id == DeactivateKPA13(assess.kpa13) ||
            a.kpa_id == DeactivateKPA14(assess.kpa14) ||
            a.kpa_id == DeactivateKPA15(assess.kpa15) ||
            a.kpa_id == DeactivateKPA16(assess.kpa16) ||
            a.kpa_id == DeactivateKPA17(assess.kpa17)
            )).ToList();
            return tableKpis;
        }
        List<Kpis> GetKPIsForKPA(Assessment assess, int kpa)
        {
            var tableKpis = _context.kpis.Where(a => (a.frmwrk_id == assess.frmwrk_id && a.version_id == assess.version_id && a.variant_id == assess.variant_id) && (a.kpa_id == kpa)).ToList();
            return tableKpis;
        }

        float GetKPIsResultsForKPA(Assessment assess, int kpa)
        {
            float total = 0;
            List<KpiResults> kpiResults = _context.kpiResults.Where(a => (a.kpa_id == kpa) && (a.assess_id == assess.ID)).ToList();
            var kpiResult = kpiResults.Select(result => new
            {
                kpiId = result.ID,
                kpiRes = (ConvertKPIResult(result.sect_1) + ConvertKPIResult(result.sect_2) + ConvertKPIResult(result.sect_3) + ConvertKPIResult(result.sect_4) + ConvertKPIResult(result.sect_5) + ConvertKPIResult(result.sect_6)) / SectCount(assess.ID)
            });

            foreach(var result in kpiResult)
            {
                total = total + result.kpiRes;
            }
            if(GetKPIsForKPA(assess, kpa).Count > 0)
            {
                total = (total) / GetKPIsForKPA(assess, kpa).Count;
            }
            else
            {
                total = 0;
            }
            
            return total;
        }

        float GetKPITotalScore(Assessment assess)
        {
            float total = 0;
            List<KpiResults> kpiResults = _context.kpiResults.Where(a => (a.assess_id == assess.ID)).ToList();
            var kpiResult = kpiResults.Select(result => new
            {
                kpiId = result.ID,
                kpiRes = (ConvertKPIResult(result.sect_1) + ConvertKPIResult(result.sect_2) + ConvertKPIResult(result.sect_3) + ConvertKPIResult(result.sect_4) + ConvertKPIResult(result.sect_5) + ConvertKPIResult(result.sect_6)) / SectCount(assess.ID)
            });

            foreach (var result in kpiResult)
            {
                total = total + result.kpiRes;
            }
            if (GetFilteredKPIs(assess).Count > 0)
            {
                total = (total) / GetFilteredKPIs(assess).Count;
            }
            else
            {
                total = 0;
            }

            return total;
        }

        int SectCount(int assessID)
        {
            var sections = _context.assessmentSections.FirstOrDefault(a => a.assess_id == assessID);
            int sectCount = 6;
            if(sections.sect_6 == null)
            {
                sectCount = sectCount - 1;
            }

            if(sections.sect_5 == null)
            {
                sectCount = sectCount - 1;
            }

            if (sections.sect_4 == null)
            {
                sectCount = sectCount - 1;
            }

            if (sections.sect_3 == null)
            {
                sectCount = sectCount - 1;
            }

            if (sections.sect_2 == null)
            {
                sectCount = sectCount - 1;
            }

            return sectCount;
        }

        int ConvertKPIResult(int sect)
        {
            int value = 0;
            if(sect == 1)
            {
                value = 0;
            }
            else if(sect == 2)
            {
                value = 25;
            }
            else if(sect == 3)
            {
                value = 50;
            }
            else if(sect == 4)
            {
                value = 75;
            }
            else if(sect == 5)
            {
                value = 100;
            }

            return value;
        }

        int DeactivateKPA1(string kpa1)
        {
            if(kpa1 != "")
            {
                return 1;
            }
            else {
                return 0; 
            }
        }
        int DeactivateKPA2(string kpa2)
        {
            if (kpa2 != "")
            {
                return 2;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA3(string kpa3)
        {
            if (kpa3 != "")
            {
                return 3;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA4(string kpa4)
        {
            if (kpa4 != "")
            {
                return 4;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA5(string kpa5)
        {
            if (kpa5 != "")
            {
                return 5;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA6(string kpa6)
        {
            if (kpa6 != "")
            {
                return 6;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA7(string kpa7)
        {
            if (kpa7 != "")
            {
                return 7;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA8(string kpa8)
        {
            if (kpa8 != "")
            {
                return 8;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA9(string kpa9)
        {
            if (kpa9 != "")
            {
                return 9;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA10(string kpa10)
        {
            if (kpa10 != "")
            {
                return 10;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA11(string kpa11)
        {
            if (kpa11 != "")
            {
                return 11;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA12(string kpa12)
        {
            if (kpa12 != "")
            {
                return 12;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA13(string kpa13)
        {
            if (kpa13 != "")
            {
                return 13;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA14(string kpa14)
        {
            if (kpa14 != "")
            {
                return 14;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA15(string kpa15)
        {
            if (kpa15 != "")
            {
                return 15;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA16(string kpa16)
        {
            if (kpa16 != "")
            {
                return 16;
            }
            else
            {
                return 0;
            }
        }
        int DeactivateKPA17(string kpa17)
        {
            if (kpa17 != "")
            {
                return 17;
            }
            else
            {
                return 0;
            }
        }
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
