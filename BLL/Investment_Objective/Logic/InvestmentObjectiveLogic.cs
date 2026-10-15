using System;
using System.Linq.Expressions;
using System.Net;
using System.Linq;
using System.Web;
using OAO.datahelper;
using OAO.BLL.Investment_Objective.Model;

namespace OAO.BLL.Investment_Objective.Logic
{
    public class InvestmentObjectiveLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_InvestmentObjective> _repo = null;

        public InvestmentObjectiveLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_InvestmentObjective>();
        }

        public DataResult<InvestmentObjectiveDto> Get(Expression<Func<Tb_InvestmentObjective, bool>> expression = null)
        {
            InvestmentObjectiveDto data = null;
            try
            {
                DataResult<Tb_InvestmentObjective> getresult = _uow.Repository<Tb_InvestmentObjective>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<InvestmentObjectiveDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<InvestmentObjectiveDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<InvestmentObjectiveDto>.Exception(ex);
            }
            return DataResult<InvestmentObjectiveDto>.Ok(data);
        }
    }
}