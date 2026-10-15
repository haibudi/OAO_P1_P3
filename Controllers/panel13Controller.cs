using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class panel13Controller : Controller
    {
        // GET: panel13
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel13(panel13 prm)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == prm.ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step <= 13)
                        {
                            fm.Step = 12;
                        }
                        //fm.Step = 14;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.LastLoginTime = DateTime.Now;

                        using (var new_context = new OAOEntities())
                        {
                            new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            if (fm != null)
                            {
                                using (var mq_context = new OAOEntities())
                                {
                                    var mq = mq_context.Tb_MarginQuestion.SingleOrDefault(_ => _.ID == fm.MQID);
                                    if (mq != null)
                                    {
                                        //mq.Q1 = prm.Q1;
                                        mq.Q1 = prm.Q1Details;
                                        //mq.Q2 = prm.Q2;
                                        mq.Q2 = prm.Q2Details;
                                        //mq.Q3 = prm.Q3;
                                        mq.Q3 = prm.Q3Details;
                                        //mq.Q4 = prm.Q4;
                                        mq.Q4 = prm.Q4Details;
                                        
                                        if(mq_context.SaveChanges() > 0)
                                        {
                                            wl.Writer("success client save Tb_MarginQuestion FormID "+ prm.ID_Form + " Step : " + fm.Step);
                                            cl.RiskDisclosureAcceptTime = DateTime.Now;
                                            cl.LastUpdateTime = DateTime.Now;
                                            if (new_context.SaveChanges() > 0)
                                            {
                                                wl.Writer("success client save Tb_ClientInfo FormID "+ prm.ID_Form + "Step : " + fm.Step);
                                                rs.success = true;
                                                rs.message = "success";
                                            }
                                            else
                                            {
                                                rs.success = false;
                                                rs.message = "failed";
                                                wl.Writer("failed client save Tb_ClientInfo FormID "+ prm.ID_Form + " Step : " + fm.Step);
                                            }
                                        }
                                        else
                                        {
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client save Tb_MarginQuestion FormID "+ prm.ID_Form + " Step : " + fm.Step);
                                        }
                                    }
                                    else
                                    {
                                        var mq_i = new Tb_MarginQuestion()
                                        {
                                            ID = Guid.NewGuid(),
                                            //Q1 = prm.Q1,
                                            Q1 = prm.Q1Details,
                                            //Q2 = prm.Q2,
                                            Q2 = prm.Q2Details,
                                            //Q3 = prm.Q3,
                                            Q3 = prm.Q3Details,
                                            //Q4 = prm.Q4,
                                            Q4 = prm.Q4Details,
                                            CreateTime = DateTime.Now,
                                            B2BCompany = "PH",
                                            Version = "1.0",
                                            FormName = "OAO Phase 3 Form",
                                        };
                                        mq_context.Tb_MarginQuestion.Add(mq_i);
                                        if (mq_context.SaveChanges() > 0)
                                        {
                                            wl.Writer("success client save Tb_MarginQuestion FormID "+ prm.ID_Form + " Step : " + fm.Step);
                                            fm.MQID = mq_i.ID;
                                            fm.SubmitStatus = null;
                                            fm.SubmittedDateTime = null;
                                            if (context.SaveChanges() > 0)
                                            {
                                                wl.Writer("success client save Tb_AccOpenRequest FormID "+ prm.ID_Form + " Step : " + fm.Step);
                                                cl.RiskDisclosureAcceptTime = DateTime.Now;
                                                cl.LastUpdateTime = DateTime.Now;
                                                if(new_context.SaveChanges() > 0)
                                                {
                                                    wl.Writer("failed client save Tb_ClientInfo FormID "+ prm.ID_Form + " Step : " + fm.Step);
                                                    rs.success = true;
                                                    rs.message = "success";
                                                }
                                                else
                                                {
                                                    wl.Writer("failed client save Tb_ClientInfo FormID " + prm.ID_Form + " Step : " + fm.Step);
                                                    rs.success = false;
                                                    rs.message = "failed";
                                                }
                                            }
                                            else
                                            {
                                                wl.Writer("failed client save Tb_AccOpenRequest FormID " + prm.ID_Form + " Step : " + fm.Step);
                                                rs.success = false;
                                                rs.message = "failed";
                                            }
                                        }
                                    }
                                }
                            }
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