using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.Soft.Model;

namespace OAO.BLL.Soft.SoftLogic
{
    public class SoftLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_SOF> _repo = null;

        public SoftLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_SOF>();
        }

        public DataResult<SoftDto> Get(Expression<Func<Tb_SOF, bool>> expression = null)
        {
            SoftDto data = null;
            try
            {
                DataResult<Tb_SOF> getresult = _uow.Repository<Tb_SOF>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<SoftDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<SoftDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<SoftDto>.Exception(ex);
            }
            return DataResult<SoftDto>.Ok(data);
        }
    }
}