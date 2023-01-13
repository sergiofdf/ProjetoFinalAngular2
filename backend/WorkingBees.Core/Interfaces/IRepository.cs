namespace WorkingBees.Core.Interfaces
{
    public interface IRepository<T> where T : class
    {
        List<T> ListAll();
        List<T> ListAllByUserId(long userId);
        bool Insert(T entity);
        bool Update(long id, T entity);
        bool Delete(long id);
    }
}
