using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Core.Services
{
    public class ExperienceService : IService<Experience>
    {
        public readonly IRepository<Experience> _experienceRepository;

        public ExperienceService(IRepository<Experience> experienceRepository)
        {
            _experienceRepository = experienceRepository;
        }
        public async Task<List<Experience>> ListAllAsync()
        {
            return await _experienceRepository.ListAllAsync();
        }
        public async Task<List<Experience>> ListallbyuseridAsync(long userId)
        {
            return await _experienceRepository.ListAllByUserIdAsync(userId);
        }
        public async Task<bool> InsertAsync(Experience experience)
        {
            return await _experienceRepository.InsertAsync(experience);
        }
        public async Task<bool> UpdateAsync(long id, Experience experience)
        {
            return await _experienceRepository.UpdateAsync(id, experience);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _experienceRepository.DeleteAsync(id);
        }

    }
}
