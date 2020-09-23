using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models;
using BinmakBackEnd.Areas.AssetHealth.Models.Respositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BinmakBackEnd.Areas.AssetHealth.Controllers
{
    public class UserSettingController : GenericController<UserSetting, int>
    {
        public readonly BinmakDbContext _context;
        public UserSettingController(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId([FromRoute]string id)
        {
            var userSettingRepository = new UserSettingRepository(_context);
            var data = userSettingRepository.FindByUserId(id);
            if (data == null)
            {
                userSettingRepository.Add(new UserSetting
                {
                    UserId = id
                });
                return StatusCode(StatusCodes.Status404NotFound, "Not Found");
            }
            return Ok(data);
        }

    }
}