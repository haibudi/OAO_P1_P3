using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.ND_Form.Model;

namespace OAO.BLL.ND_Form.Logic
{
    public class NdFormLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_NDForm> _repo = null;

        public NdFormLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_NDForm>();
        }

        public DataResult<NDFormdto> Get(Expression<Func<Tb_NDForm, bool>> expression = null)
        {
            NDFormdto data = null;
            try
            {
                DataResult<Tb_NDForm> getresult = _uow.Repository<Tb_NDForm>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<NDFormdto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<NDFormdto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<NDFormdto>.Exception(ex);
            }
            return DataResult<NDFormdto>.Ok(data);
        }
    }
}