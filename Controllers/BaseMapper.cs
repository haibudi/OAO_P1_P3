using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using OAO.Models;
using OAO.BLL.Form.Model;
using OAO.BLL.Client_Info.Model;
using OAO.BLL.Soft.Model;
using OAO.BLL.RPQForm.Model;
using OAO.BLL.Investment_Objective.Model;
using OAO.BLL.Derivative.Model;
using OAO.BLL.TaxResidence.Model;
using OAO.BLL.ND_Form.Model;
using OAO.BLL.W8BEN.Model;
using OAO.BLL.MarginQuestion.Model;
using OAO.BLL.Attachment.Model;
using OAO.BLL.DKQuestionaire.Model;


namespace OAO.Controllers
{
    public class BaseMapper
    {
        public readonly IMapper _mapper;
        public BaseMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<FormDto, _accOpenRequest>().ReverseMap();
                cfg.CreateMap<ClientDto, _clientInfo>().ReverseMap();
                cfg.CreateMap<SoftDto, _softInfo>().ReverseMap();
                cfg.CreateMap<InvestmentObjectiveDto, _investmentObjective>().ReverseMap();
                cfg.CreateMap<InvestmentObjectiveDto, _investmentObjective>().ReverseMap();
                cfg.CreateMap<RPQdto, _rpqForm>().ReverseMap();
                cfg.CreateMap<Derivativedto, _derivative>().ReverseMap();
                cfg.CreateMap<TaxResDto, _taxRes>().ReverseMap();
                cfg.CreateMap<NDFormdto, _ndForm>().ReverseMap();
                cfg.CreateMap<W8BENDto, _w8ben>().ReverseMap();
                cfg.CreateMap<_Address, _address>().ReverseMap();
                cfg.CreateMap<_TaxTreaty, _taxTreaty>().ReverseMap();
                cfg.CreateMap<_Certification, _certification>().ReverseMap();
                cfg.CreateMap<MarginQuestionDto, _marginQuestion>().ReverseMap();
                cfg.CreateMap<AttcDto, _attachment>().ReverseMap();
                cfg.CreateMap<Dkdto, _dkQuestionaire>().ReverseMap();
                
            });

            _mapper = config.CreateMapper();
        }


    }
}