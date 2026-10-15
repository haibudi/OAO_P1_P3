using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.Form.Model;

namespace OAO.BLL.Form.FormLogic
{
    public class FormLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_AccOpenRequest> _repo = null;

        public FormLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_AccOpenRequest>();
        }

        public DataResult<FormDto> Get(Expression<Func<Tb_AccOpenRequest, bool>> expression = null)
        {
            FormDto data = null;
            try
            {
                DataResult<Tb_AccOpenRequest> getresult = _uow.Repository<Tb_AccOpenRequest>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<FormDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<FormDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<FormDto>.Exception(ex);
            }
            return DataResult<FormDto>.Ok(data);
        }
    }
}