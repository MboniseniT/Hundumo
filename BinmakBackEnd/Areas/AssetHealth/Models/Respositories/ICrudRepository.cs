using System.Collections.Generic;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    interface ICrudRepository<T> where T : class
    {
        IEnumerable<T> Find();
        T Find<TKey>(TKey id);
        T Add(T item);
        T Update<TKey>(TKey id, T item);
        void Delete<TKey>(TKey id);
    }
}
