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
using System.Net.Mail;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using BinmakAPI.Models;

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

        public AccountController(BinmakDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        string CreatePassword(int length)
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

                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        Credentials = new NetworkCredential("binmak-systems@m-theth.co.za", "Binmak@2020"),
                        Timeout = 20000
                    };

                    using (var message = new MailMessage("binmak-systems@m-theth.co.za", forgotPassword.Email)
                    {
                        IsBodyHtml = true,
                        Subject = "Password Change",
                        Body = "<html><body>Hi " + user.FirstName + ", <br/><br/>Your Password change in Binmak System has been successfully changed, Here are your updated credentials: <br/> Username: " + user.Email + " <br/>Password: " + password + "  <br/><br/><p>Binmak</p></body></html></body></html>"
                    })
                    {
                        smtp.Send(message);
                    }

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
                return BadRequest("Something bad happened! " + Ex.Message);
            }

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

                        user = new ApplicationUser
                        {
                            FirstName = applicationUser.FirstName,
                            LastName = applicationUser.LastName,
                            Email = applicationUser.Email,
                            UserName = applicationUser.Email,
                            DateStamp = DateTime.Now,
                            Reference = applicationUser.Reference,
                        };

                        var password = CreatePassword(6);

                        var userResult = await _userManager.CreateAsync(user, password);

                        if (userResult != IdentityResult.Success)
                        {
                            response = "Account for " + applicationUser.Email + " Could Not Be Created At This Time. Try again. ";
                            return BadRequest(response);
                        }
                        else
                        {

                            var smtp = new SmtpClient
                            {
                                Host = "smtp.gmail.com",
                                Port = 587,
                                EnableSsl = true,
                                DeliveryMethod = SmtpDeliveryMethod.Network,
                                Credentials = new NetworkCredential("binmak-systems@m-theth.co.za", "Binmak@2020"),
                                Timeout = 20000
                            };

                            using (var message = new MailMessage("binmak-systems@m-theth.co.za", applicationUser.Email)
                            {
                                IsBodyHtml = true,
                                Subject = "Binmak Account Details",
                                Body = "<html><body>Hi " + applicationUser.FirstName + ", <br/>Please use the credentials below in order to log in to Binmak Production Flow Application: <br/><br/>Link: http://binmakdev.dedicated.co.za <br/>Username: " + applicationUser.Email + " <br/>Password: " + password + "  <br/><br/><p>Binmak</p></body></html></body></html>"
                            })
                            {
                                smtp.Send(message);
                            }

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
                        IsAdmin = true
                    };

                    var userResult = await _userManager.CreateAsync(user, applicationUser.Password);

                    if (userResult != IdentityResult.Success)
                    {
                        response = "Account for " + applicationUser.Email + " Could Not Be Created At This Time. Try again. ";
                        return BadRequest(response);
                    }
                    else
                    {

                        var smtp = new SmtpClient
                        {
                            Host = "smtp.gmail.com",
                            Port = 587,
                            EnableSsl = true,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            Credentials = new NetworkCredential("binmak-systems@m-theth.co.za", "Binmak@2020"),
                            Timeout = 20000
                        };

                        using (var message = new MailMessage("binmak-systems@m-theth.co.za", applicationUser.Email)
                        {
                            IsBodyHtml = true,
                            Subject = "Binmak Software System Account Details",
                            Body = "<html><body>Hi " + applicationUser.FirstName + ", <br/>Please use the credentials below in order to log in to Binmak Software System: <br/><br/>Link: http://binmakdev.dedicated.co.za <br/>Domain: " + applicationUser.CompanyName + "<br/>Username: " + applicationUser.Email + " <br/>Password: " + applicationUser.Password + "  <br/><br/><p>Binmak</p></body></html></body></html>"
                        })
                        {
                            smtp.Send(message);
                        }

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


        Company CreateCompany(string CompanyName)
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
                            //issuer: "http://localhost:44372",
                            //audience: "http://localhost:4200",
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
                            isAdmin = user.IsAdmin
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

        [HttpGet("users")]
        public IActionResult GetAssetAdmins(string reference)
        {
            try
            {
                var users = _context.Users.Where(x => x.Reference == reference).ToList();

                var assetUsers = users.Select(result => new
                {
                    Id = result.Id,
                    Name = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    Date = result.DateStamp,
                    Reference = _context.Users.FirstOrDefault(id => id.Id == result.Reference).FirstName + " " + _context.Users.FirstOrDefault(id => id.Id == result.Reference).LastName,
                });

                return Ok(assetUsers);
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happened. " + Ex.Message);
            }
        }

        [HttpGet("lookups")]
        public IActionResult Admins()
        {
            try
            {
                var templates = new Dictionary<string, object>();

                var template = _context.Templates.ToList();

                templates.Add("template", template);

                return Ok(templates);
            }
            catch (Exception Ex)
            {
                return BadRequest("Something bad happaned! " + Ex.Message);
            }
        }

        //[HttpPost("OverallProductionProcess")]
        //public IActionResult Post([FromBody] OverallProductionProcess model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id=>id.AssetUserId == model.AssetUserId);
        //        assetUser.IsOverallProductionProcess = model.IsOverallProductionProcess;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. "+Ex.Message);
        //    }
        //}

        //[HttpPost("OverallProductionBuffer")]
        //public IActionResult Post([FromBody] OverallProductionBuffer model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsOverallProductionBuffer = model.IsOverallProductionBuffer;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

        //[HttpPost("DrillBlast")]
        //public IActionResult Post([FromBody] DrillBlast model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsDrillAndBlast = model.IsDrillAndBlast;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

        //[HttpPost("LoadHaul")]
        //public IActionResult Post([FromBody] LoadHaul model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsLoadAndHaul = model.IsLoadAndHaul;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

        //[HttpPost("Support")]
        //public IActionResult Post([FromBody] Support model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsSupport = model.IsSupport;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

        //[HttpPost("She")]
        //public IActionResult Post([FromBody] She model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsShe = model.IsShe;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

        //[HttpPost("FacePrep")]
        //public IActionResult Post([FromBody] FacePrep model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsFacePreparation = model.IsFacePrep;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

        //[HttpPost("EquipStatus")]
        //public IActionResult Post([FromBody] EquipStatus model)
        //{
        //    try
        //    {
        //        AssetUser assetUser = _context.AssetUsers.FirstOrDefault(id => id.AssetUserId == model.AssetUserId);
        //        assetUser.IsEquipmentStatus = model.IsEquipStatus;
        //        _context.AssetUsers.Update(assetUser);
        //        _context.SaveChanges();

        //        return Ok();
        //    }
        //    catch (Exception Ex)
        //    {
        //        return BadRequest("Something bad happened. " + Ex.Message);
        //    }
        //}

    }
}