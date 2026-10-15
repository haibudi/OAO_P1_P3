using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.Derivative.Model;


namespace OAO.BLL.Derivative.Logic
{
    public class DerivativeLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_DKQuestionnaire> _repo = null;

        public DerivativeLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_DKQuestionnaire>();
        }

        public DataResult<Derivativedto> Get(Expression<Func<Tb_DKQuestionnaire, bool>> expression = null)
        {
            Derivativedto data = null;
            try
            {
                DataResult<Tb_DKQuestionnaire> getresult = _uow.Repository<Tb_DKQuestionnaire>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<Derivativedto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<Derivativedto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<Derivativedto>.Exception(ex);
            }
            return DataResult<Derivativedto>.Ok(data);
        }
    }
}