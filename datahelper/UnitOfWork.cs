using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace OAO.datahelper
{
    public class UnitOfWork : IDisposable
    {
        private Dictionary<Type, object> _dict = new Dictionary<Type, object>();
        private DbContext _ctx;
        public bool _disposed;

        public UnitOfWork(DbContext ctx)
        {
            _ctx = ctx;
        }

        public IRepository<T> Repository<T>() where T : class
        {
            if (_dict.ContainsKey(typeof(T)))
                return _dict[typeof(T)] as IRepository<T>;
            IRepository<T> repository = new GenericRepository<T>(_ctx);
            _dict[typeof(T)] = repository;
            return repository;
        }

        public DataResult<bool> Save()
        {
            try
            {
                _ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                return DataResult<bool>.Exception(ex);
            }
            return DataResult<bool>.Ok();
        }

        public async Task<StatusResult> SaveAsync()
        {
            bool success = true;
            List<string> erros = new List<string>();
            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                success = false;
                erros.Add(ex.Message);
                if (ex.InnerException != null)
                {
                    erros.Add(ex.Message);
                }
            }
            return new StatusResult(success, erros);
        }

        public void Dispose()
        {
            Disposing(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Disposing(bool dispose)
        {
            if (dispose && _disposed)
            {
                _ctx.Dispose();
                _disposed = true;
            }
        }
    }
}