using BinmakAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using BinmakBackEnd.Entities;
using BinmakBackEnd.Areas.AssetHealth.Models;

using BinmakBackEnd.Areas.AssetCriticality.Entities;
using BinmakBackEnd.Areas.Kwenza.Entities;

namespace BinmakAPI.Data
{
    public class BinmakDbContext : IdentityDbContext<ApplicationUser>
    {

        public BinmakDbContext(DbContextOptions<BinmakDbContext> options) : base(options)
        {

        }
        public DbSet<LearningManagementSystemLink> LearningManagementSystemLinks { get; set; }
        public DbSet<AssetNode> AssetNodes { get; set; }
        public DbSet<AssetNodeType> AssetNodeTypes { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<ProductiveUnit> ProductiveUnits { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<AssetUser> AssetUsers { get; set; }

        public DbSet<ReferenceLookup> ReferenceLookups { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<BinmakModule> BinmakModules { get; set; }
        public DbSet<BinmakModuleAccess> BinmakModuleAccesses { get; set; }
        public DbSet<FormulaCreation> FormulaCreations { get; set; }
        public DbSet<MathematicalOperator> MathematicalOperators { get; set; }

        //Production Flow
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.ProductionFlowAsset> ProductionFlowAssets { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.Action> Actions { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.DailyTask> DailyTasks { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.Reading> Readings { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.ProductionFlowAssetUser> ProductionFlowAssetUsers { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.ClientAsset> ClientAssetNames { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.FunctionUnit> FunctionUnits { get; set; }
        public DbSet<BinmakBackEnd.Areas.ProductionFlow.Entities.FunctionUnitChildren> FunctionUnitChildrens { get; set; }

        //Assessments
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Assessment> assessments { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.AssessmentUsers> assessmentUsers { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.AssessmentSections> assessmentSections { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Characteristics> characteristics { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Frmwrks> frmwrks { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Kpas> kpas { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Kpis> kpis { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Levels> levels { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Results> results { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Variants> variants { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Versions> versions { get; set; }

        //Asset Health
        public DbSet<Acknowledgement> Acknowledgements { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<AuditTrail> AuditTrails { get; set; }
        public DbSet<BBSSDevice> BBSSDevices { get; set; }
        public DbSet<Bearing> Bearings { get; set; }
        public DbSet<BinmakTechnology> BinmakTechnologies { get; set; }
        public DbSet<FrequencyPeriod> FrequencyPeriods { get; set; }
        public DbSet<InsulationLevel> InsulationLevels { get; set; }
        public DbSet<Machine> Machines { get; set; }
        public DbSet<MachineCondition> MachineConditions { get; set; }
        public DbSet<MachineLoad> MachineLoads { get; set; }
        public DbSet<MachineNotificationSetting> MachineNotificationSettings { get; set; }
        public DbSet<MachineType> MachineTypes { get; set; }
        public DbSet<SensorCondition> SensorConditions { get; set; }
        public DbSet<SensorData> SensorData { get; set; }
        public DbSet<SizeCategory> SizeCategories { get; set; }
        public DbSet<UserSetting> UserSettings { get; set; }

        //Asset Criticality
        public DbSet<LikelihoodDescription> LikelihoodDescriptions { get; set; }
        public DbSet<RiskAssessorLogin> RiskAssessorLogin { get; set; }
        public DbSet<RiskAcceptanceThreshold> RiskAcceptanceThreshold { get; set; }
        public DbSet<AssessmentReference> AssessmentReference { get; set; }
        public DbSet<ActualAssessment> ActualAssessment { get; set; }
        public DbSet<RiskDeterminationMatrix> RiskDeterminationMatrix { get; set; }
        public DbSet<CriteriaRiskMatrix> CriteriaRiskMatrix { get; set; }
        public DbSet<ConsequenceCategory> ConsequenceCategory { get; set; }

        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.KpiResults> kpiResults { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Bps> bps { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.BpQuestions> bpQuestions { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.BpResults> bpResults { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.AssessmentsActionManager> assessmentsActionManager { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.BpKpiAssessmentAvgs> bpKpiAssessmentAvgs { get; set; }
        //New Production Flow
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.Frequency> Frequencies { get; set; }
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.KeyProcessArea> KeyProcessAreas { get; set; }
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.KeyProcessAreaType> KeyProcessAreaTypes { get; set; }
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.Process> Processes { get; set; }
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.Target> Targets { get; set; }
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.Production> Productions { get; set; }
        public DbSet<BinmakBackEnd.Areas.Kwenza.Entities.ColorPallete> ColorPalletes { get; set; }

    }

}

