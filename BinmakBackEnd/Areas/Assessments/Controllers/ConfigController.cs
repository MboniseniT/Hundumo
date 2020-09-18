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

        [HttpPost("getFilteredBPQuestions")]
        public IActionResult GetFilteredBPQuestions([FromBody] Assessment assess)
        {
            try
            {
                var Questions = GetFilteredBpQuestions(assess);
                return Ok(Questions);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("getFilteredTableBpQuestions")]
        public IActionResult GetFilteredTableBpQuestions([FromBody] Assessment assess)
        {
            try
            {
                List<BpQuestions> Questions = _context.bpQuestions.ToList();
                var filteredTableBpQuestions = GetFilteredTableBPQuestions(Questions,assess);
                return Ok(filteredTableBpQuestions);
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

        //Action Manager
        [HttpPost("getAllActions")]
        public IActionResult GetAllActions([FromBody] Reference assessID)
        {
            try
            {
                //var tableKpis = _context.kpis.ToList();
                List<AssessmentsActionManager> actionz = _context.assessmentsActionManager.Where(a => a.assess_id == int.Parse(assessID.reference)).ToList();
                var tableActions = GetTableActions(actionz);
                return Ok(tableActions);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("GetFilteredActions")]
        public IActionResult GetFilteredActions([FromBody] ActionIdSet IdSet)
        {
            try
            {
                //var tableKpis = _context.kpis.ToList();
                List<AssessmentsActionManager> actionz = _context.assessmentsActionManager.Where(a => a.assess_id == IdSet.assessID && a.sect_id == IdSet.sectID).ToList();
                var tableActions = GetTableActions(actionz);
                return Ok(tableActions);
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editAction")]
        public IActionResult EditAction([FromBody] AssessmentsActionManager Action)
        {
            try
            {
                var lAction = _context.assessmentsActionManager.FirstOrDefault(a => a.ID == Action.ID);
                if (lAction == null)
                {
                    return NotFound("The Action with ID = " + Action.ID + " not found to update!");
                }
                else
                {
                    lAction.action = Action.action;
                    lAction.biz_impact = Action.biz_impact;
                    lAction.ease_of_imp = Action.ease_of_imp;
                    lAction.cost_of_imp = Action.cost_of_imp;
                    lAction.time_to_imp = Action.time_to_imp;
                    lAction.priority = Action.priority;
                    lAction.responsible_person = Action.responsible_person;
                    lAction.target_date = Action.target_date;
                    lAction.status = Action.status;
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

        [HttpPost("editResult")]
        public IActionResult editResult([FromBody] Results Result)
        {
            try
            {
                var lAction = _context.results.Where(a => a.kpa_id == Result.kpa_id && a.assess_id == Result.assess_id).ToList();
                if (lAction == null)
                {
                    return NotFound("The Results not found to update!");
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

        [HttpGet("getTableFrameworks")]
        public IActionResult getTableFrameworks()
        {
            try
            {
                var lAction = _context.frmwrks.ToList();
                if (lAction != null)
                {
                    return Ok(GetTableFrmwrks(lAction));
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

        [HttpPost("addFramework")]
        public IActionResult AddFramework([FromBody] Frmwrks Frmwrk)
        {
            try
            {
                _context.frmwrks.Add(Frmwrk);
                _context.SaveChanges();

                var message = Created("", Frmwrk);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editFrmwrk")]
        public IActionResult EditFrmwrk([FromBody] Frmwrks Frmwrk)
        {
            try
            {
                var lAction = _context.frmwrks.FirstOrDefault(a => a.ID == Frmwrk.ID);
                if (lAction == null)
                {
                    return NotFound("The Framework with ID = " + Frmwrk.ID + " not found to update!");
                }
                else
                {
                    lAction.name = Frmwrk.name;
                    lAction.description = Frmwrk.description;
                    lAction.user_id = Frmwrk.user_id;
                    _context.SaveChanges();
                    return Ok(lAction);
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

        [HttpGet("getTableVersions")]
        public IActionResult getTableVersions()
        {
            try
            {
                var lAction = _context.versions.ToList();
                if (lAction != null)
                {
                    return Ok(GetTableVersions(lAction));
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

        [HttpPost("addVersion")]
        public IActionResult AddVersion([FromBody] Versions Version)
        {
            try
            {
                _context.versions.Add(Version);
                _context.SaveChanges();

                var message = Created("", Version);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editVersion")]
        public IActionResult EditVersion([FromBody] Versions Version)
        {
            try
            {
                var lAction = _context.versions.FirstOrDefault(a => a.ID == Version.ID);
                if (lAction == null)
                {
                    return NotFound("The Version with ID = " + Version.ID + " not found to update!");
                }
                else
                {
                    lAction.name = Version.name;
                    lAction.description = Version.description;
                    lAction.user_id = Version.user_id;
                    _context.SaveChanges();
                    return Ok(lAction);
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

        [HttpGet("getTableVariants")]
        public IActionResult getTableVariants()
        {
            try
            {
                var lAction = _context.variants.ToList();
                if (lAction != null)
                {
                    return Ok(GetTableVariants(lAction));
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

        [HttpPost("addVariant")]
        public IActionResult AddVariant([FromBody] Variants Variant)
        {
            try
            {
                _context.variants.Add(Variant);
                _context.SaveChanges();

                var message = Created("", Variant);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPut("editVariant")]
        public IActionResult EditVariant([FromBody] Variants Variant)
        {
            try
            {
                var lAction = _context.variants.FirstOrDefault(a => a.ID == Variant.ID);
                if (lAction == null)
                {
                    return NotFound("The Variant with ID = " + Variant.ID + " not found to update!");
                }
                else
                {
                    lAction.name = Variant.name;
                    lAction.description = Variant.description;
                    lAction.user_id = Variant.user_id;
                    _context.SaveChanges();
                    return Ok(lAction);
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
            /*KPI Results*/
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

            /*BP Results*/
        [HttpPost("addBPResults")]
        public IActionResult AddBPResults([FromBody] BpResults Result)
        {
            try
            {
                _context.bpResults.Add(Result);
                _context.SaveChanges();

                //Generate Actions
                GenerateAction(Result);

                var message = Created("", Result);
                return message;
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("getBpResults")]
        public IActionResult GetBpResults([FromBody] BpResultIdSet IdSet)
        {
            try
            {
                var lAction = _context.bpResults.Where(a => a.assess_id == IdSet.assess_id).ToList();

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

        [HttpPost("getBpResultById")]
        public IActionResult GetBpResultById([FromBody] BpResultIdSet IdSet)
        {
            try
            {
                var lAction = _context.bpResults.FirstOrDefault(a => a.bpQuestion_id == IdSet.bpQuestion_id && a.assess_id == IdSet.assess_id);

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

        [HttpPut("updateBpResults")]
        public IActionResult UpdateBpResults([FromBody] BpResults Result)
        {
            try
            {
                var lAction = _context.bpResults.FirstOrDefault(a => a.ID == Result.ID);
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

                    //Delete curently existing actions is any
                    DeleteAction(Result);
                    //Generate new action based on new result
                    GenerateAction(Result);
                    return Ok(lAction);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }

        }

        [HttpPost("getBpProgress")]
        public IActionResult GetBpProgress([FromBody] Assessment assess)
        {
            try
            {
                List<Assessment> assessment = _context.assessments.Where(a => a.ID == assess.ID).ToList();
                List<BpQuestions> Questions = _context.bpQuestions.ToList();
                var allBpResults = _context.bpResults.Where(a => a.assess_id == assess.ID).ToList();
                var allBpQuestions = GetFilteredTableBPQuestions(Questions,assess).ToList();
                var progress = assessment.Select(result => new
                {
                    AssessProgress = (allBpResults.Count * 100) / allBpQuestions.Count,
                    kpa1Progress = GetBpResultsForKPA(assess, 1),
                    kpa2Progress = GetBpResultsForKPA(assess, 2),
                    kpa3Progress = GetBpResultsForKPA(assess, 3),
                    kpa4Progress = GetBpResultsForKPA(assess, 4),
                    kpa5Progress = GetBpResultsForKPA(assess, 5),
                    kpa6Progress = GetBpResultsForKPA(assess, 6),
                    kpa7Progress = GetBpResultsForKPA(assess, 7),
                    kpa8Progress = GetBpResultsForKPA(assess, 8),
                    kpa9Progress = GetBpResultsForKPA(assess, 9),
                    kpa10Progress = GetBpResultsForKPA(assess, 10),
                    kpa11Progress = GetBpResultsForKPA(assess, 11),
                    kpa12Progress = GetBpResultsForKPA(assess, 12),
                    kpa13Progress = GetBpResultsForKPA(assess, 13),
                    kpa14Progress = GetBpResultsForKPA(assess, 14),
                    kpa15Progress = GetBpResultsForKPA(assess, 15),
                    kpa16Progress = GetBpResultsForKPA(assess, 16),
                    kpa17Progress = GetBpResultsForKPA(assess, 17),
                    TotalScore = GetBPTotalScore(assess)
                });


                return Ok(progress);

            }
            catch (Exception ex)
            {
                return BadRequest("Something bad happened. " + ex.Message);
            }
        }





        //Helper Methods

        void GenerateAction(BpResults Result)
        {
            
            if (Result.sect_1 == 2)
            {
                AssessmentsActionManager action = new AssessmentsActionManager();

                action.assess_id = Result.assess_id;
                action.bpQuestion_id = Result.bpQuestion_id;
                action.action = "";
                action.biz_impact = 0;
                action.ease_of_imp = 0;
                action.cost_of_imp = "";
                action.time_to_imp = 0;
                action.priority = 0;
                action.responsible_person = "";
                action.target_date = "";
                action.status = 1;
                action.sect_id = _context.assessmentSections.FirstOrDefault(a => a.assess_id == Result.assess_id).sect_1;
                _context.assessmentsActionManager.Add(action);
                _context.SaveChanges();
            }
            if (Result.sect_2 == 2)
            {
                AssessmentsActionManager action1 = new AssessmentsActionManager();

                action1.assess_id = Result.assess_id;
                action1.bpQuestion_id = Result.bpQuestion_id;
                action1.action = "";
                action1.biz_impact = 0;
                action1.ease_of_imp = 0;
                action1.cost_of_imp = "";
                action1.time_to_imp = 0;
                action1.priority = 0;
                action1.responsible_person = "";
                action1.target_date = "";
                action1.status = 1;
                action1.sect_id = (int)_context.assessmentSections.FirstOrDefault(a => a.assess_id == Result.assess_id).sect_2;
                _context.assessmentsActionManager.Add(action1);
                _context.SaveChanges();
            }
            if (Result.sect_3 == 2)
            {
                AssessmentsActionManager action2 = new AssessmentsActionManager();

                action2.assess_id = Result.assess_id;
                action2.bpQuestion_id = Result.bpQuestion_id;
                action2.action = "";
                action2.biz_impact = 0;
                action2.ease_of_imp = 0;
                action2.cost_of_imp = "";
                action2.time_to_imp = 0;
                action2.priority = 0;
                action2.responsible_person = "";
                action2.target_date = "";
                action2.status = 1;
                action2.sect_id = (int)_context.assessmentSections.FirstOrDefault(a => a.assess_id == Result.assess_id).sect_3;
                _context.assessmentsActionManager.Add(action2);
                _context.SaveChanges();
            }
            if (Result.sect_4 == 2)
            {
                AssessmentsActionManager action3 = new AssessmentsActionManager();

                action3.assess_id = Result.assess_id;
                action3.bpQuestion_id = Result.bpQuestion_id;
                action3.action = "";
                action3.biz_impact = 0;
                action3.ease_of_imp = 0;
                action3.cost_of_imp = "";
                action3.time_to_imp = 0;
                action3.priority = 0;
                action3.responsible_person = "";
                action3.target_date = "";
                action3.status = 1;
                action3.sect_id = (int)_context.assessmentSections.FirstOrDefault(a => a.assess_id == Result.assess_id).sect_4;
                _context.assessmentsActionManager.Add(action3);
                _context.SaveChanges();
            }
            if (Result.sect_5 == 2)
            {
                AssessmentsActionManager action4 = new AssessmentsActionManager();

                action4.assess_id = Result.assess_id;
                action4.bpQuestion_id = Result.bpQuestion_id;
                action4.action = "";
                action4.biz_impact = 0;
                action4.ease_of_imp = 0;
                action4.cost_of_imp = "";
                action4.time_to_imp = 0;
                action4.priority = 0;
                action4.responsible_person = "";
                action4.target_date = "";
                action4.status = 1;
                action4.sect_id = (int)_context.assessmentSections.FirstOrDefault(a => a.assess_id == Result.assess_id).sect_5;
                _context.assessmentsActionManager.Add(action4);
                _context.SaveChanges();
            }
            if (Result.sect_6 == 2)
            {
                AssessmentsActionManager action5 = new AssessmentsActionManager();

                action5.assess_id = Result.assess_id;
                action5.bpQuestion_id = Result.bpQuestion_id;
                action5.action = "";
                action5.biz_impact = 0;
                action5.ease_of_imp = 0;
                action5.cost_of_imp = "";
                action5.time_to_imp = 0;
                action5.priority = 0;
                action5.responsible_person = "";
                action5.target_date = "";
                action5.status = 1;
                action5.sect_id = (int)_context.assessmentSections.FirstOrDefault(a => a.assess_id == Result.assess_id).sect_6;
                _context.assessmentsActionManager.Add(action5);
                _context.SaveChanges();
            }

        }

        void DeleteAction(BpResults Result)
        {
            var actions = _context.assessmentsActionManager.Where(a => a.bpQuestion_id == Result.bpQuestion_id && a.assess_id == Result.assess_id).ToList();
            _context.assessmentsActionManager.RemoveRange(actions);
            _context.SaveChanges();

        }

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
        IEnumerable<object> GetTableFrmwrks(List<Frmwrks> Frmwrk)
        {
            var tableFrmwrks = Frmwrk.Select(result => new
            {
                frmwrkID = result.ID,
                frmwrkName = result.name,
                frmwrkDescription = result.description,
                LastEdittedBy = ConvertUserID(result.user_id)
            });
            return tableFrmwrks;
        }
        IEnumerable<object> GetTableVersions(List<Versions> Version)
        {
            var tableVersions = Version.Select(result => new
            {
                versionID = result.ID,
                versionName = result.name,
                versionDescription = result.description,
                LastEdittedBy = ConvertUserID(result.user_id)
            });
            return tableVersions;
        }
        IEnumerable<object> GetTableVariants(List<Variants> Variant)
        {
            var tableVariants = Variant.Select(result => new
            {
                variantID = result.ID,
                variantName = result.name,
                variantDescription = result.description,
                LastEdittedBy = ConvertUserID(result.user_id)
            });
            return tableVariants;
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

        IEnumerable<object> GetTableActions(List<AssessmentsActionManager> actionz)
        {

            var tableActions = actionz.Select(result => new
            {
                actionID = result.ID,
                actionAssessID = result.assess_id,
                actionAssessDate = _context.assessments.FirstOrDefault(a => a.ID == result.assess_id).assess_date,
                actionAssessNode = _context.AssetNodes.FirstOrDefault(a => a.AssetNodeId == (_context.assessments.FirstOrDefault(a => a.ID == result.assess_id).assetNodeId)).Name,
                actionSectionName = _context.AssetNodes.FirstOrDefault(a => a.AssetNodeId == result.sect_id).Name,
                actionKpaID = _context.bps.FirstOrDefault(a => a.ID == (_context.bpQuestions.FirstOrDefault(a => a.ID == result.bpQuestion_id)).bp_id).kpa_id,
                actionKpaName = _context.kpas.FirstOrDefault(a => a.ID == (_context.bps.FirstOrDefault(a => a.ID == (_context.bpQuestions.FirstOrDefault(a => a.ID == result.bpQuestion_id)).bp_id).kpa_id)).name,
                actionBpQuestion = _context.bpQuestions.FirstOrDefault(a => a.ID == result.bpQuestion_id).question,
                actionBpName = _context.bps.FirstOrDefault(a => a.ID == (_context.bpQuestions.FirstOrDefault(a => a.ID == result.bpQuestion_id).bp_id)).name,
                actionAction = result.action,
                actionBizImpact = ConvertImpact(result.biz_impact),
                actionBizImpactID = result.biz_impact,
                actionEaseOfImp = ConvertEase(result.ease_of_imp),
                actionEaseOfImpID = result.ease_of_imp,
                actionCostOfImp = result.cost_of_imp,
                actionTimeToImp = ConvertDuration(result.time_to_imp),
                actionTimeToImpID = result.time_to_imp,
                actionPriority = ConvertPriority(result.priority),
                actionPriorityID = result.priority,
                actionResponsiblePerson = ConvertUserID(result.responsible_person),
                actionResponsiblePersonID = result.responsible_person,
                actionTargetDate = result.target_date,
                actionStatus = ConvertStatus(result.status),
                actionStatusID = result.status
            });

            return tableActions;

        }

        string ConvertImpact(int impact)
        {
            string value = "";
            if(impact == 1)
            {
                value = "Highest";
            }
            else if(impact == 2)
            {
                value = "High";
            }
            else if (impact == 3)
            {
                value = "Medium";
            }
            else if (impact == 4)
            {
                value = "Low";
            }
            else if (impact == 5)
            {
                value = "Lowest";
            }

            return value;

        }

        string ConvertEase(int ease)
        {
            string value = "";
            if (ease == 1)
            {
                value = "Very easy";
            }
            else if (ease == 2)
            {
                value = "Easy";
            }
            else if (ease == 3)
            {
                value = "Difficult";
            }
            else if (ease == 4)
            {
                value = "Very Difficult";
            }

            return value;

        }

        string ConvertDuration(int duration)
        {
            string value = "";
            if (duration == 1)
            {
                value = "1 week";
            }
            else if (duration == 2)
            {
                value = "2 weeks";
            }
            else if (duration == 3)
            {
                value = "1 month";
            }
            else if (duration == 4)
            {
                value = "2 months";
            }
            else if (duration == 5)
            {
                value = "3 months";
            }
            else if (duration == 5)
            {
                value = "longer than 3 months";
            }

            return value;

        }

        string ConvertPriority(int priority)
        {
            string value = "";
            if (priority == 1)
            {
                value = "Highest";
            }
            else if (priority == 2)
            {
                value = "High";
            }
            else if (priority == 3)
            {
                value = "Medium";
            }
            else if (priority == 4)
            {
                value = "Low";
            }
            else if (priority == 5)
            {
                value = "Lowest";
            }

            return value;

        }

        string ConvertStatus(int status)
        {
            string value = "";
            if (status == 1)
            {
                value = "incomplete";
            }
            else if (status == 2)
            {
                value = "complete";
            }

            return value;

        }

        string ConvertUserID(string userID)
        {
            var user = _context.Users.FirstOrDefault(a => a.Id == userID);

            if(user != null)
            {
                return user.FirstName + " " + user.LastName;
            }
            else
            {
                return "";
            }
        }

        IEnumerable<object> GetFilteredTableBPQuestions(List<BpQuestions> Questions, Assessment assess)
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

            var filteredTableBpQuestions = tableBPQuestions.Where(a => (
            a.qstnKpaID == DeactivateKPA1(assess.kpa1) ||
            a.qstnKpaID == DeactivateKPA2(assess.kpa2) ||
            a.qstnKpaID == DeactivateKPA3(assess.kpa3) ||
            a.qstnKpaID == DeactivateKPA4(assess.kpa4) ||
            a.qstnKpaID == DeactivateKPA5(assess.kpa5) ||
            a.qstnKpaID == DeactivateKPA6(assess.kpa6) ||
            a.qstnKpaID == DeactivateKPA7(assess.kpa7) ||
            a.qstnKpaID == DeactivateKPA8(assess.kpa8) ||
            a.qstnKpaID == DeactivateKPA9(assess.kpa9) ||
            a.qstnKpaID == DeactivateKPA10(assess.kpa10) ||
            a.qstnKpaID == DeactivateKPA11(assess.kpa11) ||
            a.qstnKpaID == DeactivateKPA12(assess.kpa12) ||
            a.qstnKpaID == DeactivateKPA13(assess.kpa13) ||
            a.qstnKpaID == DeactivateKPA14(assess.kpa14) ||
            a.qstnKpaID == DeactivateKPA15(assess.kpa15) ||
            a.qstnKpaID == DeactivateKPA16(assess.kpa16) ||
            a.qstnKpaID == DeactivateKPA17(assess.kpa17)));

            return filteredTableBpQuestions;

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

        IEnumerable<object> GetFilteredBpQuestions(Assessment assess)
        {
            var KPAs = _context.kpas.Where(a =>
            (a.ID == DeactivateKPA1(assess.kpa1) ||
            a.ID == DeactivateKPA2(assess.kpa2) ||
            a.ID == DeactivateKPA3(assess.kpa3) ||
            a.ID == DeactivateKPA4(assess.kpa4) ||
            a.ID == DeactivateKPA5(assess.kpa5) ||
            a.ID == DeactivateKPA6(assess.kpa6) ||
            a.ID == DeactivateKPA7(assess.kpa7) ||
            a.ID == DeactivateKPA8(assess.kpa8) ||
            a.ID == DeactivateKPA9(assess.kpa9) ||
            a.ID == DeactivateKPA10(assess.kpa10) ||
            a.ID == DeactivateKPA11(assess.kpa11) ||
            a.ID == DeactivateKPA12(assess.kpa12) ||
            a.ID == DeactivateKPA13(assess.kpa13) ||
            a.ID == DeactivateKPA14(assess.kpa14) ||
            a.ID == DeactivateKPA15(assess.kpa15) ||
            a.ID == DeactivateKPA16(assess.kpa16) ||
            a.ID == DeactivateKPA17(assess.kpa17)
            )
            ).ToList();

            var Questions = KPAs.Select(results => new
            {
                kpaID = results.ID,
                kpaName = results.name,
                kpaBps = _context.bps.Where(a => a.kpa_id == results.ID).ToList().Select(result => new {
                    bpID = result.ID,
                    bpName = result.name,
                    bpQuestions = _context.bpQuestions.Where(a => a.bp_id == result.ID && a.frmwrk_id == assess.frmwrk_id && a.version_id == assess.version_id && a.variant_id == assess.variant_id).ToList().Select(res => new
                    {
                        qstnID = res.ID,
                        qstnQuestion = res.question,
                        qstnDescription = res.description
                    })
                })
            });

            return Questions;
        }

        List<Kpis> GetKPIsForKPA(Assessment assess, int kpa)
        {
            var tableKpis = _context.kpis.Where(a => (a.frmwrk_id == assess.frmwrk_id && a.version_id == assess.version_id && a.variant_id == assess.variant_id) && (a.kpa_id == kpa)).ToList();
            return tableKpis;
        }

        IEnumerable<object> GetFilteredTableBPQuestionsForKPA(List<BpQuestions> Questions, Assessment assess, int kpa)
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

            var filteredTableBpQuestions = tableBPQuestions.Where(a => (a.qstnKpaID == kpa));

            return filteredTableBpQuestions;

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

        float GetBpResultsForKPA(Assessment assess, int kpa)
        {
            float total = 0;

            List<BpQuestions> Questions = _context.bpQuestions.ToList();
            var allBpQuestions = GetFilteredTableBPQuestionsForKPA(Questions, assess, kpa).ToList();
            List<BpResults> Results = _context.bpResults.Where(a => a.assess_id == assess.ID).ToList();
            var tableBPResults = Results.Select(result => new
            {
                resultID = result.ID,
                resultKpaID = _context.bps.FirstOrDefault(a => a.ID == (_context.bpQuestions.FirstOrDefault(q => q.ID == result.bpQuestion_id)).bp_id).kpa_id,
                resultQuestionId = result.bpQuestion_id,
                resultAssessId = result.assess_id,
                resultSect1 = result.sect_1,
                resultSect2 = result.sect_2,
                resultSect3 = result.sect_3,
                resultSect4 = result.sect_4,
                resultSect5 = result.sect_5,
                resultSect6 = result.sect_6,
            });

            var tableKPABPResults = tableBPResults.Where(a => a.resultKpaID == kpa);

            var bpResult = tableKPABPResults.Select(result => new
            {
                bpQuestionId = result.resultQuestionId,
                bpRes = (ConvertBpResult(result.resultSect1) + ConvertBpResult(result.resultSect2) + ConvertBpResult(result.resultSect3) + ConvertBpResult(result.resultSect4) + ConvertBpResult(result.resultSect5) + ConvertBpResult(result.resultSect6)) / SectCount(assess.ID)
            });

            foreach (var result in bpResult)
            {
                total = total + result.bpRes;
            }
            if (allBpQuestions.Count > 0)
            {
                total = (total) / allBpQuestions.Count;
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

        float GetBPTotalScore(Assessment assess)
        {
            float total = 0;
            List<BpQuestions> Questions = _context.bpQuestions.ToList();
            var allBpQuestions = GetFilteredTableBPQuestions(Questions, assess).ToList();
            List<BpResults> bpResults = _context.bpResults.Where(a => (a.assess_id == assess.ID)).ToList();
            var bpResult = bpResults.Select(result => new
            {
                bpQuestionId = result.ID,
                bpRes = (ConvertBpResult(result.sect_1) + ConvertBpResult(result.sect_2) + ConvertBpResult(result.sect_3) + ConvertBpResult(result.sect_4) + ConvertBpResult(result.sect_5) + ConvertBpResult(result.sect_6)) / SectCount(assess.ID)
            });

            foreach (var result in bpResult)
            {
                total = total + result.bpRes;
            }
            if (allBpQuestions.Count > 0)
            {
                total = (total) / allBpQuestions.Count;
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

        int ConvertBpResult(int sect)
        {
            int value = 0;
            if (sect == 1)
            {
                value = 100;
            }
            else if (sect == 2)
            {
                value = 0;
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
