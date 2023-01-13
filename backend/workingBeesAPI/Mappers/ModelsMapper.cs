using AutoMapper;
using WorkingBees.Core.Models;
using WorkingBees.Core.Models.Dtos;

namespace workingBeesAPI.Mappers
{
    public class ModelsMapper : Profile
    {
        public ModelsMapper()
        {
            CreateMap<SkillDto, Skill>();
            CreateMap<ExperienceDto, Experience>();
            CreateMap<SocialMediaInfoDto, SocialMediaInfo>();
            CreateMap<UserInfoDto, UserInfo>();
        }
    }
}
