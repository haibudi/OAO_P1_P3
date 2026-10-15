using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class panel12Controller : Controller
    {
        // GET: panel12
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel12(Guid ID)
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
                        if (fm.Step <= 12)
                        {
                            fm.Step = 11;
                        }
                        //fm.Step = 13;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;
                        if (context.SaveChanges() > 0)
                        {
                            rs.data = null;
                            rs.success = true;
                            rs.message = "success";
                            wl.Writer("success client save Tb_AccOpenRequest Step : " + fm.Step);
                        }
                        else
                        {
                            rs.data = null;
                            rs.success = false;
                            rs.message = "failed";
                            wl.Writer("failed client save Tb_AccOpenRequest Step : " + fm.Step);
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