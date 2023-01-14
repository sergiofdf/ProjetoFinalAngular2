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
    public class ExperiencesController : ControllerBase
    {
        private readonly IService<Experience> _experienceService;
        private readonly IMapper _mapper;

        public ExperiencesController(IService<Experience> experienceService, IMapper mapper)
        {
            _experienceService = experienceService;
            _mapper = mapper;
        }

        [HttpGet("/experiences")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<ActionResult<List<Experience>>> ListAllExperiences()
        {
            return Ok(await _experienceService.ListAllAsync());
        }

        [HttpGet("/experiences/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<ActionResult<List<Experience>>> ListExperiencesByUserId(long userId)
        {
            var experiencesList = await _experienceService.ListallbyuseridAsync(userId);
            if (experiencesList == null) return NotFound();
            return Ok(experiencesList);
        }

        [HttpPost("/experience")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> InsertExperience(ExperienceDto experienceDto)
        {
            Experience experienceMapped = _mapper.Map<Experience>(experienceDto);
            var result = await _experienceService.InsertAsync(experienceMapped);
            return CreatedAtAction(nameof(InsertExperience), result);
        }

        [HttpPut("/experience/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateExperience(long id, ExperienceDto experienceDto)
        {
            Experience experienceMapped = _mapper.Map<Experience>(experienceDto);
            await _experienceService.UpdateAsync(id, experienceMapped);
            return NoContent();
        }

        [HttpDelete("/experience/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteExperience(long id)
        {
            if (!await _experienceService.DeleteAsync(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
