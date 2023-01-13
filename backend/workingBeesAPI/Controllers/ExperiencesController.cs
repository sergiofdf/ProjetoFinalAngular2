using AutoMapper;
using Microsoft.AspNetCore.Http;
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
        public ActionResult<List<Experience>> ListAllExperiences()
        {
            return Ok(_experienceService.ListAll());
        }

        [HttpGet("/experiences/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<Experience>> ListExperiencesByUserId(long userId)
        {
            var experiencesList = _experienceService.Listallbyuserid(userId);
            if (experiencesList == null) return NotFound();
            return Ok(experiencesList);
        }

        [HttpPost("/experience")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public ActionResult<bool> InsertExperience(ExperienceDto experienceDto)
        {
            Experience experienceMapped = _mapper.Map<Experience>(experienceDto);
            var result = _experienceService.Insert(experienceMapped);
            return CreatedAtAction(nameof(InsertExperience), result);
        }

        [HttpPut("/experience/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateExperience(long id, ExperienceDto experienceDto)
        {
            Experience experienceMapped = _mapper.Map<Experience>(experienceDto);
            _experienceService.Update(id, experienceMapped);
            return NoContent();
        }

        [HttpDelete("/experience/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteExperience(long id)
        {
            if (!_experienceService.Delete(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
