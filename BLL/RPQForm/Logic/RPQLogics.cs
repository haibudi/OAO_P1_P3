using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.RPQForm.Model;

namespace OAO.BLL.RPQForm.Logic
{
    public class RPQLogics : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_RPQForm> _repo = null;

        public RPQLogics()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_RPQForm>();
        }

        public DataResult<RPQdto> Get(Expression<Func<Tb_RPQForm, bool>> expression = null)
        {
            RPQdto data = null;
            try
            {
                DataResult<Tb_RPQForm> getresult = _uow.Repository<Tb_RPQForm>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<RPQdto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<RPQdto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<RPQdto>.Exception(ex);
            }
            return DataResult<RPQdto>.Ok(data);
        }

        public DataResult<IEnumerable<RPQdto>> GetAll(Expression<Func<Tb_RPQForm, bool>> expression = null)
        {
            IEnumerable<RPQdto> data = null;
            try
            {
                DataResult<Tb_RPQForm> getresult = _uow.Repository<Tb_RPQForm>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<IEnumerable<RPQdto>>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<IEnumerable<RPQdto>>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<IEnumerable<RPQdto>>.Exception(ex);
            }
            return DataResult<IEnumerable<RPQdto>>.Ok(data);
        }
    }
}