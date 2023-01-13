using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Core.Services
{
    public class SocialMediaInfoService : IService<SocialMediaInfo>
    {
        public readonly IRepository<SocialMediaInfo> _socialMediaInfoRepository;

        public SocialMediaInfoService(IRepository<SocialMediaInfo> socialMediaInfoRepository)
        {
            _socialMediaInfoRepository = socialMediaInfoRepository;
        }
        public List<SocialMediaInfo> ListAll()
        {
            return _socialMediaInfoRepository.ListAll();
        }
        public List<SocialMediaInfo> Listallbyuserid(long userId)
        {
            return _socialMediaInfoRepository.ListAllByUserId(userId);
        }
        public bool Insert(SocialMediaInfo socialMediaInfo)
        {
            return _socialMediaInfoRepository.Insert(socialMediaInfo);
        }
        public bool Update(long id, SocialMediaInfo socialMediaInfo)
        {
            return _socialMediaInfoRepository.Update(id, socialMediaInfo);
        }

        public bool Delete(long id)
        {
            return _socialMediaInfoRepository.Delete(id);
        }
    }
}
