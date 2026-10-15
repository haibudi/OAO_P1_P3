using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;

namespace OAO.datahelper
{
    public interface IRepository<T>
    {
        DataResult<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> order = null);

        DataResult<T> Get(Expression<Func<T, bool>> filter);

        DataResult<int> Insert(params T[] items);

        DataResult<T> Update(T item);

        DataResult<int> Delete(params T[] items);
        DataResult<int> Delete(Expression<Func<T, bool>> filter);

        DataResult<bool> IsExist(Expression<Func<T, bool>> filter);

        DataResult<int> ExecuteSqlCommand(string query, params object[] sqlParameters);

        DataResult<IEnumerable<T>> SqlQuery(string query, params object[] sqlParameters);
    }
}