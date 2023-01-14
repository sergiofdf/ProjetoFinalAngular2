namespace WorkingBees.Core.Interfaces
{
    public interface IService<T> where T : class
    {
        Task<List<T>> ListAllAsync();
        Task<List<T>> ListallbyuseridAsync(long userId);
        Task<bool> InsertAsync(T entity);
        Task<bool> UpdateAsync(long id, T entity);
        Task<bool> DeleteAsync(long id);
    }
}
