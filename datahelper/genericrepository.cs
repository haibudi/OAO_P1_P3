using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Net;

namespace OAO.datahelper
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        private DbContext _ctx;
        private DbSet<T> _set;

        public GenericRepository(DbContext ctx)
        {
            _ctx = ctx;
            _set = _ctx.Set<T>();
        }

        public DataResult<T> Get(Expression<Func<T, bool>> filter)
        {
            T entity = default(T);
            try
            {
                entity = _set.AsNoTracking().FirstOrDefault(filter);
            }
            catch (Exception ex)
            {
                return DataResult<T>.Exception(ex);
            }
            return DataResult<T>.Ok(entity);
        }

        public DataResult<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> order = null)
        {
            IQueryable<T> directResult = null;
            try
            {
                if (filter != null)
                {
                    directResult = _set.Where(filter);
                }
                else
                {
                    directResult = _set;
                }
                if (order != null)
                {
                    directResult = order(directResult);
                }
            }
            catch (Exception ex)
            {
                return DataResult<IEnumerable<T>>.Exception(ex);
            }
            return DataResult<IEnumerable<T>>.Ok(directResult);
        }

        public DataResult<int> Insert(params T[] items)
        {
            int count = 0;
            try
            {
                count = items.Count();
                if (items != null && count > 0)
                {
                    _set.AddRange(items);
                }
                else
                {
                    return DataResult<int>.Error(HttpStatusCode.Forbidden, "Items cannot be empty!");
                }
            }
            catch (Exception ex)
            {
                return DataResult<int>.Exception(ex);
            }
            return DataResult<int>.Ok(count);
        }

        public DataResult<T> Update(T item)
        {
            try
            {
                if (item != null)
                {
                    if (!_set.Local.Contains(item))
                        _set.Attach(item);
                    _ctx.Entry(item).State = EntityState.Modified;
                }
                else
                {
                    return DataResult<T>.Error(HttpStatusCode.Forbidden, "Items cannot be empty!");
                }
            }
            catch (Exception ex)
            {
                return DataResult<T>.Exception(ex);
            }
            return DataResult<T>.Ok();
        }

        public DataResult<int> Delete(params T[] items)
        {
            int count = 0;
            try
            {
                count = items.Count();
                if (items != null && count > 0)
                {
                    _set.RemoveRange(items);
                }
                else
                {
                    return DataResult<int>.Error(HttpStatusCode.Forbidden, "Items cannot be empty!");
                }
            }
            catch (Exception ex)
            {
                return DataResult<int>.Exception(ex);
            }
            return DataResult<int>.Ok(count);
        }

        public DataResult<int> Delete(Expression<Func<T, bool>> filter)
        {
            int count = 0;
            try
            {
                var data = _set.Where(filter);
                count = data.Count();
                _set.RemoveRange(data);
            }
            catch (Exception ex)
            {
                return DataResult<int>.Exception(ex);
            }
            return DataResult<int>.Ok(count);
        }

        public DataResult<int> ExecuteSqlCommand(string query, params object[] sqlParameters)
        {
            int result = 0;
            try
            {
                if (String.IsNullOrEmpty(query))
                {
                    return DataResult<int>.Error(HttpStatusCode.Forbidden, "Query cannot be empty!");
                }
                else
                {
                    if (sqlParameters != null && sqlParameters.Count() > 0)
                    {
                        result = _ctx.Database.ExecuteSqlCommand(query, sqlParameters);
                    }
                    else
                    {
                        result = _ctx.Database.ExecuteSqlCommand(query);
                    }
                }
            }
            catch (Exception ex)
            {
                return DataResult<int>.Exception(ex);
            }
            return DataResult<int>.Ok(result);
        }

        public DataResult<bool> IsExist(Expression<Func<T, bool>> filter)
        {
            bool exists = false;
            try
            {
                exists = _set.Any(filter);
            }
            catch (Exception ex)
            {
                return DataResult<bool>.Exception(ex);
            }
            return DataResult<bool>.Ok(exists);
        }

        public DataResult<IEnumerable<T>> SqlQuery(string query, params object[] sqlParameters)
        {
            IEnumerable<T> result = null;
            try
            {
                if (String.IsNullOrEmpty(query))
                {
                    return DataResult<IEnumerable<T>>.Error(HttpStatusCode.Forbidden, "Query cannot be empty!");
                }
                else
                {
                    if (sqlParameters != null && sqlParameters.Count() > 0)
                    {
                        result = _ctx.Database.SqlQuery<T>(query, sqlParameters);
                    }
                    else
                    {
                        result = _ctx.Database.SqlQuery<T>(query);
                    }
                }
            }
            catch (Exception ex)
            {
                return DataResult<IEnumerable<T>>.Exception(ex);
            }
            return DataResult<IEnumerable<T>>.Ok(result);
        }
    }
}