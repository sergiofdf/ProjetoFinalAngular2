using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace workingBeesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly IService<UserInfo> _userService;
        public ITokenService _tokenService;
        public TokenController(IService<UserInfo> userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<IActionResult> CreateToken(long id)
        {
            var user = _userService.Listallbyuserid(id).FirstOrDefault();
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(_tokenService.GenerateToken(user.Name, user.UserRole));
        }
    }
}