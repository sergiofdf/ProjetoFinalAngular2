using WorkingBees.Core.Models;

namespace WorkingBees.Core.Interfaces
{
    public interface IUserCompleteInfoService
    {
        Task<UserCompleteInfo> CompileUserInfoAsync(long userId);
    }
}
