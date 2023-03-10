using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace workingBeesAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	[EnableCors("PolicyCors")]
	[AllowAnonymous]
	public class TokenController : ControllerBase
	{
		private readonly IService<UserInfo> _userService;
		public ITokenService _tokenService;
		public TokenController(IService<UserInfo> userService, ITokenService tokenService)
		{
			_userService = userService;
			_tokenService = tokenService;
		}

		[HttpGet("/Token/{id}")]
		public async Task<IActionResult> CreateToken(long id)
		{
			var user = (await _userService.ListallbyuseridAsync(id)).FirstOrDefault();
			if (user == null)
			{
				return BadRequest();
			}

			return Ok(_tokenService.GenerateToken(user.Name!, user.UserRole!));
		}
	}
}