namespace WorkingBees.Core.Interfaces
{
    public interface IService<T> where T : class
    {
        List<T> ListAll();
        List<T> Listallbyuserid(long userId);
        bool Insert(T entity);
        bool Update(long id, T entity);
        bool Delete(long id);
    }
}
