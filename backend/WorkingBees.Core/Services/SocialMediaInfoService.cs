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
        public async Task<List<SocialMediaInfo>> ListAllAsync()
        {
            return await _socialMediaInfoRepository.ListAllAsync();
        }
        public async Task<List<SocialMediaInfo>> ListallbyuseridAsync(long userId)
        {
            return await _socialMediaInfoRepository.ListAllByUserIdAsync(userId);
        }
        public async Task<bool> InsertAsync(SocialMediaInfo socialMedia)
        {
            return await _socialMediaInfoRepository.InsertAsync(socialMedia);
        }
        public async Task<bool> UpdateAsync(long id, SocialMediaInfo socialMedia)
        {
            return await _socialMediaInfoRepository.UpdateAsync(id, socialMedia);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _socialMediaInfoRepository.DeleteAsync(id);
        }
    }
}
