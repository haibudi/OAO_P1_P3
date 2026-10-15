using System;
using System.Linq.Expressions;
using System.Net;
using System.Linq;
using System.Web;
using OAO.datahelper;
using OAO.BLL.DKQuestionaire.Model;

namespace OAO.BLL.DKQuestionaire.Logic
{
    public class DkQuestionaireLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_DKQuestionnaire> _repo = null;

        public DkQuestionaireLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_DKQuestionnaire>();
        }

        public DataResult<Dkdto> Get(Expression<Func<Tb_DKQuestionnaire, bool>> expression = null)
        {
            Dkdto data = null;
            try
            {
                DataResult<Tb_DKQuestionnaire> getresult = _uow.Repository<Tb_DKQuestionnaire>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<Dkdto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<Dkdto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<Dkdto>.Exception(ex);
            }
            return DataResult<Dkdto>.Ok(data);
        }
    }
}