using WorkingBees.Core.Models;

namespace WorkingBees.Core.Interfaces
{
    public interface IUserCompleteInfoService
    {
        public UserCompleteInfo CompileUserInfo(long userId);
    }
}
