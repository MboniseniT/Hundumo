using System.Collections.Generic;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Local
{
    public class Pageable<T>
    {
        public Pageable(IEnumerable<T> list, int? page = null, int? pageSize = null)
        {
            _list = list;
            _page = page;
            _pageSize = pageSize;

        }

        private IEnumerable<T> _list;
        public IEnumerable<T> items
        {
            get
            {
                if (_list == null) return null;
                return _list.Skip((page - 1) * pageSize).Take(pageSize);
            }
        }

        private int? _page;
        public int page
        {
            get
            {
                if (!_page.HasValue)
                {
                    return 1;
                }
                else
                {
                    return _page.Value;
                }
            }
        }
        private int? _pageSize;
        public int pageSize
        {
            get
            {
                if (!_pageSize.HasValue)
                {
                    return _list == null ? 0 : _list.Count();
                }
                else
                {
                    return _pageSize.Value;
                }
            }
        }
        public int totalItemCount
        {
            get
            {
                return _list == null ? 0 : _list.Count();
            }
        }
        public int totalPageCount
        {
            get
            {
                return _list == null ? 0 : _list.Count() % pageSize > 0 ? _list.Count() / pageSize + 1 : _list.Count() / pageSize;
            }
        }
    }

}
