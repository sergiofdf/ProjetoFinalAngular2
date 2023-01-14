using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Core.Services
{
    public class SkillService : IService<Skill>
    {
        public readonly IRepository<Skill> _skillRepository;
        public SkillService(IRepository<Skill> skillRepository)
        {
            _skillRepository = skillRepository;
        }

        public async Task<List<Skill>> ListAllAsync()
        {
            return await _skillRepository.ListAllAsync();
        }
        public async Task<List<Skill>> ListallbyuseridAsync(long userId)
        {
            return await _skillRepository.ListAllByUserIdAsync(userId);
        }
        public async Task<bool> InsertAsync(Skill skill)
        {
            return await _skillRepository.InsertAsync(skill);
        }
        public async Task<bool> UpdateAsync(long id, Skill skill)
        {
            return await _skillRepository.UpdateAsync(id, skill);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _skillRepository.DeleteAsync(id);
        }
    }
}
