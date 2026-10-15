using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.BLL.RPQForm.Logic;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel8Controller : Controller
    {
        // GET: Panel8
        private IMapper _mapper;
        private RPQLogics _rpqbll;
        public Panel8Controller()
        {
            BaseMapper basemap = new BaseMapper();
            _mapper = basemap._mapper;
            _rpqbll = new RPQLogics();
        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetScore(string ID)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                var rpq = _rpqbll.Get(_ => _.ID == new Guid(ID));
                var rpq_dt = _mapper.Map<_rpqForm>(rpq.Data);
                if (rpq_dt != null)
                {
                    rs.data = rpq_dt;
                    rs.success = true;
                    rs.message = "success";
                    return Json(rs, JsonRequestBehavior.AllowGet);
                }
            }
            catch(Exception ex)
            {
                wl.Writer(ex.ToString());
                rs.data = null;
                rs.success = false;
                rs.message = "failed";
            }
            

            return Json(rs, JsonRequestBehavior.AllowGet);

        }

        public JsonResult saveUpdatePanel8(Guid ID, bool StockOption)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID);

                    if (fm != null)
                    {
                        if (fm.Step <= 8)
                        {
                            fm.Step = 7;
                        }
                        //fm.Step = 13;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;
                        if (context.SaveChanges() > 0)
                        {
                            wl.Writer("successfully client Tb_AccOpenRequest save Step : " + fm.Step);
                            using (var new_context = new OAOEntities())
                            {
                                new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                                if(cl != null)
                                {
                                    if( StockOption == false)
                                    {
                                        cl.AcknowledgementStockOptAcct = StockOption;
                                        if(new_context.SaveChanges() > 0)
                                        {
                                            rs.success = true;
                                            rs.message = "success";
                                            wl.Writer("successfully client Tb_ClientInfo save FormID " + ID + "  Step : " + fm.Step);
                                        }
                                    }
                                    else
                                    {
                                        wl.Writer("failed client Tb_ClientInfo save FormID " + ID + " Step : " + fm.Step);
                                    }
                                }
                            }
                            var dt = new
                            {
                                data =  fm.ID,
                                page = fm.Step
                            };
                            rs.data = dt;
                            rs.success = true;
                            rs.message = "success";
                        }
                        else
                        {
                            rs.data = null;
                            rs.success = false;
                            rs.message = "failed";
                            wl.Writer("failed client Tb_AccOpenRequest save FormID " + ID + " Step : " + fm.Step);
                        }

                    }
                }
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}