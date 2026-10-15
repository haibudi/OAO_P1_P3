using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.W8BEN.Model;

namespace OAO.BLL.W8BEN.Logic 
{
    public class W8BENLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<W8BEN_Client> _repo = null;

        public W8BENLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<W8BEN_Client>();
        }

        public DataResult<W8BENDto> Get(Expression<Func<W8BEN_Client, bool>> expression = null)
        {
            W8BENDto data = null;
            try
            {
                DataResult<W8BEN_Client> getresult = _uow.Repository<W8BEN_Client>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<W8BENDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<W8BENDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<W8BENDto>.Exception(ex);
            }
            return DataResult<W8BENDto>.Ok(data);
        }
    }
}