using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using OAO.BLL.Form.Model;
using OAO.BLL.Client_Info.Model;
using OAO.BLL.Soft.Model;
using OAO.BLL.Investment_Objective.Model;
using OAO.BLL.RPQForm.Model;
using OAO.BLL.Derivative.Model;
using OAO.BLL.TaxResidence.Model;
using OAO.BLL.ND_Form.Model;
using OAO.BLL.W8BEN.Model;
using OAO.BLL.MarginQuestion.Model;
using OAO.BLL.Attachment.Model;
using OAO.BLL.DKQuestionaire.Model;


namespace OAO.BLL
{
    public abstract class AutoMapperLogicBase
    {
        protected readonly IMapper _mapper;

        protected AutoMapperLogicBase()
        {
            var config = new MapperConfiguration(cfg =>
            {
               
                cfg.CreateMap<Tb_AccOpenRequest, FormDto>().ReverseMap();
                cfg.CreateMap<Tb_ClientInfo, ClientDto>().ReverseMap();
                cfg.CreateMap<Tb_SOF, SoftDto>().ReverseMap();
                cfg.CreateMap<Tb_InvestmentObjective, InvestmentObjectiveDto>().ReverseMap();
                cfg.CreateMap<Tb_RPQForm, RPQdto>().ReverseMap();
                cfg.CreateMap<Tb_DKQuestionnaire, Derivativedto>().ReverseMap();
                cfg.CreateMap<Tb_TaxResident, TaxResDto>().ReverseMap();
                cfg.CreateMap<Tb_NDForm, NDFormdto>().ReverseMap();
                cfg.CreateMap<W8BEN_Client, W8BENDto>().ReverseMap();
                cfg.CreateMap<W8BEN_Address, _Address>().ReverseMap();
                cfg.CreateMap<W8BEN_TaxTreaty, _TaxTreaty>().ReverseMap();
                cfg.CreateMap<W8BEN_Certification, _Certification>().ReverseMap();
                cfg.CreateMap<Tb_MarginQuestion, MarginQuestionDto>().ReverseMap();
                cfg.CreateMap<Tb_Attachment, AttcDto>().ReverseMap();
                cfg.CreateMap<Tb_DKQuestionnaire, Dkdto>().ReverseMap();
                
            });
            _mapper = config.CreateMapper();
        }
    }
}