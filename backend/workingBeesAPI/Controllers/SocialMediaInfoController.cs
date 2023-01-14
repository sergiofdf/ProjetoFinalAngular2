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
    public class SocialMediaInfoController : ControllerBase
    {
        private readonly IService<SocialMediaInfo> _socialMediaInfoService;
        private readonly IMapper _mapper;

        public SocialMediaInfoController(IService<SocialMediaInfo> socialMediaInfoService, IMapper mapper)
        {
            _socialMediaInfoService = socialMediaInfoService;
            _mapper = mapper;
        }

        [HttpGet("/socialmediainfos")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public ActionResult<List<SocialMediaInfo>> ListAllSocialMediaInfos()
        {
            return Ok(_socialMediaInfoService.ListAll());
        }

        [HttpGet("/socialmediainfos/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public ActionResult<List<SocialMediaInfo>> ListSocialMediaInfosByUserId(long userId)
        {
            var socialmediainfosList = _socialMediaInfoService.Listallbyuserid(userId);
            if (socialmediainfosList == null) return NotFound();
            return Ok(socialmediainfosList);
        }

        [HttpPost("/socialmediainfos")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public ActionResult<bool> InsertExperience(SocialMediaInfoDto socialMediaInfoDto)
        {
            SocialMediaInfo socialMediaInfoMapped = _mapper.Map<SocialMediaInfo>(socialMediaInfoDto);
            var result = _socialMediaInfoService.Insert(socialMediaInfoMapped);
            return CreatedAtAction(nameof(InsertExperience), result);
        }

        [HttpPut("/socialmediainfos/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateExperience(long id, SocialMediaInfoDto socialMediaInfoDto)
        {
            SocialMediaInfo socialMediaInfoMapped = _mapper.Map<SocialMediaInfo>(socialMediaInfoDto);
            _socialMediaInfoService.Update(id, socialMediaInfoMapped);
            return NoContent();
        }

        [HttpDelete("/socialmediainfos/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteExperience(long id)
        {
            if (!_socialMediaInfoService.Delete(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
