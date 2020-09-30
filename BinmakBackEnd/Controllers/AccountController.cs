using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BinmakAPI.Data;
using BinmakAPI.Entities;
using System.Text;
using System.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using BinmakAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using BinmakBackEnd.Entities;
using EASendMail;

namespace BinmakAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly BinmakDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(BinmakDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] BinmakBackEnd.Models.ForgotPassword forgotPassword)
        {
            try
            {
                if (forgotPassword is null)
                    return BadRequest("Make Sure Form Is Filled!");


                var user = await _userManager.FindByEmailAsync(forgotPassword.Email);

                if (user == null)
                    return BadRequest("No user found!");

                var token = _userManager.GeneratePasswordResetTokenAsync(user);
                var password = CreatePassword(6);

                var result = await _userManager.ResetPasswordAsync(user, token.ToString(), password);

                if (result.Succeeded)
                {
                   
                    //Todo: Send email with link
                    return Ok();
                }
                else
                {
                    return BadRequest("Something bad happened!");
                }

                return Ok();
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened! "+Ex.Message);
            }

        }

        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            var roles = _roleManager.Roles.Where(id=>id.Name != "BINMAK").ToList();

            return Ok(roles);
        }

        [HttpGet("binmakModules")]
        public IActionResult GetBinmakSystems()
        {
            var bnmakSystems = _context.BinmakModules.ToList();

            return Ok(bnmakSystems);
        }

        [HttpGet("lms")]
        public IActionResult GetLMSLinks(string reference)
        {
            LearningManagementSystemLink lms;

            var user = _context.Users.FirstOrDefault(id => id.Id == reference);
            if (user == null)
            {
                return BadRequest("Something bad happened. Make sure you are logged in.");
            }
            string email = user.Email;

            String[] part1 = email.Split(new[] { '@' });
            String fullDomain = part1[1];

            String[] actualDomain = fullDomain.Split(new[] { '.' });
            String domainName = actualDomain[0];

            lms = _context.LearningManagementSystemLinks.FirstOrDefault(id => id.KeyName.Contains(domainName));

            return Ok(lms);
        }

        [HttpGet("groupsByRoot")]
        public IActionResult GetGroupsByRoot(int rootId)
        {
            var groups = _context.Groups.Where(id => id.RootId == rootId);

            return Ok(groups);
        }

        [HttpGet("groups")]
        public IActionResult GetGroups(string reference)
        {
            var groups = _context.Groups.Where(id => id.Reference == reference);

            return Ok(groups);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] Register applicationUser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string response = "";

                    if (applicationUser == null)
                    {
                        return BadRequest("Invalid User Data");
                    }

                    var user = await _userManager.FindByEmailAsync(applicationUser.Email);

                    if (user == null)
                    {

                        int rootId = applicationUser.GroupIds;
                        bool isTopRoot;

                        AssetNode assetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == rootId);
                        if (assetNode.ParentAssetNodeId == 0)
                        {
                            isTopRoot = true;
                        }
                        else
                        {
                            isTopRoot = false;
                        }

                        if (isTopRoot)
                        {
                            applicationUser.Reference = assetNode.Reference;
                        }
                        else
                        {
                            applicationUser.Reference = _context.AssetNodes.FirstOrDefault(id => id.RootAssetNodeId == assetNode.RootAssetNodeId).Reference;
                        }


                        user = new ApplicationUser
                        {
                            FirstName = applicationUser.FirstName,
                            LastName = applicationUser.LastName,
                            Email = applicationUser.Email,
                            UserName = applicationUser.Email,
                            DateStamp = DateTime.Now,
                            Reference = applicationUser.Reference,
                            CountryId = 203,
                            Role = applicationUser.Role
                        };

                        var password = CreatePassword(6);

                        var userResult = await _userManager.CreateAsync(user, password);

                         if (applicationUser.Role == "ADMINISTRATOR")
                        {
                            await _userManager.AddToRoleAsync(user, "ADMINISTRATOR");
                            user.IsAdmin = true;
                        }
                        else if (applicationUser.Role == "USER")
                        {
                            await _userManager.AddToRoleAsync(user, "USER");
                            user.IsUser = true;
                        }
                        else
                        {
                            await _userManager.AddToRoleAsync(user, "GUEST");
                            user.IsGuest = true;
                        }

                        _context.Users.Update(user);

                        List<int> tempGI = new List<int>();
                        tempGI.Add(applicationUser.GroupIds);

                        List<int> groupIds = tempGI;

                        foreach (int groupId in groupIds)
                        {
                            Group group = _context.Groups.FirstOrDefault(id => id.GroupId == groupId);
                            AssetNode accessFromAssetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == group.AssetNodeId);

                            List<AssetNode> assetNodes = _context.AssetNodes.Where(id => (id.RootAssetNodeId == accessFromAssetNode.RootAssetNodeId) 
                            && (id.AssetNodeId > accessFromAssetNode.AssetNodeId)).ToList();

                            foreach (var item in assetNodes)
                            {
                                UserGroup userGroup = new UserGroup();
                                userGroup.GroupId = item.GroupId;
                                userGroup.UserId = user.Id;
                                userGroup.RootId = item.RootAssetNodeId;

                                UserGroup userGroupChecker = _context.UserGroups.FirstOrDefault(id => (id.GroupId == groupId) && (id.UserId == user.Id));

                                if (userGroupChecker == null)
                                {
                                    _context.UserGroups.Add(userGroup);
                                    _context.SaveChanges();
                                }
                            }
                        }

                        foreach (var assignedModule in applicationUser.AssignedBinmakModulesIds)
                        {
                            BinmakModuleAccess binmakModule = new BinmakModuleAccess();
                            binmakModule.BinmakModuleId = assignedModule;
                            binmakModule.Reference = user.Id;
                            binmakModule.DateStamp = DateTime.Now;

                            _context.BinmakModuleAccesses.Add(binmakModule);
                        }

                        _context.SaveChanges();

                        if (userResult != IdentityResult.Success)
                        {
                            response = "Account for " + applicationUser.Email + " Could Not Be Created At This Time. Try again. ";
                            return BadRequest(response);
                        }
                        else
                        {

                            SmtpMail oMail = new SmtpMail("TryIt");
                            //System: Office 365 email address
                            oMail.From = "registration@binmak.com";
                            //Email To
                            oMail.To = applicationUser.Email;
                            // Set email subject
                            oMail.Subject = "Binmak Software Account";
                            // Set email body
                            oMail.HtmlBody = "<html><body>Hi " + applicationUser.FirstName + ", <br/>Your account to Binmak Software has created sucessfully: <br/><br/>Link: http://binmakdev.dedicated.co.za <br/>Username: " + applicationUser.Email + "<br/>Password: " + password + "<br/><p>Binmak</p></body></html></body></html>";
                            // Your Office 365 SMTP server address,
                            SmtpServer oServer = new SmtpServer("smtp.office365.com");
                            oServer.User = "registration@binmak.com";
                            oServer.Password = "Binmak@001";

                            // Set 587 port
                            oServer.Port = 587;
                            // detect SSL/TLS connection automatically
                            oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;

                            SmtpClient oSmtp = new SmtpClient();
                            oSmtp.SendMail(oServer, oMail);

                        }
                    }

                    return Ok();
                }
                catch (Exception Ex)
                {
                    return BadRequest("Could not create account for: " + applicationUser.Email + " " + Ex.Message);
                }
            }
            return BadRequest("Model not valid ");
        }

        [HttpPost("systemAccount")]
        public async Task<IActionResult> CreateSystemAccount([FromBody] ApplicationUserVM applicationUser)
        {

            try
            {
                string response = "";

                if (applicationUser == null)
                {
                    return BadRequest("Invalid User Data");
                }

                var user = await _userManager.FindByEmailAsync(applicationUser.Email);

                if (user == null)
                {

                    user = new ApplicationUser
                    {
                        FirstName = applicationUser.FirstName,
                        LastName = applicationUser.LastName,
                        Email = applicationUser.Email,
                        UserName = applicationUser.Email,
                        DateStamp = DateTime.Now,
                        CompanyId = CreateCompany(applicationUser.CompanyName).CompanyId,
                        CountryId = applicationUser.CountryId,
                        Address = applicationUser.Address,
                        Address2 = applicationUser.Address2,
                        City = applicationUser.City,
                        Zip = applicationUser.Zip,
                        IsSuperAdmin = true,
                        IsAccountOwner = true,
                        Role = "ADMINISTRATOR"
                    };


                    var userResult = await _userManager.CreateAsync(user, applicationUser.Password);

                    if (userResult != IdentityResult.Success)
                    {
                        response = "Account for " + applicationUser.Email + " Could Not Be Created At This Time. Try again. ";
                        return BadRequest(response);
                    }
                    else
                    {

                        if (user.Role == "ADMINISTRATOR")
                        {
                            await _userManager.AddToRoleAsync(user, "ADMINISTRATOR");
                            user.IsAdmin = true;
                        }
                    else if (user.Role == "USER")
                    {
                        await _userManager.AddToRoleAsync(user, "USER");
                        user.IsUser = true;
                    }
                    else
                        {
                            await _userManager.AddToRoleAsync(user, "GUEST");
                        user.IsUser = true;
                    }

                    foreach (var bm in _context.BinmakModules.ToList())
                    {
                        BinmakModuleAccess binmakModule = new BinmakModuleAccess();
                        binmakModule.BinmakModuleId = bm.BinmakModuleId;
                        binmakModule.Reference = user.Id;
                        binmakModule.DateStamp = DateTime.Now;

                        _context.BinmakModuleAccesses.Add(binmakModule);
                    }

                    _context.SaveChanges();

                    SmtpMail oMail = new SmtpMail("TryIt");
                    //System: Office 365 email address
                    oMail.From = "registration@binmak.com";
                    //Email To
                    oMail.To = applicationUser.Email;
                    // Set email subject
                    oMail.Subject = "Binmak Software System Account";
                    // Set email body
                    oMail.HtmlBody = "<html><body>Hi " + applicationUser.FirstName + ", <br/>Your account to Binmak Software System has created sucessfully: <br/><br/>Link: http://binmakdev.dedicated.co.za <br/>Domain: " + applicationUser.CompanyName + "<br/>Username: " + applicationUser.Email + "<br/><p>Binmak</p></body></html></body></html>";
                    // Your Office 365 SMTP server address,
                    SmtpServer oServer = new SmtpServer("smtp.office365.com");
                    oServer.User = "registration@binmak.com";
                    oServer.Password = "Binmak@001";

                    // Set 587 port
                    oServer.Port = 587;
                    // detect SSL/TLS connection automatically
                    oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;

                    SmtpClient oSmtp = new SmtpClient();
                    oSmtp.SendMail(oServer, oMail);

                    }
                }
                else
                {
                    return BadRequest("Account already created! Choose different email or sign-in");
                }

                    
            }
            catch (Exception Ex)
            {
                return BadRequest("Could not create account for: " + applicationUser.Email + " " + Ex.Message);
            }

            return Ok();
        }
    

        public Company CreateCompany(string CompanyName)
        {
            Company company = new Company();
            company.DateStamp = DateTime.Now;
            company.CompanyName = CompanyName;
            _context.Companies.Add(company);
            _context.SaveChanges();

            return company;
        }

        [HttpGet("countries")]
        public IActionResult GetCountries()
        {
            try
            {
                return Ok(_context.Countries.ToList());
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened! " + Ex.Message);
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody] Login model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Email);
                if (user != null)
                {
                    if (user.IsLocked)
                    {
                        return BadRequest("User is currently locked, ask administrator to unlock you!");
                    }

                    if (user.IsDeleted)
                    {
                        return BadRequest("User is deleted, ask administrator for reinstatement!");
                    }

                    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (result.Succeeded)
                    {
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Id ),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
                            new Claim(JwtRegisteredClaimNames.Email, user.UserName)
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysupersedkjhulfgyuerfw344cret"));

                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: "http://binmakdev.dedicated.co.za:81",
                            audience: "http://binmakdev.dedicated.co.za:80",
                            claims: claims,
                            expires: DateTime.UtcNow.AddDays(29),
                            signingCredentials: creds);

                        var results = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            userId = token.Subject,
                            username = user.UserName,
                            firstName = user.FirstName,
                            lastName = user.LastName,
                            isSuperAdmin = user.IsSuperAdmin,
                            isBinmak = user.IsBinmak,
                            isUser = user.IsUser,
                            isGuest = user.IsGuest,
                            isAdmin = user.IsAdmin,
                            role = user.Role,
                            binmakModules = GetBinmakModulesByUser(user.Id),
                            assignedAssetNodes = GetAssetNodesByUser(user.Id),
                            topAssetNode = GetTopAssetNodesByUser(user.Id),
                        };

                        return Created("", results);
                    }
                    else
                    {
                        return BadRequest("Login Failed, Wrong Username/Password");
                    }
                }
                else
                {
                    return BadRequest("Account Does Not Exist, Please Register First");
                }
            }
            return BadRequest("Login Failed");
        }

        [HttpGet("admins")]
        public IActionResult Lookups()
        {
            try
            {
                var users = _context.Users.Where(x => x.Email != "admin@m-theth.co.za");

                return Ok(users);
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened. " + Ex.Message);
            }
        }

        [HttpPost("deleteUser")]
        public IActionResult DeleteUser([FromBody] BinmakBackEnd.Models.DeleteUser model)
        {
            if (model.Id == "" || model.Reference == "")
            {
                return BadRequest("Error, Make sure user is selected.");
            }

            try
            {
                if (model.Id == model.Reference)
                {
                    return BadRequest("Error, You can not delete yourself.");
                }

                ApplicationUser applicationUser = _context.Users.FirstOrDefault(id => id.Id == model.Id);

                if (applicationUser != null)
                {
                    applicationUser.IsDeleted = true;
                    _context.Users.Update(applicationUser);
                    _context.SaveChanges();
                }

                return Ok();
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened. " + Ex.Message);
            }
        }

        [HttpPost("reinstate")]
        public IActionResult ReinstateUser([FromBody] BinmakBackEnd.Models.DeleteUser model)
        {
            if (model.Id == "" || model.Reference == "")
            {
                return BadRequest("Error, Make sure user is selected.");
            }

            try
            {
                if (model.Id == model.Reference)
                {
                    return BadRequest("Error, You can not re-instate yourself.");
                }

                ApplicationUser applicationUser = _context.Users.FirstOrDefault(id => id.Id == model.Id);

                if (applicationUser != null)
                {
                    applicationUser.IsDeleted = false;
                    _context.Users.Update(applicationUser);
                    _context.SaveChanges();
                }

                return Ok();
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened. " + Ex.Message);
            }
        }

        [HttpGet("users")]
        public IActionResult GetAssetAdmins(string reference)
        {
            try
            {
                UserGroup userGroup = _context.UserGroups.FirstOrDefault(id => id.UserId == reference);

                if (userGroup == null)
                {
                    return BadRequest("Something bad happened. Make sure you have added atleast one asset node");
                }

                int groupId = userGroup.RootId;

                List<UserGroup> userGroups = _context.UserGroups.Where(id => id.RootId == groupId).ToList();
                
                List<string> refs = new List<string>();

                foreach (var ug in userGroups)
                {
                    refs.Add(ug.UserId);
                }

                var usersDist = refs.Distinct().ToList();

                List<ApplicationUser> users = new List<ApplicationUser>();

                foreach (var r in usersDist)
                {
                    users.Add(_context.Users.FirstOrDefault(x => x.Id == r));
                }

                var assetUsers = users.Select(result => new
                {
                    Id = result.Id,
                    Name = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    Date = result.DateStamp,
                    AssignedBinmakModules = GetBinmakModulesByUser(result.Id),
                    AssignedBinmakModulesIds = GetBinmakModulesByUserIds(result.Id),
                    AssignedAssetNodes = GetAssetNodesByUser(result.Id),
                    AssignedAssetNodesIds = GetAssetNodesIdsByUser(result.Id),
                    TopAssetNode = GetTopAssetNodesByUser(result.Id),
                    GroupAssetNodes = GetAssetNodesByRoot(result.Id),
                    IsDeleted = result.IsDeleted,
                    Role = result.Role,
                    BinmakModules = GetBinmakModulesByUserIds(),
                    RootId = result.RootId
                });

            return Ok(assetUsers);
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened. " + Ex.Message);
            }
        }


        [HttpPost("updateUser")]
        public IActionResult UpdateUser([FromBody] BinmakBackEnd.Models.UpdateUser updateUser)
        {
            if (updateUser == null)
            {
                return BadRequest("Something bad happened. Make sure user is selected");
            }
            try
            {
                ApplicationUser applicationUser = _context.Users.FirstOrDefault(id => id.Id == updateUser.Id);

                int rootId = updateUser.RootId;
                bool isTopRoot;

                AssetNode assetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == rootId);
                if (assetNode.ParentAssetNodeId == 0)
                {
                    isTopRoot = true;
                }
                else
                {
                    isTopRoot = false;
                }

                if (isTopRoot)
                {
                    applicationUser.Reference = assetNode.Reference;
                }
                else
                {
                    applicationUser.Reference = _context.AssetNodes.FirstOrDefault(id => id.RootAssetNodeId == assetNode.RootAssetNodeId).Reference;
                }

                applicationUser.Role = updateUser.Role;
                applicationUser.FirstName = updateUser.FirstName;
                applicationUser.LastName = updateUser.LastName;

                if (updateUser.Role == "ADMINISTRATOR")
                {
                    applicationUser.IsAdmin = true;
                    applicationUser.IsUser = false;
                    applicationUser.IsGuest = false;

                }
                else if (updateUser.Role == "USER")
                {
                    applicationUser.IsUser = true;
                    applicationUser.IsAdmin = false;
                    applicationUser.IsGuest = false;
                }
                else
                {
                    applicationUser.IsGuest = true;
                    applicationUser.IsAdmin = false;
                    applicationUser.IsUser = false;
                }

                //Updating modules
                List<BinmakModuleAccess> binmakModuleAccesses = _context.BinmakModuleAccesses.Where(id => id.Reference == updateUser.Id).ToList();

                _context.BinmakModuleAccesses.RemoveRange(binmakModuleAccesses);
                _context.SaveChanges();

                List<BinmakModule> binmakModules = new List<BinmakModule>();
                foreach (int item in updateUser.BinmakModuleId)
                {
                    binmakModules.Add(_context.BinmakModules.FirstOrDefault(id => id.BinmakModuleId == item));
                }

                foreach (var item in binmakModules)
                {
                    BinmakModuleAccess binmakModule = new BinmakModuleAccess();
                    binmakModule.BinmakModuleId = item.BinmakModuleId;
                    binmakModule.Reference = updateUser.Id;

                    _context.BinmakModuleAccesses.Add(binmakModule);
                }

                _context.SaveChanges();

                List<UserGroup> userGroupsToBeRemoved = _context.UserGroups.Where(id => id.UserId == updateUser.Id).ToList();
                _context.RemoveRange(userGroupsToBeRemoved);
                _context.SaveChanges();

                List<UserGroup> userGroups = new List<UserGroup>();

                AssetNode assetNodes = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == updateUser.AssignedAssetsNode);
                List<AssetNode> assetNodes1 = new List<AssetNode>();

                if (assetNodes.RootAssetNodeId == 0)
                {
                    assetNodes1 = _context.AssetNodes.Where(id => (id.RootAssetNodeId == assetNodes.AssetNodeId) || (id.AssetNodeId >= assetNodes.AssetNodeId)).ToList();
                }
                else
                {
                    assetNodes1 = _context.AssetNodes.Where(id => (id.RootAssetNodeId == assetNodes.RootAssetNodeId) && (id.AssetNodeId >= assetNodes.AssetNodeId)).ToList();
                }

                
                var orderAssetNodes = assetNodes1.OrderBy(id => id.AssetNodeId).ToList();
                var lastItem = orderAssetNodes.LastOrDefault();
                int rootLatItem = 0;
                if (lastItem.RootAssetNodeId == 0)
                {
                    rootLatItem = lastItem.AssetNodeId;
                }
                else
                {
                    rootLatItem = lastItem.RootAssetNodeId;
                }

                List<AssetNode> assetNodes2 = assetNodes1.Where(id => (id.RootAssetNodeId == rootLatItem) || (id.AssetNodeId <= updateUser.AssignedAssetsNode)).ToList();

                foreach (var item in assetNodes2)
                {
                    UserGroup userGroup = new UserGroup();
                    userGroup.RootId = rootLatItem;
                    userGroup.GroupId = _context.Groups.FirstOrDefault(id=>id.AssetNodeId == item.AssetNodeId).GroupId;
                    userGroup.UserId = updateUser.Id;
                    _context.UserGroups.Add(userGroup);
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened. " + Ex.Message);
            }
        }

        public List<BinmakModule> GetBinmakModulesByUserIds()
        {
            List<BinmakModule> binmakModules = _context.BinmakModules.ToList();

            return binmakModules;
        }

        public List<int> GetBinmakModulesByUserIds(string userId)
        {
            List<BinmakModuleAccess> binmakModuleAccess = _context.BinmakModuleAccesses.Where(id => id.Reference == userId).ToList();
            List<int> binmakModules = new List<int>();

            foreach (var bma in binmakModuleAccess)
            {
                binmakModules.Add(_context.BinmakModules.FirstOrDefault(id => id.BinmakModuleId == bma.BinmakModuleId).BinmakModuleId);
            }

            return binmakModules;
        }

        public List<BinmakModule> GetBinmakModulesByUser(string userId)
        {
            List<BinmakModuleAccess> binmakModuleAccess = _context.BinmakModuleAccesses.Where(id => id.Reference == userId).ToList();
            List<BinmakModule> binmakModules = new List<BinmakModule>();

            foreach (var bma in binmakModuleAccess)
            {
                binmakModules.Add(_context.BinmakModules.FirstOrDefault(id => id.BinmakModuleId == bma.BinmakModuleId));
            }

            return binmakModules;
        }

        public List<AssetNode> GetAssetNodesByUser(string userId)
        {
            List<UserGroup> userGroups = _context.UserGroups.Where(id => id.UserId == userId).ToList();
            List<AssetNode> assetNodes = new List<AssetNode>();

            foreach (var bma in userGroups)
            {
                Group group = _context.Groups.FirstOrDefault(id => id.GroupId == bma.GroupId);
                if (group == null)
                {
                    return null;
                }
                AssetNode assetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == group.AssetNodeId);
                assetNodes.Add(assetNode);
            }

            return assetNodes;
        }

        public List<AssetNode> GetAssetNodesByRoot(string userId)
        {
            List<UserGroup> userGroups1 = _context.UserGroups.Where(id => id.UserId == userId).OrderBy(id => id.GroupId).ToList();
            List<AssetNode> assetNodes = new List<AssetNode>();

            foreach (var bma in userGroups1)
            {
                Group group = _context.Groups.FirstOrDefault(id => id.GroupId == bma.GroupId);
                if (group == null)
                {
                    return null;
                }
                AssetNode assetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == group.AssetNodeId);
                assetNodes.Add(assetNode);
            }

            AssetNode lastAssetNode = assetNodes.LastOrDefault();
            if (lastAssetNode == null)
            {
                return new List<AssetNode>();
            }

            List<AssetNode> assetNodes2 = _context.AssetNodes.Where(r => r.RootAssetNodeId == lastAssetNode.RootAssetNodeId).ToList();

            if (lastAssetNode.RootAssetNodeId == 0)
            {
                AssetNode root = _context.AssetNodes.FirstOrDefault(r => r.AssetNodeId == lastAssetNode.AssetNodeId);
                assetNodes2.Add(root);
            }
            else
            {
                AssetNode root = _context.AssetNodes.FirstOrDefault(r => r.AssetNodeId == lastAssetNode.RootAssetNodeId);
                assetNodes2.Add(root);
            }

            List<AssetNode> orderedAN = assetNodes2.OrderBy(id => id.AssetNodeId).ToList();

            return orderedAN;

        }

        public List<int> GetAssetNodesIdsByUser(string userId)
        {
            List<UserGroup> userGroups = _context.UserGroups.Where(id => id.UserId == userId).ToList();
            List<int> assetNodes = new List<int>();

            foreach (var bma in userGroups)
            {
                Group group = _context.Groups.FirstOrDefault(id => id.GroupId == bma.GroupId);
                if (group == null)
                {
                    return null;
                }
                AssetNode assetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == group.AssetNodeId);
                assetNodes.Add(assetNode.AssetNodeId);
            }

            return assetNodes;
        }

        public AssetNode GetTopAssetNodesByUser(string userId)
        {
            List<UserGroup> userGroups = _context.UserGroups.Where(id => id.UserId == userId).ToList();
            List<UserGroup> userGroups1 = userGroups.OrderBy(id => id.GroupId).ToList();
            List<AssetNode> assetNodes = new List<AssetNode>();

            foreach (var bma in userGroups1)
            {
                Group group = _context.Groups.FirstOrDefault(id => id.GroupId == bma.GroupId);
                if (group == null)
                {
                    return null;
                }
                AssetNode assetNode = _context.AssetNodes.FirstOrDefault(id => id.AssetNodeId == group.AssetNodeId);
                assetNodes.Add(assetNode);
            }

            if (assetNodes.Count > 0)
            {
                return assetNodes[0];
            }

            return null;
        }

        [HttpGet("lookups")]
        public IActionResult Admins()
        {
            try
            {
                var templates = new Dictionary<string, object>();

                templates.Add("template", new List<object>());

                return Ok();
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happaned! " + Ex.Message);
            }
        }

    }
}