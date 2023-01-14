using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBeesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
    [EnableCors("PolicyCors")]
    [Authorize]
    public class UserInfoController : Controller
    {
        private readonly IService<UserInfo> _userService;
        private readonly IUserCompleteInfoService _userCompleteInfoService;
        private readonly IMapper _mapper;

        public UserInfoController(IService<UserInfo> userService, IMapper mapper, IUserCompleteInfoService userCompleteInfoService)
        {
            _userService = userService;
            _userCompleteInfoService = userCompleteInfoService;
            _mapper = mapper;
        }

        [HttpGet("/Users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public ActionResult<List<UserInfo>> ListAllUsers()
        {
            return Ok(_userService.ListAll());
        }

        [HttpGet("/User/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public ActionResult<UserInfo> GetUserByUserId(long userId)
        {
            var user = _userService.Listallbyuserid(userId).FirstOrDefault();
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("/UserCompleteInfo/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public ActionResult<UserCompleteInfo> GetUserCompleteInfo(long userId)
        {
            var user = _userCompleteInfoService.CompileUserInfo(userId);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost("/User")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public ActionResult<bool> InsertUser(UserInfoDto userDto)
        {
            UserInfo userMapped = _mapper.Map<UserInfo>(userDto);
            var result = _userService.Insert(userMapped);
            return CreatedAtAction(nameof(InsertUser), result);
        }

        [HttpPut("/User/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateUser(long id, UserInfoDto userInfoDto)
        {
            UserInfo userMapped = _mapper.Map<UserInfo>(userInfoDto);
            _userService.Update(id, userMapped);
            return NoContent();
        }

        [HttpDelete("/User/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser(long id)
        {
            if (!_userService.Delete(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
