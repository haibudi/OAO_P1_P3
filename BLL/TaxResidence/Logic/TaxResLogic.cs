using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.TaxResidence.Model;

namespace OAO.BLL.TaxResidence.Logic
{
    public class TaxResLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_TaxResident> _repo = null;

        public TaxResLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_TaxResident>();
        }

        
        public DataResult<IEnumerable<TaxResDto>> GetAll(Expression<Func<Tb_TaxResident, bool>> expression = null)
        {
            IEnumerable<TaxResDto> data = null;
            try
            {
                var getresult = _uow.Repository<Tb_TaxResident>().GetAll(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<IEnumerable<TaxResDto>>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<IEnumerable<TaxResDto>>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<IEnumerable<TaxResDto>>.Exception(ex);
            }
            return DataResult<IEnumerable<TaxResDto>>.Ok(data);
        }
    }
}