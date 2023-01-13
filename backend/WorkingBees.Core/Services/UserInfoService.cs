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

        public List<UserInfo> ListAll()
        {
            return _userRepository.ListAll();
        }
        public List<UserInfo> Listallbyuserid(long userId)
        {
            return _userRepository.ListAllByUserId(userId);
        }
        public bool Insert(UserInfo user)
        {
            return _userRepository.Insert(user);
        }
        public bool Update(long id, UserInfo user)
        {
            return _userRepository.Update(id, user);
        }

        public bool Delete(long id)
        {
            return _userRepository.Delete(id);
        }

        public UserCompleteInfo CompileUserInfo(long userId)
        {
            UserInfo userInfo = _userRepository.ListAllByUserId(userId)[0];
            var skills = _skillRepository.ListAllByUserId(userId);
            var experiences = _experienceRepository.ListAllByUserId(userId);
            var socialMedias = _socialMediaInfoRepository.ListAllByUserId(userId);

            var userCompleteInfo = new UserCompleteInfo(userInfo.UserId, userInfo.Name, userInfo.PhoneNumber, userInfo.Email, userInfo.City, userInfo.State, userInfo.ProfileImageUrl, skills, experiences, socialMedias);

            return userCompleteInfo;
        }
    }
}
