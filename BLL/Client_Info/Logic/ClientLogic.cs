using System;
using System.Linq.Expressions;
using System.Net;
using System.Linq;
using System.Web;
using OAO.datahelper;
using OAO.BLL.Client_Info.Model;

namespace OAO.BLL.Client_Info.Logic
{
   
    public class ClientLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_ClientInfo> _repo = null;

        public ClientLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_ClientInfo>();
        }

        public DataResult<ClientDto> Get(Expression<Func<Tb_ClientInfo, bool>> expression = null)
        {
            ClientDto data = null;
            try
            {
                DataResult<Tb_ClientInfo> getresult = _uow.Repository<Tb_ClientInfo>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<ClientDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<ClientDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<ClientDto>.Exception(ex);
            }
            return DataResult<ClientDto>.Ok(data);
        }
    }
}
