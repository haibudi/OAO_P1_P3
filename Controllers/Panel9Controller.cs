using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel9Controller : Controller
    {
        // GET: Panel9
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel9(Panel9 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step <= 9)
                        {
                            fm.Step = 8;
                        }
                        var dt = new
                        {
                            page = fm.Step,
                        };
                        rs.data = dt;
                        //fm.Step = 10;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;
                        if (context.SaveChanges() > 0)
                        {
                            wl.Writer("success client Tb_AccOpenRequest save Step : " + fm.Step);
                            using (var new_context = new OAOEntities())
                            {
                                new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);

                                using (var dk_context = new OAOEntities())
                                {
                                    dk_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                    var dk = dk_context.Tb_DKQuestionnaire.SingleOrDefault(_ => _.ID == fm.DKID);
                                    if (dk != null)
                                    {

                                        dk.AcquireFrom1 = param.AcquireFrom1;
                                        dk.AcquireFrom2 = param.AcquireFrom2;
                                        dk.B2BCompany = "PH";
                                        dk.Version = "1.0";
                                        dk.ParentForm = "OAO Page 3 Form";
                                        //dk.LastUpdateTime = DateTime.Now;

                                        if (dk_context.SaveChanges() > 0)
                                        {
                                            wl.Writer("success client Tb_DKQuestionnaire save FormID " + param.ID_Form + " Step : " + fm.Step);
                                            rs.data = null;
                                            rs.success = true;
                                            rs.message = "success";
                                        }
                                        else
                                        {
                                            wl.Writer("failed client Tb_DKQuestionnaire save FormID " + param.ID_Form + " Step : " + fm.Step);
                                        }
                                    }
                                    else
                                    {
                                        var dkm = new Tb_DKQuestionnaire()
                                        {
                                            ID = Guid.NewGuid(),
                                            AcquireFrom1 = param.AcquireFrom1,
                                            AcquireFrom2 = param.AcquireFrom2,
                                            Accode = "0",
                                            Status = 1,
                                            B2BCompany = "PH",
                                            Version = "1.0",
                                            ParentForm = "Phase 2",
                                            SubmitTime = DateTime.Now,
                                            LastUpdateTime = DateTime.Now,

                                        };

                                        dk_context.Tb_DKQuestionnaire.Add(dkm);
                                        if (dk_context.SaveChanges() > 0)
                                        {
                                            wl.Writer("success client Tb_DKQuestionnaire save FormID " + param.ID_Form + " Step : " + fm.Step);
                                            fm.DKID = dkm.ID;
                                            if (context.SaveChanges() > 0)
                                            {
                                                var mb = new
                                                {
                                                    AcknowledgementStockOptAcct = true,
                                                    DK_ID = dkm.ID,
                                                };
                                                rs.data = mb;
                                                rs.success = true;
                                                rs.message = "success";
                                            }
                                            else
                                            {
                                                rs.data = null;
                                                rs.success = false;
                                                rs.message = "failed";
                                            }
                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client Tb_DKQuestionnaire save FormID " + param.ID_Form + " Step : " + fm.Step);
                                        }

                                    }

                                };


                                if (cl != null)
                                {
                                    if(cl.AcknowledgementStockOptAcct == true && param.AcquireFrom1 == null)
                                    {
                                        cl.AcknowledgementStockOptAcct = false;
                                        cl.LastUpdateTime = DateTime.Now;

                                        
                                    }
                                    else if (cl.AcknowledgementStockOptAcct == false && param.AcquireFrom1 != null)
                                    {
                                        cl.AcknowledgementStockOptAcct = true;
                                        cl.LastUpdateTime = DateTime.Now;
                                    }else if (cl.AcknowledgementStockOptAcct == true && param.AcquireFrom1 != null)
                                    {
                                        cl.AcknowledgementStockOptAcct = true;
                                        cl.LastUpdateTime = DateTime.Now;


                                    }
                                    else
                                    {
                                        cl.AcknowledgementStockOptAcct = false;
                                        cl.LastUpdateTime = DateTime.Now;
                                    }

                                    if (new_context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client Clieni_info save FormID " + param.ID_Form + " Step : " + fm.Step);
                                        //rs.data = null;
                                        rs.success = true;
                                        rs.message = "success";
                                    }
                                    else
                                    {
                                        rs.data = null;
                                        rs.success = false;
                                        rs.message = "failed";
                                        wl.Writer("failed client Clieni_info save FormID " + param.ID_Form + " Step : " + fm.Step);
                                    }

                                }

                                //}
                            }
                            //else
                            //{
                            //    rs.data = null;
                            //    rs.success = false;
                            //    rs.message = "failed";
                            //}
                        }
                    }
                }
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
                rs.message = e.ToString();
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}