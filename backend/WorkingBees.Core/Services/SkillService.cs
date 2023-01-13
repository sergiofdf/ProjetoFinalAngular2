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

        public List<Skill> ListAll()
        {
            return _skillRepository.ListAll();
        }
        public List<Skill> Listallbyuserid(long userId)
        {
            return _skillRepository.ListAllByUserId(userId);
        }
        public bool Insert(Skill skill)
        {
            return _skillRepository.Insert(skill);
        }
        public bool Update(long id, Skill skill)
        {
            return _skillRepository.Update(id, skill);
        }

        public bool Delete(long id)
        {
            return _skillRepository.Delete(id);
        }
    }
}
