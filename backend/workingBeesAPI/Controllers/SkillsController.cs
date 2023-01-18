using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace workingBeesAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	[Consumes("application/json")]
	[Produces("application/json")]
	[EnableCors("PolicyCors")]
	[Authorize]
	public class SkillsController : ControllerBase
	{
		private readonly IService<Skill> _skillService;
		private readonly IMapper _mapper;

		public SkillsController(IService<Skill> skillService, IMapper mapper)
		{
			_skillService = skillService;
			_mapper = mapper;
		}

		[HttpGet("/Skills")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[AllowAnonymous]
		public async Task<ActionResult<List<Skill>>> ListAllSkills()
		{
			return Ok(await _skillService.ListAllAsync());
		}

		[HttpGet("/Skills/{userId}/id")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[AllowAnonymous]
		public async Task<ActionResult<List<Skill>>> ListSkillsByUserId(long userId)
		{
			var skillsList = await _skillService.ListallbyuseridAsync(userId);
			if (skillsList == null) return NotFound();
			return Ok(skillsList);
		}

		[HttpPost("/Skill")]
		[ProducesResponseType(StatusCodes.Status201Created)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status409Conflict)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[Authorize(Roles = "Admin, Usuário")]
		public async Task<ActionResult<bool>> InsertSkill(SkillDto skillDto)
		{
			Skill skillMapped = _mapper.Map<Skill>(skillDto);
			var result = await _skillService.InsertAsync(skillMapped);
			return CreatedAtAction(nameof(InsertSkill), result);
		}

		[HttpPut("/Skill/{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[Authorize(Roles = "Admin, Usuário")]
		public async Task<IActionResult> UpdateSkill(long id, SkillDto skillDto)
		{
			Skill skillMapped = _mapper.Map<Skill>(skillDto);
			await _skillService.UpdateAsync(id, skillMapped);
			return NoContent();
		}

		[HttpDelete("/Skill/{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[Authorize(Roles = "Admin, Usuário")]
		public async Task<IActionResult> DeleteSkill(long id)
		{
			if (!await _skillService.DeleteAsync(id))
			{
				return NotFound();
			}
			return NoContent();
		}
	}
}