using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using AutoMapper;
using OAO.Controllers;
using OAO.BLL.Form.Model;
//using OAO.BLL.PaneL.Model;
using OAO.BLL.Form.FormLogic;
using OAO.BLL.Client_Info.Logic;
using OAO.BLL.Soft.SoftLogic;
using OAO.BLL.Investment_Objective.Logic;
using OAO.BLL.RPQForm.Logic;
using OAO.BLL.Derivative.Logic;
using OAO.BLL.TaxResidence.Logic;
using OAO.BLL.ND_Form.Logic;
using OAO.BLL.W8BEN.Logic;
using OAO.BLL.MarginQuestion.Logic;
using OAO.BLL.Attachment.Logic;
using OAO.BLL.DKQuestionaire.Logic;
using OAO.Models;
using System.Xml.Linq;
using System.Configuration;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace OAO.Controllers
{
    public class HomeController : Controller
    {
        private IMapper _mapper;
        private FormLogic _formbll;
        private ClientLogic _clientbll;
        private SoftLogic _softbll;
        private InvestmentObjectiveLogic _invbll;
        private RPQLogics _rpqbll;
        private DerivativeLogic _drbll;
        private TaxResLogic _taxbll;
        private NdFormLogic _ndbll;
        private W8BENLogic _w8bll;
        private MarginQuestionLogic _mrbll;
        private AttachmentLogic _attcbll;
        private DkQuestionaireLogic _dkbll;
        public HomeController()
        {
            BaseMapper basemap = new BaseMapper();
            _mapper = basemap._mapper;
            _formbll = new FormLogic();
            _clientbll = new ClientLogic();
            _softbll = new SoftLogic();
            _invbll = new InvestmentObjectiveLogic();
            _rpqbll = new RPQLogics();
            _drbll = new DerivativeLogic();
            _taxbll = new TaxResLogic();
            _ndbll = new NdFormLogic();
            _w8bll = new W8BENLogic();
            _mrbll = new MarginQuestionLogic();
            _attcbll = new AttachmentLogic();
            _dkbll = new DkQuestionaireLogic();
        }

        public class domainIndex
        {
            public static int usrIndex { get; set; }
        }

        public SingleForm build_url_SingleForm()
        {
            SingleForm sf = new SingleForm();
            WriteLog writeLog = new WriteLog();
            try
            {
                string domain_str = ConfigurationManager.AppSettings["domainSingleForm"].ToString();
                string RPQPath_url = ConfigurationManager.AppSettings["RPQPath_url"].ToString();
                string DKPath_url = ConfigurationManager.AppSettings["DKPath_url"].ToString();
                string W8Path_url = ConfigurationManager.AppSettings["W8Path_url"].ToString();
                string parameter_url = ConfigurationManager.AppSettings["parameter_url"].ToString();
                string[] domain_arr = domain_str.Split(',');

                if (domainIndex.usrIndex > 0 && domainIndex.usrIndex == (domain_arr.Length - 1))
                {
                    domainIndex.usrIndex = 0;
                }
                else
                {
                    domainIndex.usrIndex = domainIndex.usrIndex + 1;
                }

                sf.url_RPQ = domain_arr[domainIndex.usrIndex].ToString() + RPQPath_url + "?" + parameter_url;
                sf.url_DK = domain_arr[domainIndex.usrIndex].ToString() + DKPath_url + "?" + parameter_url;
                sf.url_W8 = domain_arr[domainIndex.usrIndex].ToString() + W8Path_url + "?" + parameter_url;

            }
            catch (Exception e)
            {
                writeLog.Writer(e.StackTrace + e.Message);
            }

            return sf;
        }

        public async Task<bool> UpdateForm_SF(string RPQID_, string W8ID_, string DKID_, Guid ID, string so)
        {
            WriteLog writeLog = new WriteLog();
            try
            {
                using (var context_ = new OAOEntities())
                {
                    var data = context_.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID);
                    if (!string.IsNullOrEmpty(RPQID_) && string.IsNullOrEmpty(data.RPQID.ToString()))
                    {
                        var RPQID = new Guid(RPQID_);
                        data.RPQID = RPQID;
                        if (data.Step <= 8)
                        {
                            data.Step = 7;
                        }
                    }
                    else if (!string.IsNullOrEmpty(DKID_) && string.IsNullOrEmpty(data.DKID.ToString()))
                    {
                        var DKID = new Guid(DKID_);
                        data.DKID = DKID;
                        if (data.Step <= 9)
                        {
                            data.Step = 8;
                        }

                        using (var clientdk_ctx = new OAOEntities())
                        {
                            var data_client = clientdk_ctx.Tb_ClientInfo.SingleOrDefault(b => b.ID == data.ClientInfoID);
                            if(so == "0")
                            {
                                data_client.AcknowledgementStockOptAcct = false;

                                if (clientdk_ctx.SaveChanges() > 0)
                                {
                                    writeLog.Writer("update client info AcknowledgementStockOptAcct successfully ID clienInfo = " + data.ClientInfoID.ToString());
                                }
                                else
                                {
                                    writeLog.Writer("update client info AcknowledgementStockOptAcct failed ID clienInfo = " + data.ClientInfoID.ToString());
                                }
                            }
                            
                        }
                    }
                    else if (!string.IsNullOrEmpty(DKID_) && !string.IsNullOrEmpty(data.DKID.ToString()))
                    {
                        var DKID = new Guid(DKID_);
                        data.DKID = DKID;
                        if (data.Step <= 9)
                        {
                            data.Step = 8;
                        }

                        using (var clientdk_ctx = new OAOEntities())
                        {
                            var data_client = clientdk_ctx.Tb_ClientInfo.SingleOrDefault(b => b.ID == data.ClientInfoID);
                            if (so == "0")
                            {
                                data_client.AcknowledgementStockOptAcct = false;

                                if (clientdk_ctx.SaveChanges() > 0)
                                {
                                    writeLog.Writer("update client info AcknowledgementStockOptAcct successfully ID clienInfo = " + data.ClientInfoID.ToString());
                                }
                                else
                                {
                                    writeLog.Writer("update client info AcknowledgementStockOptAcct failed ID clienInfo = " + data.ClientInfoID.ToString());
                                }
                            }

                        }
                    }
                    else if (!string.IsNullOrEmpty(W8ID_) && string.IsNullOrEmpty(data.W8ID.ToString()))
                    {
                        var W8ID = new Guid(W8ID_);
                        data.W8ID = W8ID;
                        if (data.Step <= 11)
                        {
                            data.Step = 10;
                        }
                        
                        using(var client_ctx = new OAOEntities())
                        {
                            var data_client = client_ctx.Tb_ClientInfo.SingleOrDefault(b => b.ID == data.ClientInfoID);
                            //clientInfoID_ = data_client.ID;
                            using (var w8_addr_ctx = new OAOEntities())
                            {
                                var w8_addr = w8_addr_ctx.W8BEN_Address.Where(_ => _.FormID == data.W8ID).ToList();
                                foreach (W8BEN_Address addr_w8_ in w8_addr)
                                {
                                    if(addr_w8_.AddressType == "R")
                                    {
                                        data_client.ResidentialAddress1 = addr_w8_.Address1;
                                        data_client.ResidentialAddress2 = addr_w8_.Address2;
                                        data_client.ResidentialAddress3 = addr_w8_.Address3;
                                        data_client.ResidentialPostalCode = addr_w8_.PostalCode;
                                        data_client.ResidentialCountry = addr_w8_.Country;

                                    }
                                    else if(addr_w8_.AddressType == "M")
                                    {
                                        data_client.MailingAddress1 = addr_w8_.Address1;
                                        data_client.MailingAddress2 = addr_w8_.Address2;
                                        data_client.MailingAddress3 = addr_w8_.Address3;
                                        data_client.MailingPostalCode = addr_w8_.PostalCode;
                                        data_client.MailingCountry = addr_w8_.Country;
                                    }
                                }

                                if(data_client.ResidentialAddress1 == data_client.MailingAddress1 && data_client.ResidentialAddress2 == data_client.MailingAddress2 && data_client.ResidentialAddress3 == data_client.MailingAddress3 && data_client.ResidentialPostalCode == data_client.MailingPostalCode && data_client.ResidentialCountry == data_client.MailingCountry)
                                {
                                    data_client.SameMailingAddress = true;
                                }
                                else
                                {
                                    data_client.SameMailingAddress = false;
                                }

                                if(client_ctx.SaveChanges() > 0)
                                {
                                    writeLog.Writer("update client info address successfully ID clienInfo = " + data.ClientInfoID.ToString());
                                }
                                else
                                {
                                    writeLog.Writer("update client info address failed ID clienInfo = " + data.ClientInfoID.ToString());
                                }
                            }
                        }
                        
                    }

                    if (context_.SaveChanges() > 0)
                    {
                        
                        return true;
                        
                    }
                }

            }
            catch (Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
            }

            return false;
        }
        public async Task<ActionResult> Index()
        {
            WriteLog writeLog = new WriteLog();
            KeyController keyM = new KeyController();
            List<getAttachment> att1 = new List<getAttachment>();
            try
            {
                var Login = this.Request.QueryString["login"] != null ? this.Request.QueryString["login"] : "";
                var Intranet = this.Request.QueryString["intranet"] != null ? this.Request.QueryString["intranet"] : "";
                ViewBag.Source = this.Request.QueryString["Source"] != null ? this.Request.QueryString["Source"] : "";
                ViewBag.Lang = this.Request.QueryString["lang"] != null ? this.Request.QueryString["lang"] : "en-us";
                ViewBag.page = this.Request.QueryString["page"] != null ? this.Request.QueryString["page"] : "";
                ViewBag.AeCode = this.Request.QueryString["AECode"] != null ? this.Request.QueryString["AECode"] : "";
                HttpContext.Session["AeCode"] = this.Request.QueryString["AECode"] != null ? this.Request.QueryString["AECode"] : "";
                ViewBag.AeName = this.Request.QueryString["AEName"] != null ? this.Request.QueryString["AEName"] : "";
                HttpContext.Session["AeName"] = this.Request.QueryString["AEName"] != null ? this.Request.QueryString["AEName"] : "";
                HttpContext.Session["PromotionCode"] = this.Request.QueryString["PromoCode"] != null ? this.Request.QueryString["PromoCode"] : "";
                ViewBag.PromotionCode = this.Request.QueryString["PromoCode"] != null ? this.Request.QueryString["PromoCode"] : "";
                HttpContext.Session["lang"] = this.Request.QueryString["lang"] != null ? this.Request.QueryString["lang"] : "en-us";
                ViewBag.ID = this.Request.QueryString["ID"] != null ? this.Request.QueryString["ID"].ToString().ToLower() : "";
                var pid = this.Request.QueryString["token"] != null ? this.Request.QueryString["token"] : "";
                ViewBag.page_url = this.Request.QueryString["page"] != null ? this.Request.QueryString["page"] : "0";
                var DKID_ = this.Request.QueryString["DKID"] != null ? this.Request.QueryString["DKID"] : "";
                var RPQID_ = this.Request.QueryString["RPQID"] != null ? this.Request.QueryString["RPQID"] : "";
                var W8ID_ = this.Request.QueryString["W8ID"] != null ? this.Request.QueryString["W8ID"] : "";
                var so_ = this.Request.QueryString["so"] != null ? this.Request.QueryString["so"] : "1";

                SingleForm sform = build_url_SingleForm();
                if (pid != "")
                {
                    var res_dec = keyM.DecodeStr(pid.ToString());

                    //DecodedParam decPrm = (DecodedParam)json_serializer.DeserializeObject(res_dec);
                    var decPrm = JsonConvert.DeserializeObject<KeyParam>(res_dec);

                    var Ti = decPrm.iat;


                    var Tdt = Convert.ToInt64(Ti);
                    var start = keyM.JavaTimeStampToDateTime(Tdt);

                    DateTime end = DateTime.Now;

                    var result = (int)end.Subtract(start).TotalMinutes;

                    if (result > 1)
                    {
                        writeLog.Writer("iat more than 1 minutes iat total minute = " + result.ToString());
                        return RedirectToAction("ErrorPage", new
                        {
                            status = "401",
                            description = "Your Account not Authenticated",

                        });
                    }
                    string[] mNumb = (decPrm.mobileNo).Split(' ');
                    ViewBag.countryCode = mNumb[0];
                    string mobNum = "";
                    var i = 0;
                    foreach (var mb in mNumb)
                    {
                        if (i != 0)
                        {
                            mobNum = mobNum + mb;
                        }

                        i++;
                    }

                    ViewBag.MobileNumber = mobNum;
                    ViewBag.PID = decPrm.phillipId;

                }
                var lang_sf = "";
                switch (ViewBag.Lang)
                {
                    case "en-us":
                        lang_sf = "EN";
                        break;
                    case "zh-hk":
                        lang_sf = "ZH";
                        break;
                    case "zh-cn":
                        lang_sf = "GB";
                        break;

                }
                ViewBag.Version = (DateTime.Now).ToString();
                ViewBag.lang_sf = lang_sf;
                ViewBag.RPQ_SingleForm_URL = sform.url_RPQ;
                ViewBag.DK_SingleForm_URL = sform.url_DK;
                ViewBag.W8_SingleForm_URL = sform.url_W8;

                //var lang1 = HttpContext.Session["lang"];
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var lang = this.Request.QueryString["lang"] != null ? this.Request.QueryString["lang"] : "en-us";
                    IList<Country_List> country = context.Country_List.AsNoTracking().OrderBy(o => o.DisplaySequence).ToList<Country_List>();


                    object data;
                    if (ViewBag.ID != "")
                    {
                        var id = new Guid(ViewBag.ID);
                        var updateDATA_SF = await UpdateForm_SF(RPQID_.ToString(), W8ID_.ToString(), DKID_.ToString(), id, so_.ToString());
                        var dt = _formbll.Get(_ => _.ID == id);
                        var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
                        var resultCheckClient = 0;
                        if (dt_form.ClientInfoID.Value != null)
                        {
                            resultCheckClient = SetCheckClient(id, dt_form.ClientInfoID.Value, dt_form.Step);
                            if (resultCheckClient == 1)
                            {
                                dt_form.Step = 0;
                            }
                        }

                        if (Request.Cookies["OAOCookies"] != null)
                        {
                            if (dt_form.LastLoginTime.Date != DateTime.Now.Date)
                            {
                                if (Login == "1")
                                {
                                    if (Intranet == "1")
                                    {
                                        ViewBag.Login = "0";
                                        ViewBag.Intranet = "1";
                                    }
                                    else
                                    {
                                        Response.Cookies["OAOCookies"].Expires = DateTime.Now.AddDays(-1);
                                        ViewBag.Login = "1";
                                        ViewBag.Intranet = "0";
                                    }

                                }

                            }
                            else
                            {
                                if (Intranet == "1")
                                {
                                    ViewBag.Login = "0";
                                    ViewBag.Intranet = "1";
                                }
                                else
                                {
                                    if (Request.Cookies["OAOCookies"] != null)
                                    {
                                        if (Login == "0")
                                        {
                                            //Response.Cookies["OAOCookies"].Expires = DateTime.Now.AddDays(1);
                                            ViewBag.Login = "0";
                                            ViewBag.Intranet = "0";
                                        }
                                        else
                                        {
                                            Response.Cookies["OAOCookies"].Expires = DateTime.Now.AddDays(-1);
                                            ViewBag.Login = "1";
                                            ViewBag.Intranet = "0";
                                        }

                                    }
                                    else
                                    {
                                        Response.Cookies["OAOCookies"].Expires = DateTime.Now.AddDays(-1);
                                        ViewBag.Login = "1";
                                        ViewBag.Intranet = "0";
                                    }
                                }


                            }
                        }
                        else
                        {
                            if (Intranet == "1")
                            {
                                ViewBag.Login = "0";
                                ViewBag.Intranet = "1";
                            }
                            else
                            {
                                ViewBag.Login = "1";
                                ViewBag.Intranet = "0";
                            }
                            //ViewBag.Login = "1";
                        }

                        var cl = _clientbll.Get(_ => _.ID == dt_form.ClientInfoID);
                        var cl_form = _mapper.Map<_clientInfo>(cl.Data);
                        var sf = _softbll.Get(_ => _.ID == cl_form.SofID);
                        var sf_dt = _mapper.Map<_softInfo>(sf.Data);
                        var inv = _invbll.Get(_ => _.ID == cl_form.InvtObjID);
                        var inv_dt = _mapper.Map<_investmentObjective>(inv.Data);
                        var rpq = _rpqbll.Get(_ => _.ID == dt_form.RPQID);
                        var rpq_dt = _mapper.Map<_rpqForm>(rpq.Data);
                        var dr = _drbll.Get(_ => _.ID == dt_form.DKID);
                        var dr_dt = _mapper.Map<_derivative>(dr.Data);
                        var tx = _taxbll.GetAll(_ => _.FormID == dt_form.TRID);
                        var tx_dt = _mapper.Map<IEnumerable<_taxRes>>(tx.Data);
                        var nd = _ndbll.Get(_ => _.ID == dt_form.NDID);
                        var nd_dt = _mapper.Map<_ndForm>(nd.Data);
                        var w8 = _w8bll.Get(_ => _.FormID == dt_form.W8ID);
                        var w8_dt = _mapper.Map<_w8ben>(w8.Data);
                        var mr = _mrbll.Get(_ => _.ID == dt_form.MQID);
                        var mr_dt = _mapper.Map<_marginQuestion>(mr.Data);
                        //var att = _attcbll.GetAll(_ => _.FormID == dt_form.AttFormID);
                        //var att_dt = _mapper.Map<IEnumerable<_attachment>>(att.Data);
                        string uploadPath = ConfigurationManager.AppSettings["uploadPath"].ToString();
                        string uploadUrl = ConfigurationManager.AppSettings["uploadUrl"].ToString();
                        ViewBag.uploadPath = uploadPath.Replace(@"\", "/");
                        ViewBag.uploadUrl = uploadUrl;
                        var folder_ = "~/upload/" + dt_form.ID.ToString() + "/";
                        HttpContext.Session["folder"] = Server.MapPath(folder_);

                        //if (!Directory.Exists(@uploadPath))
                        //{
                        //    Directory.CreateDirectory(@uploadPath);
                        //}
                        List<_attachment> att_dt = new List<_attachment>();
                        using (var attcntx = new OAOEntities())
                        {
                            try
                            {
                                attcntx.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var att = attcntx.Tb_Attachment.Select(_ => new { _.AttachmentID, _.FormID }).Where(_ => _.FormID == dt_form.AttFormID).ToList();
                                foreach (var att_mt in att)
                                {
                                    if (dt_form.ApplicationMode == 1)
                                    {
                                        var attc = _attcbll.Get(_ => _.AttachmentID == att_mt.AttachmentID && _.AttachmentType != "Bank Deposit Slip");
                                        var attch = _mapper.Map<_attachment>(attc.Data);
                                        if (attch != null)
                                        {
                                            att_dt.Add(attch);
                                        }

                                    }
                                    else
                                    {
                                        var attc = _attcbll.Get(_ => _.AttachmentID == att_mt.AttachmentID);
                                        var attch = _mapper.Map<_attachment>(attc.Data);
                                        att_dt.Add(attch);
                                    }

                                };

                                foreach (_attachment att_mt in att_dt)
                                {
                                    var elem = XElement.Parse(att_mt.Attachment);
                                    var filename = elem.Element("name").Value;
                                    var cont = elem.Element("content").Value;

                                    att_mt.Attachment = filename;
                                    getAttachment at = new getAttachment();
                                    at.Name = filename;
                                    if (att_mt.AttachmentExt != ".PDF" && att_mt.AttachmentExt != ".pdf")
                                    {
                                        //at.Source = "data:image/png;base64," + elem.Element("content").Value;
                                        at.Source = "";
                                    }
                                    else
                                    {
                                        at.Source = "";
                                    }

                                    var folder1 = Path.Combine(@uploadPath, dt_form.ID.ToString());
                                    var folder = "~/upload/" + dt_form.ID.ToString() + "/";
                                    if (Directory.Exists(folder1))
                                    {
                                        if (Directory.Exists(folder1))
                                        {
                                            at.size = cont.Length / 4 * 3;
                                        }
                                        else
                                        {
                                            var path = Path.Combine(folder1, filename);
                                            at.size = new System.IO.FileInfo(path).Length;
                                        }
                                    }
                                    else
                                    {
                                        if (Directory.Exists(folder))
                                        {
                                            var path = Path.Combine(folder, filename);
                                            at.size = new System.IO.FileInfo(path).Length;
                                        }
                                        else
                                        {
                                            at.size = cont.Length / 4 * 3;
                                        }

                                    }


                                    at.FileType = att_mt.AttachmentType;
                                    at.Extension = att_mt.AttachmentExt;
                                    att1.Add(at);

                                }
                            }
                            catch (Exception e)
                            {
                                writeLog.Writer(e.Message + e.StackTrace);
                            }
                        }
                        var dk = _dkbll.Get(_ => _.ID == dt_form.DKID);
                        var dk_dt = _mapper.Map<_dkQuestionaire>(dk.Data);

                        //foreach (_attachment att_mt in att_dt)
                        //{
                        //    var elem = XElement.Parse(att_mt.Attachment);
                        //    var filename = elem.Element("name").Value;
                        //    var source = elem.Element("content").Value;
                        //    att_mt.Attachment = filename;
                        //    getAttachment at = new getAttachment();
                        //    at.Name = filename;
                        //    if (att_mt.AttachmentExt != ".PDF" && att_mt.AttachmentExt != ".pdf")
                        //    {
                        //        at.Source = "data:image/png;base64," + elem.Element("content").Value;
                        //    }
                        //    else
                        //    {
                        //        at.Source = "";
                        //    }

                        //    at.FileType = att_mt.AttachmentType;
                        //    at.Extension = att_mt.AttachmentExt;
                        //    att1.Add(at);

                        //}
                        string dtr = "";
                        if (cl_form.DateOfBirth.HasValue)
                        {
                            dtr = (cl_form.DateOfBirth.Value).ToString("yyyy-MM-dd");
                        }
                        else
                        {
                            dtr = "";
                        }
                        if (dt_form.SubmittedDateTime == null && dt_form.SubmitStatus == null && Intranet == "1")
                        {
                            Response.Cookies["OAOCookies"].Expires = DateTime.Now.AddDays(-1);
                            ViewBag.Login = "1";
                        }
                        data = new
                        {
                            data_form = dt_form,
                            //data_country = country,
                            data_clientInfo = cl_form,
                            data_soft = sf_dt,
                            data_invest_obj = inv_dt,
                            data_rpq = rpq_dt,
                            data_derivative = dr_dt,
                            data_taxres = tx_dt,
                            data_NDForm = nd_dt,
                            data_w8 = w8_dt,
                            data_mr = mr_dt,
                            data_attach = att_dt,
                            data_dkQuestionaire = dk_dt,
                            data_File = att1,
                            AllowedCheckFTIN = "australia,bermuda,british virgin islands,cayman islands,japan",
                            ClientDateBirth = dtr,
                        };


                    }
                    else
                    {

                        data = new
                        {
                            data_form = "null",
                            //data_country = country,
                            data_clientInfo = "null",
                        };
                    }


                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    serializer.MaxJsonLength = 50000000;
                    JavaScriptSerializer countryser = new JavaScriptSerializer();
                    countryser.MaxJsonLength = 50000000;
                    ViewData["data"] = serializer.Serialize(data);
                    ViewData["data_country"] = countryser.Serialize(country);



                }
            }
            catch (Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
                return RedirectToAction("ErrorPage", new
                {
                    status = "401",
                    description = e.Message + e.StackTrace,

                });
            }

            return View();
        }

        public int SetCheckClient(Guid FormID, Guid ClienInfoID, int Step)
        {
            int result = 0;
            WriteLog writeLog = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    if (ClienInfoID != null)
                    {
                        try
                        {
                            using (var client_context = new OAOEntities())
                            {
                                client_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var now = DateTime.Now;
                                var rs = client_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == ClienInfoID);
                                if (rs != null)
                                {
                                    if (Step > 0)
                                    {
                                        if (rs.ClientName != "" && rs.DateOfBirth != null)
                                        {
                                            writeLog.Writer("FormID is set and client info not empty in FormID = " + FormID + " and ClientInfoID = " + ClienInfoID);
                                        }
                                        else
                                        {
                                            var form = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == FormID);
                                            if (form != null)
                                            {
                                                if (Step >= 1)
                                                {
                                                    form.Step = 0;

                                                }
                                                if (context.SaveChanges() > 0)
                                                {
                                                    writeLog.Writer("there out application inject oao/fao using ID " + FormID + " need sign step from " + Step + " to 0");
                                                    result = 1;
                                                }
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    var form = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == FormID);
                                    if (form != null)
                                    {
                                        if (Step >= 1)
                                        {
                                            form.Step = 0;

                                        }
                                        if (context.SaveChanges() > 0)
                                        {
                                            writeLog.Writer("there out application inject oao using ID " + FormID + " need sign step to 0 not 1");
                                            result = 1;
                                        }
                                    }
                                }
                            }
                            return result;
                        }
                        catch (Exception e)
                        {
                            writeLog.Writer(e.Message + e.StackTrace);
                        }

                    }
                    else
                    {
                        try
                        {
                            var form = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == FormID);
                            if (form != null)
                            {
                                if (Step >= 1)
                                {
                                    form.Step = 0;

                                }
                                if (context.SaveChanges() > 0)
                                {
                                    writeLog.Writer("there out application inject oao using ID " + FormID + " need sign step to 0 not 1");
                                    result = 1;
                                }
                            }
                            //return true;
                        }
                        catch (Exception e)
                        {
                            writeLog.Writer(e.Message + e.StackTrace);
                        }
                    }

                }

                return result;
            }
            catch (Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
            }

            return result;
        }

        public JsonResult GetBack(string language, Guid ID, bool GetAttacment)
        {
            WriteLog writeLog = new WriteLog();
            ResultgetBack rs = new ResultgetBack();
            List<getAttachment> att1 = new List<getAttachment>();

            try
            {
                
                //var lang1 = HttpContext.Session["lang"];
                using (var context = new OAOEntities())
                {
                    
                    IList<Country_List> country = context.Country_List.AsNoTracking().ToList<Country_List>();

                    if (ViewBag.ID != "")
                    {
                        
                        var dt = _formbll.Get(_ => _.ID == ID);
                        var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
                        var cl = _clientbll.Get(_ => _.ID == dt_form.ClientInfoID);
                        var cl_form = _mapper.Map<_clientInfo>(cl.Data);
                        var sf = _softbll.Get(_ => _.ID == cl_form.SofID);
                        var sf_dt = _mapper.Map<_softInfo>(sf.Data);
                        var inv = _invbll.Get(_ => _.ID == cl_form.InvtObjID);
                        var inv_dt = _mapper.Map<_investmentObjective>(inv.Data);
                        var rpq = _rpqbll.Get(_ => _.ID == dt_form.RPQID);
                        var rpq_dt = _mapper.Map<_rpqForm>(rpq.Data);
                        var dr = _drbll.Get(_ => _.ID == dt_form.DKID);
                        var dr_dt = _mapper.Map<_derivative>(dr.Data);
                        var tx = _taxbll.GetAll(_ => _.FormID == dt_form.TRID);
                        var tx_dt = _mapper.Map<IEnumerable<_taxRes>>(tx.Data);
                        var nd = _ndbll.Get(_ => _.ID == dt_form.NDID);
                        var nd_dt = _mapper.Map<_ndForm>(nd.Data);
                        var w8 = _w8bll.Get(_ => _.FormID == dt_form.W8ID);
                        var w8_dt = _mapper.Map<_w8ben>(w8.Data);
                        var mr = _mrbll.Get(_ => _.ID == dt_form.MQID);
                        var mr_dt = _mapper.Map<_marginQuestion>(mr.Data);
                        //var att = _attcbll.GetAll(_ => _.FormID == dt_form.AttFormID);
                        //var att_dt = _mapper.Map<IEnumerable<_attachment>>(att.Data);
                        List<_attachment> att_dt = new List<_attachment>();
                        using (var attcntx = new OAOEntities())
                        {
                            if (GetAttacment == true)
                            {
                                try
                                {
                                    attcntx.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                    var att = attcntx.Tb_Attachment.Select(_ => new { _.AttachmentID, _.FormID }).Where(_ => _.FormID == dt_form.AttFormID).ToList();
                                    foreach (var att_mt in att)
                                    {
                                        if (dt_form.ApplicationMode == 1)
                                        {
                                            var attc = _attcbll.Get(_ => _.AttachmentID == att_mt.AttachmentID && _.AttachmentType != "Bank Deposit Slip");
                                            var attch = _mapper.Map<_attachment>(attc.Data);
                                            if(attch != null)
                                            {
                                                att_dt.Add(attch);
                                            }
                                           
                                        }
                                        else
                                        {
                                            var attc = _attcbll.Get(_ => _.AttachmentID == att_mt.AttachmentID);
                                            var attch = _mapper.Map<_attachment>(attc.Data);
                                            att_dt.Add(attch);
                                        }
                                    };
                                    foreach (_attachment att_mt in att_dt)
                                    {
                                        var elem = XElement.Parse(att_mt.Attachment);
                                        var filename = elem.Element("name").Value;

                                        att_mt.Attachment = filename;
                                        getAttachment at = new getAttachment();
                                        at.Name = filename;
                                        if (att_mt.AttachmentExt != ".PDF" && att_mt.AttachmentExt != ".pdf")
                                        {
                                            at.Source = "";
                                        }
                                        else
                                        {
                                            at.Source = "";
                                        }
                                        at.FileType = att_mt.AttachmentType;
                                        at.Extension = att_mt.AttachmentExt;
                                        att1.Add(at);

                                    }
                                }
                                catch (Exception e)
                                {
                                    writeLog.Writer(e.Message + e.StackTrace);
                                }
                            }
                                
                        }
                        var dk = _dkbll.Get(_ => _.ID == dt_form.DKID);
                        var dk_dt = _mapper.Map<_dkQuestionaire>(dk.Data);

                        

                        rs.data_form = dt_form;
                        rs.data_country = country;
                        rs.data_clientInfo = cl_form;
                        rs.data_soft = sf_dt;
                        rs.data_invest_obj = inv_dt;
                        rs.data_rpq = rpq_dt;
                        rs.data_derivative = dr_dt;
                        rs.data_taxres = tx_dt;
                        rs.data_NDForm = nd_dt;
                        rs.data_w8 = w8_dt;
                        rs.data_mr = mr_dt;
                        rs.data_attach = att_dt;
                        rs.data_dkQuestionaire = dk_dt;
                        rs.data_File = att1;
                        rs.AllowedCheckFTIN = "australia,bermuda,british virgin islands,cayman islands,japan";
                        if (cl_form != null)
                        {
                            if (cl_form.DateOfBirth.Value != null)
                            {
                                rs.ClientDateBirth = (cl_form.DateOfBirth.Value).ToString("yyyy-MM-dd");
                            }
                            else
                            {
                                rs.ClientDateBirth = "";
                            }
                        }
                        else
                        {
                            rs.ClientDateBirth = "";
                        }

                    }
                    else
                    {

                        rs.data_form = "null";
                        rs.data_country = "null";
                        rs.data_clientInfo = "null";
                        rs.data_soft = "null";
                        rs.data_invest_obj = "null";
                        rs.data_rpq = "null";
                        rs.data_derivative = "null";
                        rs.data_taxres = "null";
                        rs.data_NDForm = "null";
                        rs.data_w8 = "null";
                        rs.data_mr = "null";
                        rs.data_attach = "null";
                        rs.data_dkQuestionaire = "null";
                        rs.data_File = "null";
                        rs.AllowedCheckFTIN = "australia,bermuda,british virgin islands,cayman islands,japan";
                    }


                }
                
            }
            catch (Exception e)
            {
                writeLog.Writer(e.ToString());
            }

            return Json(rs, JsonRequestBehavior.AllowGet);

        }

        public class data_res
        {
            public Boolean need_update { get; set; }
            public Boolean W8_ID_empty { get; set; }
        }

        public JsonResult check_W8(Guid ID)
        {
            WriteLog writeLog = new WriteLog();
            result rs = new result();
            //data_res data = new data_res();

            try
            {
                using (var context = new OAOEntities())
                {
                    var dt = _formbll.Get(_ => _.ID == ID);
                    var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
                    var w8 = _w8bll.Get(_ => _.FormID == dt_form.W8ID);
                    var dt_w8 = _mapper.Map<_w8ben>(w8.Data);

                    if(dt_form.Step > 10)
                    {
                        if (dt_w8 == null)
                        {
                            var data = new
                            {
                                W8_ID_empty = true
                            };

                            rs.data = data;
                        }
                        else
                        {
                            if (!String.IsNullOrEmpty(dt_form.W8ID.ToString() as string))
                            {
                                //data = new
                                //{
                                //    need_update = false
                                //};
                                //data.W8_ID_empty = false;

                                var data = new
                                {
                                    W8_ID_empty = false
                                };

                                rs.data = data;

                            }
                            else
                            {
                                //data = new
                                //{
                                //    need_update = true
                                //};
                                //data.W8_ID_empty = true;
                                var data = new
                                {
                                    W8_ID_empty = true
                                };

                                rs.data = data;
                            }
                        }
                    }
                    else
                    {
                        //data.W8_ID_empty = true;
                        var data = new
                        {
                            W8_ID_empty = true
                        };

                        rs.data = data;
                    }
                    
                }

                rs.success = true;
                rs.message = "success";
            }
            catch (Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
                rs.success = false;
                rs.message = "failed";
            }

            return Json(rs, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Check_DK_RPQ(Guid ID)
        {
            WriteLog writeLog = new WriteLog();
            result rs = new result();
            data_res data = new data_res();

            try
            {
                using (var context = new OAOEntities())
                {
                    var dt = _formbll.Get(_ => _.ID == ID);
                    var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
                    var cl = _clientbll.Get(_ => _.ID == dt_form.ClientInfoID);
                    var cl_form = _mapper.Map<_clientInfo>(cl.Data);
                    var rpq = _rpqbll.Get(_ => _.ID == dt_form.RPQID);
                    var rpq_dt = _mapper.Map<_rpqForm>(rpq.Data);
                    var dr = _drbll.Get(_ => _.ID == dt_form.DKID);
                    var dr_dt = _mapper.Map<_derivative>(dr.Data);
                    var w8 = _w8bll.Get(_ => _.FormID == dt_form.W8ID);
                    var dt_w8 = _mapper.Map<_w8ben>(w8.Data);
                    if(cl_form != null)
                    {
                        switch (dt_form.ApplicationMode)
                        {
                            case 1:
                                if (cl_form.AcknowledgementStockOptAcct == true && rpq_dt.RPQScore < 71)
                                {
                                    if(!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                    {
                                        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1))
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};
                                            data.need_update = false;


                                        }
                                        else
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};

                                            data.need_update = true;
                                        }
                                    }
                                    else
                                    {
                                        data.need_update = true;
                                    }
                                    

                                    rs.data = data;
                                }
                                else if (cl_form.AcknowledgementStockOptAcct == true && rpq_dt.RPQScore > 71)
                                {
                                    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                    {
                                        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1))
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};
                                            data.need_update = false;


                                        }
                                        else
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};

                                            data.need_update = true;
                                        }
                                    }
                                    else
                                    {
                                        data.need_update = false;
                                    }

                                    rs.data = data;
                                }
                                //else if (cl_form.AcknowledgementStockOptAcct == false && rpq_dt.RPQScore > 71)
                                //{
                                //    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                //    {
                                //        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1.ToString() as string))
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};
                                //            data.need_update = false;


                                //        }
                                //        else
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};

                                //            data.need_update = false;
                                //        }
                                //    }
                                //    else
                                //    {
                                //        data.need_update = false;
                                //    }

                                //    rs.data = data;
                                //}
                                //else if (cl_form.AcknowledgementStockOptAcct == true && rpq_dt.RPQScore < 71)
                                //{
                                //    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                //    {
                                //        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1.ToString() as string))
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};
                                //            data.need_update = true;


                                //        }
                                //        else
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};

                                //            data.need_update = true;
                                //        }
                                //    }
                                //    else
                                //    {
                                //        data.need_update = false;
                                //    }
                                    //rs.data = data;
                                //}
                                else
                                {
                                    //data = new
                                    //{
                                    //    need_update = false
                                    //};
                                    data.need_update = false;
                                    rs.data = data;
                                }
                                break;
                            case 0:
                                if (cl_form.AcknowledgementStockOptAcct == true && rpq_dt.RPQScore < 71)
                                {
                                    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                    {
                                        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1))
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};
                                            data.need_update = true;


                                        }
                                        else
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};

                                            data.need_update = true;
                                        }
                                    }
                                    else
                                    {
                                        data.need_update = true;
                                    }

                                    rs.data = data;
                                }
                                else if (cl_form.AcknowledgementStockOptAcct == true && rpq_dt.RPQScore > 71)
                                {
                                    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                    {
                                        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1))
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};
                                            data.need_update = false;


                                        }
                                        else
                                        {
                                            //data = new
                                            //{
                                            //    need_update = true
                                            //};

                                            data.need_update = true;
                                        }
                                    }
                                    else
                                    {
                                        data.need_update = false;
                                    }

                                    rs.data = data;
                                }
                                //else if (cl_form.AcknowledgementStockOptAcct == false && rpq_dt.RPQScore > 71)
                                //{
                                //    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                //    {
                                //        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1.ToString() as string))
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};
                                //            data.need_update = true;


                                //        }
                                //        else
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};

                                //            data.need_update = true;
                                //        }
                                //    }
                                //    else
                                //    {
                                //        data.need_update = false;
                                //    }

                                //    rs.data = data;
                                //}
                                //else if (cl_form.AcknowledgementStockOptAcct == true && rpq_dt.RPQScore < 71)
                                //{
                                //    if (!String.IsNullOrEmpty(dt_form.DKID.ToString() as string))
                                //    {
                                //        if (!String.IsNullOrEmpty(dr_dt.AcquireFrom1.ToString() as string))
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};
                                //            data.need_update = true;


                                //        }
                                //        else
                                //        {
                                //            //data = new
                                //            //{
                                //            //    need_update = true
                                //            //};

                                //            data.need_update = true;
                                //        }
                                //    }
                                //    else
                                //    {
                                //        data.need_update = false;
                                //    }
                                //    rs.data = data;
                                //}
                                else
                                {
                                    //data = new
                                    //{
                                    //    need_update = false
                                    //};
                                    data.need_update = false;
                                    rs.data = data;
                                }
                                break;
                        }
                    }
                    else
                    {
                        data.need_update = false;
                    }
                    
                    if (dt_w8 == null)
                    {
                        data.W8_ID_empty = true;

                        rs.data = data;
                    }
                    else
                    {
                        if (!String.IsNullOrEmpty(dt_form.W8ID.ToString() as string))
                        {
                            //data = new
                            //{
                            //    need_update = false
                            //};
                            data.W8_ID_empty = false;

                            rs.data = data;

                        }
                        else
                        {
                            //data = new
                            //{
                            //    need_update = true
                            //};
                            data.W8_ID_empty = true;

                            rs.data = data;
                        }
                    }
                    
                }
                
                rs.success = true;
                rs.message = "success";
            }
            catch(Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }

            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPDF64(string id)
        {
            result rs = new result();
            WriteLog writeLog = new WriteLog();
            var dGuid = new Guid(id);
            try
            {
                using (var ncontext = new OAOEntities())
                {
                    ncontext.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var att = ncontext.Tb_Attachment.Where(_ => _.AttachmentID == dGuid).FirstOrDefault();

                    var elem = XElement.Parse(att.Attachment);
                    var filename = elem.Element("name").Value;
                    var source = elem.Element("content").Value;

                    rs.data = source;
                    rs.message = "success";
                    rs.success = true;
                    

                }
            }
            catch (Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.message = e.Message + e.StackTrace;
                rs.success = false;
            }
            var Jsonlen = JsonConvert.SerializeObject(rs).Length;
            var JsonResult =  Json(rs, JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = Jsonlen; 
            return JsonResult;
        }

        public Object GetDataPage()
        {
            using(var context = new OAOEntities())
            {
                IList<Country_List> country = context.Country_List.AsNoTracking().ToList<Country_List>();
                var data = new
                {
                    data_country = country
                };
                return data;

            }
            
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult CreateKeyP3()
        {
            ViewBag.Message = "Your create key page";
            return View();
        }

        public ActionResult DecodeKeP3()
        {
            ViewBag.Message = "Your decode key page";
            return View();
        }

        public ActionResult ErrorPage(string status, string description)
        {
            ViewBag.Message = "Your decode key page";
            return View();
        }
    }
}