using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.MarginQuestion.Model;

namespace OAO.BLL.MarginQuestion.Logic
{
    public class MarginQuestionLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_MarginQuestion> _repo = null;

        public MarginQuestionLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_MarginQuestion>();
        }

        public DataResult<MarginQuestionDto> Get(Expression<Func<Tb_MarginQuestion, bool>> expression = null)
        {
            MarginQuestionDto data = null;
            try
            {
                DataResult<Tb_MarginQuestion> getresult = _uow.Repository<Tb_MarginQuestion>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<MarginQuestionDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<MarginQuestionDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<MarginQuestionDto>.Exception(ex);
            }
            return DataResult<MarginQuestionDto>.Ok(data);
        }
    }
}