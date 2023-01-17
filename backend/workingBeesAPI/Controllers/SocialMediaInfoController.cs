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
        public async Task<ActionResult<List<SocialMediaInfo>>> ListAllSocialMediaInfos()
        {
            return Ok(await _socialMediaInfoService.ListAllAsync());
        }

        [HttpGet("/socialmediainfos/{userId}/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<ActionResult<SocialMediaInfo>> ListSocialMediaInfosByUserId(long userId)
        {
            var socialmediainfo = (await _socialMediaInfoService.ListallbyuseridAsync(userId)).FirstOrDefault();
            if (socialmediainfo == null) return NotFound();
            return Ok(socialmediainfo);
        }

        [HttpPost("/socialmediainfos")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin, Usuário")]
        public async Task<ActionResult<bool>> InsertExperience(SocialMediaInfoDto socialMediaInfoDto)
        {
            SocialMediaInfo socialMediaInfoMapped = _mapper.Map<SocialMediaInfo>(socialMediaInfoDto);
            var result = await _socialMediaInfoService.InsertAsync(socialMediaInfoMapped);
            return CreatedAtAction(nameof(InsertExperience), result);
        }

        [HttpPut("/socialmediainfos/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin, Usuário")]
        public async Task<IActionResult> UpdateExperience(long id, SocialMediaInfoDto socialMediaInfoDto)
        {
            SocialMediaInfo socialMediaInfoMapped = _mapper.Map<SocialMediaInfo>(socialMediaInfoDto);
            await _socialMediaInfoService.UpdateAsync(id, socialMediaInfoMapped);
            return NoContent();
        }

        [HttpDelete("/socialmediainfos/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin, Usuário")]
        public async Task<IActionResult> DeleteExperience(long id)
        {
            if (!await _socialMediaInfoService.DeleteAsync(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
