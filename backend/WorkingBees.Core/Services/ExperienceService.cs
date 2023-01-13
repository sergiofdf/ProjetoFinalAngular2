using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public List<Experience> ListAll()
        {
            return _experienceRepository.ListAll();
        }
        public List<Experience> Listallbyuserid(long userId)
        {
            return _experienceRepository.ListAllByUserId(userId);
        }
        public bool Insert(Experience experience)
        {
            return _experienceRepository.Insert(experience);
        }
        public bool Update(long id, Experience experience)
        {
            return _experienceRepository.Update(id, experience);
        }

        public bool Delete(long id)
        {
            return _experienceRepository.Delete(id);
        }

    }
}
