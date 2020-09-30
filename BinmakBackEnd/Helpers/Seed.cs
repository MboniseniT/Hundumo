
using BinmakAPI.Data;
using BinmakAPI.Entities;
using BinmakBackEnd.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Helpers
{
    public class Seed
    {
        private readonly BinmakDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public Seed(BinmakDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async void SeedRoles()
        {
            string[] roles = new string[] { "BINMAK", "ADMINISTRATOR", "USER", "GUEST" };

            foreach (string role in roles)
            {
                var r = _context.Roles.Where(u => u.Name == role).Any();

                if (r == false)
                {
                    _context.Roles.Add(new IdentityRole()
                    {
                        Name = role,
                        NormalizedName = role.ToUpper()
                    });
                    _context.SaveChanges();
                }
            }
        }

        public async void SeedUsers()
        {
            var user = _context.Users.Where(u => u.Email == "admin@m-theth.co.za").Any();

            if (user == false)
            {

                List<ApplicationUser> userObj = new List<ApplicationUser>()
                {
                    new ApplicationUser
                    {
                        Email = "admin@m-theth.co.za",
                        UserName = "admin@m-theth.co.za",
                        FirstName = "Admin",
                        LastName = "Admin",
                        DateStamp = DateTime.Now,
                        IsSuperAdmin = true,
                        Role = "BINMAK",
                        CountryId = 203,
                        IsBinmak = true
                    },
                    new ApplicationUser
                    {
                        Email = "Mboniseni.Thethwayo@m-theth.co.za",
                        UserName = "Mboniseni.Thethwayo@m-theth.co.za",
                        FirstName = "Mboniseni",
                        LastName = "Thethwayo",
                        DateStamp = DateTime.Now,
                        IsAdmin = true,
                        Role = "ADMINISTRATOR",
                        CountryId = 203
                    }
                };


                foreach (ApplicationUser item in userObj)
                {
                    IdentityResult result = _userManager.CreateAsync(item, item.FirstName + "@Mtheth").Result;
                }

                _context.SaveChanges();
            }
        }

        public async void SeedAssetNodeTypes()
        {
            string[] assetNodeTypes = new string[] { "Organization", "Productive Unit", "Equipment" };

            foreach (string asnt in assetNodeTypes)
            {
                var assetNodeTypeChecker = _context.AssetNodeTypes.Where(u => u.AssetNodeTypeName == asnt).Any();

                if (assetNodeTypeChecker == false)
                {
                    _context.AssetNodeTypes.Add(new AssetNodeType()
                    {
                        AssetNodeTypeName = asnt,
                        AssetNodeTypeDescription = asnt
                    });
                    _context.SaveChanges();
                }
            }
        }

        public async void SeedKPATypes()
        {
            string[] kpaTypes = new string[] { "Buffer", "Process" };

            foreach (string kpa in kpaTypes)
            {
                var kpaTypeChecker = _context.KeyProcessAreaTypes.Where(u => u.KeyProcessAreaTypeName == kpa).Any();

                if (kpaTypeChecker == false)
                {
                    _context.KeyProcessAreaTypes.Add(new Areas.Kwenza.Entities.KeyProcessAreaType()
                    {
                        KeyProcessAreaTypeName = kpa,
                    });
                    _context.SaveChanges();
                }
            }
        }

        public async void SeedBinmakModules()
        {
            string[] binmakModules = new string[] { "Production Flow", "Assessments", "Load and Haul", "Asset Health", "Asset Criticality" };

            foreach (string bm in binmakModules)
            {
                var binmakModuleChecker = _context.BinmakModules.Where(u => u.BinmakModuleName == bm).Any();

                if (binmakModuleChecker == false)
                {
                    _context.BinmakModules.Add(new BinmakModule()
                    {
                        BinmakModuleName = bm,
                    });
                    _context.SaveChanges();
                }
            }
        }

        public async void SeedMathematicalOperators()
        {
            string[] mathematicalOperators = new string[] { "+", "-", "*", "/" };

            foreach (string m in mathematicalOperators)
            {
                var mathematicalOperatorChecker = _context.MathematicalOperators.Where(u => u.MathematicalOperatorSign == m).Any();

                if (mathematicalOperatorChecker == false)
                {
                    _context.MathematicalOperators.Add(new Areas.Kwenza.Entities.MathematicalOperator()
                    {
                        MathematicalOperatorSign = m
                    });
                    _context.SaveChanges();
                }
            }
        }

        public async void Countries()
        {
            //TODO
        }

        public async void AssignRoles(ApplicationUser applicationUser, string role)
        {
            await _userManager.AddToRoleAsync(applicationUser, role);
        }
    }
}
