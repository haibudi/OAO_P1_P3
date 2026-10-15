using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;
//using OAO.Controllers;
using AutoMapper;
using OAO.BLL.Form.FormLogic;
using OAO.BLL.Client_Info.Logic;
using System.Configuration;

namespace OAO.Controllers
{
    public class Panel2Controller : Controller
    {
        // GET: Panel2
        //public ActionResult Index()
        //{
        //    return View();
        //}

        private IMapper _mapper;
        private FormLogic _formbll;
        private ClientLogic _clientbll;
        public Panel2Controller()
        {
            BaseMapper basemap = new BaseMapper();
            _mapper = basemap._mapper;
            _formbll = new FormLogic();
            _clientbll = new ClientLogic();
        }

        public class result
        {
            public object data { get; set; }
            public bool success { get; set; }
            public string message { get; set; }

        }

        [HttpPost]

        public JsonResult SaveUpdatePanel2(Panel3 param)
        {
            result rs = new result();
            WriteLog writeLog = new WriteLog();
            RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
            try
            {
                using (var context = new OAOEntities())
                {
                    //context.Configuration.LazyLoadingEnabled = false;
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {

                        fm.PromoCode = param.Promotion_Code;
                        fm.MobileNo = param.Mobile_number;
                        fm.CountryCodeMobile = param.mobile_Area_Number;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;
                        if (fm.Step < 1)
                        {
                            fm.Step = 1;
                        }
                        var pg = new
                        {
                            page = fm.Step,
                        };
                        rs.data = pg;
                        fm.LastStatusUpdatedTime = DateTime.Now;

                        if (context.SaveChanges() > 0)
                        {
                            using (var new_context = new OAOEntities())
                            {
                                new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                                if (cl != null)
                                {
                                    cl.PreferredAE = param.PreferedAE == 1 ? true : false;
                                    cl.AeCd = rm.Value(param.AECODE);
                                    cl.AeName = rm.Value(param.AENAME);
                                    cl.Salutation = param.Title;
                                    cl.Surname = rm.Value(param.Surename);
                                    cl.ClientName = rm.Value(param.ClientName);
                                    cl.Nationality = param.Nationality;
                                    cl.NRICPassportType = param.ID_Cardtype;
                                    cl.NRICPassportNo = param.ID_Card;
                                    cl.PlaceOfIssue = param.Place_Issue;
                                    cl.CountryOfBirth = param.Country_Birth;
                                    var dateBirth = DateTime.Parse(param.Date_Birth_s);
                                    cl.DateOfBirth = dateBirth;
                                    cl.CountryCodeHome = rm.Value(param.Home_Area_Number);
                                    cl.HomeTelNo = param.Home_number;
                                    cl.OfficeNoMain = param.Office_Number;
                                    cl.CountryCodeOfficeMain = param.Office_Area_Number;
                                    cl.WeChatID = param.Wechat_ID;
                                    cl.LastUpdateTime = DateTime.Now;
                                    //cl.HKIDROtherName = param.FullName;
                                    cl.NonEnglishSurname = rm.Value(param.NonEnglishSurname);
                                    cl.NoneEnglishName = rm.Value(param.NoneEnglishName);
                                    if (new_context.SaveChanges() > 0)
                                    {
                                        if(fm.NDID != null)
                                        {
                                            checkNationalityChina((Guid)fm.NDID, cl.Nationality);
                                        }
                                        var dt = _formbll.Get(_ => _.ID == param.ID_Form);
                                        var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
                                        var cl_ = _clientbll.Get(_ => _.ID == dt_form.ClientInfoID);
                                        var cl_form = _mapper.Map<_clientInfo>(cl_.Data);
                                        var frm = new
                                        {
                                            data_form = dt_form,
                                            client_info = cl_form,
                                        };
                                        //rs.data = null;
                                        rs.success = true;
                                        rs.message = "success";
                                        writeLog.Writer("sucessfully save ID " + param.ID_Form + " Step : " + fm.Step);
                                        var ctr = (ConfigurationManager.AppSettings["AllowedCheckFTIN"]).ToLower();
                                        var idx = ctr.IndexOf((param.Nationality).ToLower());
                                        
                                        try
                                        {
                                            using (var w8_context = new OAOEntities())
                                            {
                                                
                                                var w8 = w8_context.W8BEN_Client.SingleOrDefault(_ => _.FormID == fm.W8ID);
                                                if (w8 != null)
                                                {
                                                    w8.CountryOfCitizenship = param.Nationality;
                                                    if (idx < 0 && w8.CheckIfFTIN == true)
                                                    {
                                                        w8.CheckIfFTIN = false;
                                                    }

                                                    if (w8_context.SaveChanges() > 0)
                                                    {
                                                        writeLog.Writer("success client save  : CheckIfFTIN " + fm.Step);
                                                        //rs.data = null;
                                                        rs.success = true;
                                                        rs.message = "success";
                                                    }

                                                }
                                            }
                                        }
                                        catch (Exception e)
                                        {
                                            //rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            writeLog.Writer("failed to save CheckIfFTIN " + false + " Step : " + fm.Step);
                                        }
                                    }
                                    else
                                    {
                                        rs.data = null;
                                        rs.success = false;
                                        rs.message = "failed";
                                        writeLog.Writer("failed to save ID " + param.ID_Form + " Step : " + fm.Step);
                                    }
                                }

                            }
                        }
                        else
                        {
                            rs.data = null;
                            rs.success = false;
                            rs.message = "failed";
                            writeLog.Writer("failed to save ID " + param.ID_Form + " Step : " + fm.Step);
                        }

                    }
                };
            }
            catch(Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
            }
            
            return Json(rs);
        }


        public void checkNationalityChina(Guid NDID, string Nationality)
        {
            WriteLog wl = new WriteLog();
            try
            {
                using (var lnd_context = new OAOEntities())
                {
                    lnd_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var lnd = lnd_context.Tb_NDForm.SingleOrDefault(_ => _.ID == NDID);
                    if (lnd != null)
                    {
                        if(lnd.IsNotChinese == true && Nationality == "China")
                        {
                            lnd.IsNotChinese = false;
                            if (lnd_context.SaveChanges() > 0)
                            {
                                wl.Writer("sucessfully change IsNotChinese : "+ lnd.IsNotChinese + "  NDFORM  Step : 1 " );
                            }
                        }
                    }
                };
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
            }
        }

    }

}