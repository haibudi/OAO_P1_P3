using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;
using OAO.Controllers;
//using OAO.Controllers;
using AutoMapper;
using OAO.BLL.Form.FormLogic;
using OAO.BLL.Client_Info.Logic;

namespace OAO.Controllers
{
    public class Panel3Controller : Controller
    {
        // GET: Panel3
        public ActionResult Index()
        {
            return View();
        }

        private IMapper _mapper;
        private FormLogic _formbll;
        private ClientLogic _clientbll;
        public Panel3Controller()
        {
            BaseMapper basemap = new BaseMapper();
            _mapper = basemap._mapper;
            _formbll = new FormLogic();
            _clientbll = new ClientLogic();
        }

        
        [HttpPost]
        public JsonResult saveUpdatePanel3(Panel2 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using(var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step <= 2)
                        {
                            fm.Step = 2;
                        }

                        //fm.Step = 4;
                        var data = new
                        {
                            page = fm.Step,
                        };
                        rs.data = data; 
                        //fm.LastStatusUpdatedTime = DateTime.Now;

                        //if (context.SaveChanges() > 0)
                        //{
                            using (var new_context = new OAOEntities())
                            {
                                new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                                if (cl != null)
                                {
                                    cl.AcknowledgementCashAcct = param.AcknowledgementCashAcct;
                                    cl.AcknowledgementMarginAcct = param.AcknowledgementMarginAcct;
                                    if(cl.AcknowledgementCashAcct == null && cl.AcknowledgementMarginAcct == null)
                                    {
                                        rs.success = false;
                                        rs.message = "failed AcknowledgementCashAcct and AcknowledgementCashAcct == null " + fm.ID + " Step: " + fm.Step;
                                        wl.Writer("failed AcknowledgementCashAcct and AcknowledgementCashAcct == null " + fm.ID + " Step : " + fm.Step);
                                        return Json(rs, JsonRequestBehavior.AllowGet);
                                    }
                                    cl.AcknowledgementOnlinePoemsTradingService = param.AcknowledgementOnlinePoemsTradingService;
                                    cl.AcknowledgementStockOptAcct = param.AcknowledgementStockOptAcct;
                                    cl.AcknowledgementChinaConnectTradingService = param.AcknowledgementChinaConnectTradingService;
                                    cl.AcknowledgementByCust1 = true;
                                    cl.AcknowledgementByCust2 = true;
                                    cl.AcknowledgementByCust3 = true;
                                    cl.AcknowledgementByCust5 = true;
                                    cl.AcknowledgementByCust6 = true;
                                    cl.LastUpdateTime = DateTime.Now;
                                    cl.AcknowledgementHKIDR = param.AcknowledgementHKIDR;
                                    if (new_context.SaveChanges() > 0)
                                    {
                                        //var dt = _formbll.Get(_ => _.ID == param.ID_Form);
                                        //var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
                                        //var cl_ = _clientbll.Get(_ => _.ID == dt_form.ClientInfoID);
                                        //var cl_form = _mapper.Map<_clientInfo>(cl_.Data);
                                        //var frm = new
                                        //{
                                        //    data_form = dt_form,
                                        //    client_info = cl_form,
                                        //};
                                        using(var lnd_context = new OAOEntities())
                                        {
                                            lnd_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                            var lnd = lnd_context.Tb_NDForm.SingleOrDefault(_ => _.ID == fm.NDID);
                                            if(lnd != null)
                                            {
                                                lnd.IsNotAustralian = param.isAutralia;
                                                lnd.IsNotCanadian = param.isCanada;
                                                lnd.IsNotChinese = param.isTaiwan;
                                                lnd.IsNotFinnish = param.isFinland;
                                                lnd.IsNotJPXOfficer = param.isJapan;
                                                lnd.IsNotKorean = param.isKorea;
                                                lnd.Status = 1;
                                                lnd.LastUpdateTime = DateTime.Now;
                                                //lnd.SubmitTime = DateTime.Now;
                                            if (lnd_context.SaveChanges() > 0)
                                                {
                                                    rs.success = true;
                                                    rs.message = "success";
                                                    wl.Writer("sucessfully NDFORM save ID " + fm.ID + " Step : " + fm.Step);
                                            }
                                                else
                                                {
                                                    rs.success = false;
                                                    rs.message = "failed";
                                                    wl.Writer("failed NDFORM save ID " + fm.ID + " Step : " + fm.Step);
                                                }
                                            }
                                            else
                                            {
                                                var ln_dt = new Tb_NDForm()
                                                {
                                                    ID = Guid.NewGuid(),
                                                    IsNotAustralian = param.isAutralia,
                                                    IsNotCanadian = param.isCanada,
                                                    IsNotChinese = param.isTaiwan,
                                                    IsNotFinnish = param.isFinland,
                                                    IsNotJPXOfficer = param.isJapan,
                                                    IsNotKorean = param.isKorea,
                                                    Status = 1,
                                                    LastUpdateTime = DateTime.Now,
                                                    //SubmitTime = DateTime.Now,

                                                };

                                                lnd_context.Tb_NDForm.Add(ln_dt);
                                                if(lnd_context.SaveChanges() > 0)
                                                {
                                                    fm.NDID = ln_dt.ID;
                                                    fm.SubmitStatus = null;
                                                    fm.SubmittedDateTime = null;
                                                    if (context.SaveChanges() > 0)
                                                    {
                                                        rs.success = true;
                                                        rs.message = "success";
                                                        wl.Writer("sucessfully NDFORM save ID " + fm.ID + " Step : " + fm.Step);
                                                    }
                                                }
                                                else
                                                {
                                                    rs.success = false;
                                                    rs.message = "failed";
                                                    wl.Writer("failed NDFORM save ID " + fm.ID + " Step : " + fm.Step);
                                                }
                                            }
                                        }
                                       
                                        rs.success = true;
                                        rs.message = "success";
                                        wl.Writer("sucessfully NDFORM save ID " + fm.ID + " Step : " + fm.Step);
                                    }
                                    else
                                    {
                                        //rs.data = null;
                                        rs.success = false;
                                        rs.message = "failed";
                                        wl.Writer("failed NDFORM save ID " + fm.ID + " Step : " + fm.Step);
                                    }
                                }

                            }
                        //}
                        //else
                        //{
                        //    rs.data = null;
                        //    rs.success = false;
                        //    rs.message = "failed";
                        //}

                    }
                }

            }catch(Exception e)
            {
               wl.Writer(e.Message + e.StackTrace);
                
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}