using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Core.Services
{
    public class UserInfoService : IService<UserInfo>, IUserCompleteInfoService
    {
        public readonly IRepository<UserInfo> _userRepository;
        public readonly IRepository<Skill> _skillRepository;
        public readonly IRepository<Experience> _experienceRepository;
        public readonly IRepository<SocialMediaInfo> _socialMediaInfoRepository;
        public UserInfoService(
            IRepository<UserInfo> userRepository,
            IRepository<Skill> skillRepository,
            IRepository<Experience> experienceRepository,
            IRepository<SocialMediaInfo> socialMediaInfoRepository
            )
        {
            _userRepository = userRepository;
            _skillRepository = skillRepository;
            _experienceRepository = experienceRepository;
            _socialMediaInfoRepository = socialMediaInfoRepository;
        }

        public async Task<List<UserInfo>> ListAllAsync()
        {
            return await _userRepository.ListAllAsync();
        }
        public async Task<List<UserInfo>> ListallbyuseridAsync(long userId)
        {
            return await _userRepository.ListAllByUserIdAsync(userId);
        }
        public async Task<bool> InsertAsync(UserInfo userInfo)
        {
            return await _userRepository.InsertAsync(userInfo);
        }
        public async Task<bool> UpdateAsync(long id, UserInfo userInfo)
        {
            return await _userRepository.UpdateAsync(id, userInfo);
        }

        public async Task<bool> DeleteAsync(long userId)
        {
            var skills = await _skillRepository.ListAllByUserIdAsync(userId);
            foreach (var skill in skills)
            {
                await _skillRepository.DeleteAsync(skill.SkillId);
            }
            var experiences = await _experienceRepository.ListAllByUserIdAsync(userId);
            foreach (var experience in experiences)
            {
                await _experienceRepository.DeleteAsync(experience.ExperienceId);
            }
            var socialMedias = await _socialMediaInfoRepository.ListAllByUserIdAsync(userId);
            foreach (var socialMedia in socialMedias)
            {
                await _socialMediaInfoRepository.DeleteAsync(socialMedia.SocialMediaInfoId);
            }
            return await _userRepository.DeleteAsync(userId);
        }

        public async Task<UserCompleteInfo> CompileUserInfoAsync(long userId)
        {
            UserInfo userInfo = (await _userRepository.ListAllByUserIdAsync(userId)).First();
            var skills = await _skillRepository.ListAllByUserIdAsync(userId);
            var experiences = await _experienceRepository.ListAllByUserIdAsync(userId);
            var socialMedias = await _socialMediaInfoRepository.ListAllByUserIdAsync(userId);

            var userCompleteInfo = new UserCompleteInfo(userInfo.UserId, userInfo.Name, userInfo.PhoneNumber, userInfo.Email, userInfo.City, userInfo.State, userInfo.ProfileImageUrl, skills, experiences, socialMedias);

            return userCompleteInfo;
        }
    }
}
