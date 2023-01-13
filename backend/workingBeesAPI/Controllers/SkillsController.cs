using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace workingBeesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
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
        public ActionResult<List<Skill>> ListAllSkills()
        {
            return Ok(_skillService.ListAll());
        }

        [HttpGet("/Skills/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<Skill>> ListSkillsByUserId(long userId)
        {
            var skillsList = _skillService.Listallbyuserid(userId);
            if (skillsList == null) return NotFound();
            return Ok(skillsList);
        }

        [HttpPost("/Skill")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        //[ServiceFilter(typeof(CheckIfSkillExistsActionFilter))]
        public ActionResult<bool> InsertSkill(SkillDto skillDto)
        {
            Skill skillMapped = _mapper.Map<Skill>(skillDto);
            var result = _skillService.Insert(skillMapped);
            return CreatedAtAction(nameof(InsertSkill), result);
        }

        [HttpPut("/Skill/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[ServiceFilter(typeof(CheckIfEventIdRegisteredActionFilter))]
        public IActionResult UpdateSkill(long id, SkillDto skillDto)
        {
            Skill skillMapped = _mapper.Map<Skill>(skillDto);
            _skillService.Update(id, skillMapped);
            return NoContent();
        }

        [HttpDelete("/Skill/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteSkill(long id)
        {
            if (!_skillService.Delete(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}