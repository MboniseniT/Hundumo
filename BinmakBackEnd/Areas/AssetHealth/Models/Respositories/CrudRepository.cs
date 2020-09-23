using BinmakAPI.Data;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class CrudRepository<T> : ICrudRepository<T> where T : class
    {
        private readonly BinmakDbContext _context;

        public CrudRepository(BinmakDbContext context) => _context = context;

        public virtual T Add(T item)
        {
            _context.Set<T>().Add(item);
            _context.SaveChanges();
            return item;
        }

        public virtual void Delete<TKey>(TKey id)
        {
            var dbItem = _context.Set<T>().Find(id);
            _context.Set<T>().Remove(dbItem);
            _context.SaveChanges();
        }

        public System.Collections.Generic.IEnumerable<T> Find() => _context.Set<T>();

        public T Find<TKey>(TKey id) => _context.Set<T>().Find(id);

        public virtual T Update<TKey>(TKey id, T item)
        {
            var dbItem = _context.Set<T>().Find(id);
            if (dbItem == null) throw new System.Exception("Could not find requested item");
            var props = item.GetType().GetProperties();
            foreach (var prop in props)
            {
                object propValue = prop.GetValue(item);
                if (propValue != null)
                    prop.SetValue(dbItem, propValue);
            }
            _context.SaveChanges();
            return item;
        }
    }
}
