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
using System.Net;

namespace OAO.Controllers
{
    public class ViewPageController : Controller
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
        public ViewPageController()
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

        // GET: ViewPage

        public ActionResult Index()
        {
            return View("NotAuthenticate");
        }

        public ActionResult DownloadPage()
        {
            WriteLog writeLog = new WriteLog();
            KeyController keyM = new KeyController();
            List<getAttachment> att1 = new List<getAttachment>();
            try
            {
                List<string> IPList = GetAllowedIP();
                var ip = GetIPAddress();
                var tp = 0;
                foreach (var ip_ in IPList)
                {
                    if (ip == ip_)
                    {
                        tp++;
                    }
                }

                if (tp == 0)
                {
                    return View("NotAuthenticate");
                }

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
                ViewBag.ID = this.Request.QueryString["p"] != null ? this.Request.QueryString["p"].ToString().ToLower() : "";
                var pid = this.Request.QueryString["token"] != null ? this.Request.QueryString["token"] : "";
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
                ViewBag.Version = (DateTime.Now.Date).ToString();

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
                            data_country = country,
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

        public List<string> GetAllowedIP()
        {
            List<string> IPList = new List<string>();
            var ip_ = ConfigurationManager.AppSettings["AllowedIPAccess"].ToString();
            IPList = ip_.Split(new char[] { ',' }).ToList();

            return IPList;
        }

        public string GetIPAddress()
        {
            //var IPAddress = "";
            //IPHostEntry Host = default(IPHostEntry);
            //string Hostname = null;
            //Hostname = System.Environment.MachineName;
            //Host = Dns.GetHostEntry(Hostname);
            //foreach (IPAddress IP in Host.AddressList)
            //{
            //    if (IP.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
            //    {
            //        IPAddress = Convert.ToString(IP);
            //    }
            //}
            //return IPAddress;

            HttpContext context = System.Web.HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }

        public ActionResult VerifiedAccess(Guid p, string lang)
        {
            List<string> IPList = GetAllowedIP();
            var ip = GetIPAddress();

            foreach (var ip_ in IPList)
            {
                if (ip == ip_)
                {
                    return RedirectToAction("DownloadPage", new
                    {
                        p = p,
                        lang = lang,
                        intranet = 1,
                        login = 1

                    });
                }
            }
            return RedirectToAction("Index", new
            {
                status = "405",
                description = "your ip address not allowed",

            });
        }
    }
}