using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models.Dtos;
using WorkingBees.Core.Models;

namespace WorkingBeesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
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
        public ActionResult<List<SocialMediaInfo>> ListAllSocialMediaInfos()
        {
            return Ok(_socialMediaInfoService.ListAll());
        }

        [HttpGet("/socialmediainfos/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
