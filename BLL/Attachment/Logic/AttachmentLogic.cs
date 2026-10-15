using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using OAO.datahelper;
using OAO.BLL.Attachment.Model;


namespace OAO.BLL.Attachment.Logic
{
    public class AttachmentLogic : AutoMapperLogicBase
    {
        private UnitOfWork _uow;
        IRepository<Tb_Attachment> _repo = null;

        public AttachmentLogic()
        {
            _uow = new UnitOfWork(new OAOEntities());
            _repo = _uow.Repository<Tb_Attachment>();
        }


        public DataResult<IEnumerable<AttcDto>> GetAll(Expression<Func<Tb_Attachment, bool>> expression = null)
        {
            IEnumerable<AttcDto> data = null;
            try
            {
                var getresult = _uow.Repository<Tb_Attachment>().GetAll(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<IEnumerable<AttcDto>>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<IEnumerable<AttcDto>>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<IEnumerable<AttcDto>>.Exception(ex);
            }
            return DataResult<IEnumerable<AttcDto>>.Ok(data);
        }

        public DataResult<AttcDto> Get(Expression<Func<Tb_Attachment, bool>> expression = null)
        {
            AttcDto data = null;
            try
            {
                DataResult<Tb_Attachment> getresult = _uow.Repository<Tb_Attachment>().Get(expression);
                if (getresult.StatusCode != HttpStatusCode.OK)
                {
                    return DataResult<AttcDto>.Error(getresult.StatusCode, getresult.Message);
                }
                data = _mapper.Map<AttcDto>(getresult.Data);
            }
            catch (Exception ex)
            {
                return DataResult<AttcDto>.Exception(ex);
            }
            return DataResult<AttcDto>.Ok(data);
        }
    }
}