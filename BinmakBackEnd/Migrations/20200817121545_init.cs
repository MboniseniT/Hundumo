using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BinmakBackEnd.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Actions",
                columns: table => new
                {
                    ActionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionName = table.Column<string>(nullable: true),
                    AssetId = table.Column<int>(nullable: false),
                    ActionIndex = table.Column<int>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    DateProduction = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actions", x => x.ActionId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    IsAdmin = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    CompanyId = table.Column<int>(nullable: false),
                    CountryId = table.Column<int>(nullable: false),
                    Zip = table.Column<int>(nullable: false),
                    Position = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    Reference = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssetNodes",
                columns: table => new
                {
                    AssetNodeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentAssetNodeId = table.Column<int>(nullable: false),
                    RootAssetNodeId = table.Column<int>(nullable: false),
                    AssetNodeTypeId = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    LastEditedDate = table.Column<DateTime>(nullable: false),
                    LastEditedBy = table.Column<string>(nullable: true),
                    IsParentAddress = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    Zip = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetNodes", x => x.AssetNodeId);
                });

            migrationBuilder.CreateTable(
                name: "AssetNodeTypes",
                columns: table => new
                {
                    AssetNodeTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetNodeTypeName = table.Column<string>(nullable: true),
                    AssetNodeTypeDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetNodeTypes", x => x.AssetNodeTypeId);
                });

            migrationBuilder.CreateTable(
                name: "AssetUsers",
                columns: table => new
                {
                    AssetUserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetNodeId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    AssetNodeTypeId = table.Column<int>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    IsAssetAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetUsers", x => x.AssetUserId);
                });

            migrationBuilder.CreateTable(
                name: "ClientAssetNames",
                columns: table => new
                {
                    ClientAssetId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientAssetNameId = table.Column<int>(nullable: false),
                    AssetName = table.Column<string>(nullable: true),
                    ClientName = table.Column<string>(nullable: true),
                    Reference = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientAssetNames", x => x.ClientAssetId);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    CompanyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.CompanyId);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    CountryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryCode = table.Column<string>(nullable: true),
                    CountryName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.CountryId);
                });

            migrationBuilder.CreateTable(
                name: "DailyTasks",
                columns: table => new
                {
                    DailyTaskId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DailyTaskName = table.Column<string>(nullable: true),
                    ActionId = table.Column<int>(nullable: false),
                    TaskDate = table.Column<DateTime>(nullable: false),
                    AssetId = table.Column<int>(nullable: false),
                    ActionIndex = table.Column<int>(nullable: false),
                    TaskTarget = table.Column<int>(nullable: false),
                    Unit = table.Column<string>(nullable: true),
                    Frequency = table.Column<string>(nullable: true),
                    Reference = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    DailyTaskValue = table.Column<int>(nullable: false),
                    Target = table.Column<int>(nullable: false),
                    Budget = table.Column<int>(nullable: false),
                    Threshold = table.Column<int>(nullable: false),
                    DateProduction = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyTasks", x => x.DailyTaskId);
                });

            migrationBuilder.CreateTable(
                name: "Equipments",
                columns: table => new
                {
                    EquipmentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentEquipmentId = table.Column<int>(nullable: false),
                    ProductiveUnitId = table.Column<int>(nullable: false),
                    RootOrganizationId = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    RootEquipmentId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    LastEditedDate = table.Column<DateTime>(nullable: false),
                    LastEditedBy = table.Column<string>(nullable: true),
                    IsParentAddress = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    Zip = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipments", x => x.EquipmentId);
                });

            migrationBuilder.CreateTable(
                name: "FunctionUnitChildrens",
                columns: table => new
                {
                    FunctionUnitChildrenId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FunctionUnitChildrenName = table.Column<string>(nullable: true),
                    FunctionUnitId = table.Column<int>(nullable: false),
                    AssetId = table.Column<int>(nullable: false),
                    ClientAssetNameId = table.Column<int>(nullable: false),
                    FunctionChildrenBachgroundColor = table.Column<string>(nullable: true),
                    FunctionChildrenColor = table.Column<string>(nullable: true),
                    Frequency = table.Column<string>(nullable: true),
                    MeasurementUnit = table.Column<string>(nullable: true),
                    MonthlyTarget = table.Column<string>(nullable: true),
                    MonthlyTargetColor = table.Column<string>(nullable: true),
                    MonthlyTargetIsBackground = table.Column<bool>(nullable: false),
                    Target = table.Column<string>(nullable: true),
                    TargetColor = table.Column<string>(nullable: true),
                    TargetIsBackground = table.Column<bool>(nullable: false),
                    Budget = table.Column<string>(nullable: true),
                    BudgetColor = table.Column<string>(nullable: true),
                    BudgetIsBackground = table.Column<bool>(nullable: false),
                    Threshold = table.Column<string>(nullable: true),
                    ThresholdColor = table.Column<string>(nullable: true),
                    ThresholdIsBackground = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionUnitChildrens", x => x.FunctionUnitChildrenId);
                });

            migrationBuilder.CreateTable(
                name: "FunctionUnits",
                columns: table => new
                {
                    FunctionUnitId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FunctionUnitName = table.Column<string>(nullable: true),
                    AssetId = table.Column<int>(nullable: false),
                    ClientAssetNameId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionUnits", x => x.FunctionUnitId);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentOrganizationId = table.Column<int>(nullable: false),
                    RootOrganizationId = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    LastEditedDate = table.Column<DateTime>(nullable: false),
                    LastEditedBy = table.Column<string>(nullable: true),
                    IsParentAddress = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    Zip = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                });

            migrationBuilder.CreateTable(
                name: "ProductionFlowAssets",
                columns: table => new
                {
                    ProductionFlowAssetId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetId = table.Column<int>(nullable: false),
                    ClientAssetNameId = table.Column<int>(nullable: false),
                    SiteName = table.Column<string>(nullable: true),
                    TemplateId = table.Column<int>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    SinceDateProduction = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionFlowAssets", x => x.ProductionFlowAssetId);
                });

            migrationBuilder.CreateTable(
                name: "ProductionFlowAssetUsers",
                columns: table => new
                {
                    ProductionFlowAssetUserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetId = table.Column<int>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    IsOverallProductionProcess = table.Column<bool>(nullable: false),
                    IsOverallProductionBuffer = table.Column<bool>(nullable: false),
                    IsDrillAndBlast = table.Column<bool>(nullable: false),
                    IsSupport = table.Column<bool>(nullable: false),
                    IsShe = table.Column<bool>(nullable: false),
                    IsLoadAndHaul = table.Column<bool>(nullable: false),
                    IsFacePreparation = table.Column<bool>(nullable: false),
                    IsEquipmentStatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionFlowAssetUsers", x => x.ProductionFlowAssetUserId);
                });

            migrationBuilder.CreateTable(
                name: "ProductiveUnits",
                columns: table => new
                {
                    ProductiveUnitId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentProductiveUnitId = table.Column<int>(nullable: false),
                    RootOrganizationId = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    OrganizationId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    DateStamp = table.Column<DateTime>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    LastEditedDate = table.Column<DateTime>(nullable: false),
                    LastEditedBy = table.Column<string>(nullable: true),
                    IsParentAddress = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    Zip = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductiveUnits", x => x.ProductiveUnitId);
                });

            migrationBuilder.CreateTable(
                name: "Readings",
                columns: table => new
                {
                    ReadingId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetId = table.Column<int>(nullable: false),
                    Reference = table.Column<string>(nullable: true),
                    DateProduction = table.Column<DateTime>(nullable: false),
                    IsClosed = table.Column<bool>(nullable: false),
                    She = table.Column<int>(nullable: false),
                    SheUnit = table.Column<string>(nullable: true),
                    SheFrequency = table.Column<int>(nullable: false),
                    SheMonthTarget = table.Column<int>(nullable: false),
                    SheTarget = table.Column<int>(nullable: false),
                    SheBudget = table.Column<int>(nullable: false),
                    SheThreshold = table.Column<int>(nullable: false),
                    Day1st4HoursEnds = table.Column<int>(nullable: false),
                    Day1st4HoursEndsUnit = table.Column<string>(nullable: true),
                    Day1st4HoursEndsFrequency = table.Column<int>(nullable: false),
                    Day1st4HoursEndsMonthTarget = table.Column<int>(nullable: false),
                    Day1st4HoursEndsTarget = table.Column<int>(nullable: false),
                    Day1st4HoursEndsBudget = table.Column<int>(nullable: false),
                    Day1st4HoursEndsThreshold = table.Column<int>(nullable: false),
                    Night1st4HoursEnds = table.Column<int>(nullable: false),
                    Night1st4HoursEndsUnit = table.Column<string>(nullable: true),
                    Night1st4HoursEndsFrequency = table.Column<int>(nullable: false),
                    Night1st4HoursEndsMonthTarget = table.Column<int>(nullable: false),
                    Night1st4HoursEndsTarget = table.Column<int>(nullable: false),
                    Night1st4HoursEndsBudget = table.Column<int>(nullable: false),
                    Night1st4HoursEndsThreshold = table.Column<int>(nullable: false),
                    EndsDrilled = table.Column<int>(nullable: false),
                    EndsDrilledUnit = table.Column<string>(nullable: true),
                    EndsDrilledFrequency = table.Column<int>(nullable: false),
                    EndsDrilledMonthTarget = table.Column<int>(nullable: false),
                    EndsDrilledTarget = table.Column<int>(nullable: false),
                    EndsDrilledBudget = table.Column<int>(nullable: false),
                    EndsDrilledThreshold = table.Column<int>(nullable: false),
                    EndsBlasted = table.Column<int>(nullable: false),
                    EndsBlastedUnit = table.Column<string>(nullable: true),
                    EndsBlastedFrequency = table.Column<int>(nullable: false),
                    EndsBlastedMonthTarget = table.Column<int>(nullable: false),
                    EndsBlastedTarget = table.Column<int>(nullable: false),
                    EndsBlastedBudget = table.Column<int>(nullable: false),
                    EndsBlastedThreshold = table.Column<int>(nullable: false),
                    UnlashedEnds = table.Column<int>(nullable: false),
                    UnlashedEndsUnit = table.Column<string>(nullable: true),
                    UnlashedEndsFrequency = table.Column<int>(nullable: false),
                    UnlashedEndsMonthTarget = table.Column<int>(nullable: false),
                    UnlashedEndsTarget = table.Column<int>(nullable: false),
                    UnlashedEndsBudget = table.Column<int>(nullable: false),
                    UnlashedEndsThreshold = table.Column<int>(nullable: false),
                    EndsLashed = table.Column<int>(nullable: false),
                    EndsLashedUnit = table.Column<string>(nullable: true),
                    EndsLashedFrequency = table.Column<int>(nullable: false),
                    EndsLashedMonthTarget = table.Column<int>(nullable: false),
                    EndsLashedTarget = table.Column<int>(nullable: false),
                    EndsLashedBudget = table.Column<int>(nullable: false),
                    EndsLashedThreshold = table.Column<int>(nullable: false),
                    TotalCleanedEnds = table.Column<int>(nullable: false),
                    TotalCleanedEndsUnit = table.Column<string>(nullable: true),
                    TotalCleanedEndsFrequency = table.Column<int>(nullable: false),
                    TotalCleanedEndsMonthTarget = table.Column<int>(nullable: false),
                    TotalCleanedEndsTarget = table.Column<int>(nullable: false),
                    TotalCleanedEndsBudget = table.Column<int>(nullable: false),
                    TotalCleanedEndsThreshold = table.Column<int>(nullable: false),
                    LashedPreparedForSupport = table.Column<int>(nullable: false),
                    LashedPreparedForSupportUnit = table.Column<string>(nullable: true),
                    LashedPreparedForSupportFrequency = table.Column<int>(nullable: false),
                    LashedPreparedForSupportMonthTarget = table.Column<int>(nullable: false),
                    LashedPreparedForSupportTarget = table.Column<int>(nullable: false),
                    LashedPreparedForSupportBudget = table.Column<int>(nullable: false),
                    LashedPreparedForSupportThreshold = table.Column<int>(nullable: false),
                    MuckbayTons = table.Column<int>(nullable: false),
                    MuckbayTonsUnit = table.Column<string>(nullable: true),
                    MuckbayTonsFrequency = table.Column<int>(nullable: false),
                    MuckbayTonsMonthTarget = table.Column<int>(nullable: false),
                    MuckbayTonsTarget = table.Column<int>(nullable: false),
                    MuckbayTonsBudget = table.Column<int>(nullable: false),
                    MuckbayTonsThreshold = table.Column<int>(nullable: false),
                    HoistedTons = table.Column<int>(nullable: false),
                    HoistedTonsUnit = table.Column<string>(nullable: true),
                    HoistedTonsFrequency = table.Column<int>(nullable: false),
                    HoistedTonsMonthTarget = table.Column<int>(nullable: false),
                    HoistedTonsTarget = table.Column<int>(nullable: false),
                    HoistedTonsBudget = table.Column<int>(nullable: false),
                    HoistedTonsThreshold = table.Column<int>(nullable: false),
                    UGCrusherBin = table.Column<int>(nullable: false),
                    UGCrusherBinUnit = table.Column<string>(nullable: true),
                    UGCrusherBinFrequency = table.Column<int>(nullable: false),
                    UGCrusherBinMonthTarget = table.Column<int>(nullable: false),
                    UGCrusherBinTarget = table.Column<int>(nullable: false),
                    UGCrusherBinBudget = table.Column<int>(nullable: false),
                    UGCrusherBinThreshold = table.Column<int>(nullable: false),
                    EndsSupported = table.Column<int>(nullable: false),
                    EndsSupportedUnit = table.Column<string>(nullable: true),
                    EndsSupportedFrequency = table.Column<int>(nullable: false),
                    EndsSupportedMonthTarget = table.Column<int>(nullable: false),
                    EndsSupportedTarget = table.Column<int>(nullable: false),
                    EndsSupportedBudget = table.Column<int>(nullable: false),
                    EndsSupportedThreshold = table.Column<int>(nullable: false),
                    SupportedEnds = table.Column<int>(nullable: false),
                    SupportedEndsUnit = table.Column<string>(nullable: true),
                    SupportedEndsFrequency = table.Column<int>(nullable: false),
                    SupportedEndsMonthTarget = table.Column<int>(nullable: false),
                    SupportedEndsTarget = table.Column<int>(nullable: false),
                    SupportedEndsBudget = table.Column<int>(nullable: false),
                    SupportedEndsThreshold = table.Column<int>(nullable: false),
                    EndsPrepared = table.Column<int>(nullable: false),
                    EndsPreparedUnit = table.Column<string>(nullable: true),
                    EndsPreparedFrequency = table.Column<int>(nullable: false),
                    EndsPreparedMonthTarget = table.Column<int>(nullable: false),
                    EndsPreparedTarget = table.Column<int>(nullable: false),
                    EndsPreparedBudget = table.Column<int>(nullable: false),
                    EndsPreparedThreshold = table.Column<int>(nullable: false),
                    PreparedMarkedEnds = table.Column<int>(nullable: false),
                    PreparedMarkedEndsUnit = table.Column<string>(nullable: true),
                    PreparedMarkedEndsFrequency = table.Column<int>(nullable: false),
                    PreparedMarkedEndsMonthTarget = table.Column<int>(nullable: false),
                    PreparedMarkedEndsTarget = table.Column<int>(nullable: false),
                    PreparedMarkedEndsBudget = table.Column<int>(nullable: false),
                    PreparedMarkedEndsThreshold = table.Column<int>(nullable: false),
                    DrillRigs = table.Column<int>(nullable: false),
                    DrillRigsUnit = table.Column<string>(nullable: true),
                    DrillRigsFrequency = table.Column<int>(nullable: false),
                    DrillRigsMonthTarget = table.Column<int>(nullable: false),
                    DrillRigsTarget = table.Column<int>(nullable: false),
                    DrillRigsBudget = table.Column<int>(nullable: false),
                    DrillRigsThreshold = table.Column<int>(nullable: false),
                    LHDs = table.Column<int>(nullable: false),
                    LHDsUnit = table.Column<string>(nullable: true),
                    LHDsFrequency = table.Column<int>(nullable: false),
                    LHDsMonthTarget = table.Column<int>(nullable: false),
                    LHDsTarget = table.Column<int>(nullable: false),
                    LHDsBudget = table.Column<int>(nullable: false),
                    LHDsThreshold = table.Column<int>(nullable: false),
                    DumpTrucks = table.Column<int>(nullable: false),
                    DumpTrucksUnit = table.Column<string>(nullable: true),
                    DumpTrucksFrequency = table.Column<int>(nullable: false),
                    DumpTrucksMonthTarget = table.Column<int>(nullable: false),
                    DumpTrucksTarget = table.Column<int>(nullable: false),
                    DumpTrucksBudget = table.Column<int>(nullable: false),
                    DumpTrucksThreshold = table.Column<int>(nullable: false),
                    Bolters = table.Column<int>(nullable: false),
                    BoltersUnit = table.Column<string>(nullable: true),
                    BoltersFrequency = table.Column<int>(nullable: false),
                    BoltersMonthTarget = table.Column<int>(nullable: false),
                    BoltersTarget = table.Column<int>(nullable: false),
                    BoltersBudget = table.Column<int>(nullable: false),
                    BoltersThreshold = table.Column<int>(nullable: false),
                    Drifters = table.Column<int>(nullable: false),
                    DriftersUnit = table.Column<string>(nullable: true),
                    DriftersFrequency = table.Column<int>(nullable: false),
                    DriftersMonthTarget = table.Column<int>(nullable: false),
                    DriftersTarget = table.Column<int>(nullable: false),
                    DriftersBudget = table.Column<int>(nullable: false),
                    DriftersThreshold = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Readings", x => x.ReadingId);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    TemplateId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.TemplateId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Actions");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AssetNodes");

            migrationBuilder.DropTable(
                name: "AssetNodeTypes");

            migrationBuilder.DropTable(
                name: "AssetUsers");

            migrationBuilder.DropTable(
                name: "ClientAssetNames");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "DailyTasks");

            migrationBuilder.DropTable(
                name: "Equipments");

            migrationBuilder.DropTable(
                name: "FunctionUnitChildrens");

            migrationBuilder.DropTable(
                name: "FunctionUnits");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "ProductionFlowAssets");

            migrationBuilder.DropTable(
                name: "ProductionFlowAssetUsers");

            migrationBuilder.DropTable(
                name: "ProductiveUnits");

            migrationBuilder.DropTable(
                name: "Readings");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
