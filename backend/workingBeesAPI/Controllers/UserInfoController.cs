using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;
using WorkingBees.Core.Models.Dtos;

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
        public async Task<ActionResult<List<UserInfoGetDto>>> ListAllUsersUnlogged()
        {
            List<UserInfo> users = await _userService.ListAllAsync();
            List<UserInfoGetDto> usersMapped = new List<UserInfoGetDto>();

            users.ForEach(user =>
            {
                UserInfoGetDto userMapped = _mapper.Map<UserInfoGetDto>(user);
                usersMapped.Add(userMapped);
            });

            return Ok(usersMapped);
        }

        [HttpGet("/Users-full")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<UserInfo>>> ListAllUsers()
        {
            return Ok(await _userService.ListAllAsync());
        }

        [HttpGet("/User/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<ActionResult<UserInfo>> GetUserByUserId(long userId)
        {
            var user = (await _userService.ListallbyuseridAsync(userId)).FirstOrDefault();
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("/UserCompleteInfo/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<ActionResult<UserCompleteInfo>> GetUserCompleteInfo(long userId)
        {
            var user = await _userCompleteInfoService.CompileUserInfoAsync(userId);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost("/User")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> InsertUser(UserInfoDto userDto)
        {
            UserInfo userMapped = _mapper.Map<UserInfo>(userDto);
            var result = await _userService.InsertAsync(userMapped);
            return CreatedAtAction(nameof(InsertUser), result);
        }

        [HttpPut("/User/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Usuário")]
        public async Task<IActionResult> UpdateUser(long id, UserInfoDto userInfoDto)
        {
            UserInfo userMapped = _mapper.Map<UserInfo>(userInfoDto);
            await _userService.UpdateAsync(id, userMapped);
            return NoContent();
        }

        [HttpDelete("/User/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Usuário")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            if (!await _userService.DeleteAsync(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
