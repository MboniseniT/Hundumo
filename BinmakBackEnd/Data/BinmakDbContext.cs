using BinmakAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using BinmakBackEnd.Entities;
using BinmakBackEnd.Areas.AssetCriticality.Entities;
namespace BinmakAPI.Data
{
    public class BinmakDbContext : IdentityDbContext<ApplicationUser>
    {

        public BinmakDbContext(DbContextOptions<BinmakDbContext> options) : base(options)
        {

        }
        public DbSet<AssetNode> AssetNodes { get; set; }
        public DbSet<AssetNodeType> AssetNodeTypes { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<ProductiveUnit> ProductiveUnits { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<AssetUser> AssetUsers { get; set; }

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
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Characteristics> characteristics { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Frmwrks> frmwrks { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Kpas> kpas { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Levels> levels { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Results> results { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Variants> variants { get; set; }
        public DbSet<BinmakBackEnd.Areas.Assessments.Entities.Versions> versions { get; set; }

        //Asset Criticality
        public DbSet<LikelihoodDescription> LikelihoodDescriptions { get; set; }
        public DbSet<RiskAssessorLogin> RiskAssessorLogin { get; set; }
        public DbSet<RiskAcceptanceThreshold> RiskAcceptanceThreshold { get; set; }
        public DbSet<AssessmentReference> AssessmentReference { get; set; }
        public DbSet<ActualAssessment> ActualAssessment { get; set; }
        public DbSet<RiskDeterminationMatrix> RiskDeterminationMatrix { get; set; }
        public DbSet<CriteriaRiskMatrix> CriteriaRiskMatrix { get; set; }
        public DbSet<ConsequenceCategory> ConsequenceCategory { get; set; }

    }

}

