using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public JsonResult loginChecking(string Email, string hp, Guid ID)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using(var context = new OAOEntities())
                {
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID);
                    fm.LastLoginTime = DateTime.Now;

                    if(fm.EmailAddress.ToLower() == Email.ToLower() && fm.MobileNo == hp)
                    {
                        if (context.SaveChanges() > 0)
                        {
                            rs.data = null;
                            rs.success = true;
                            rs.message = "success";
                            Response.Cookies["OAOCookies"].Value = ID.ToString();
                            DateTime currentTime = DateTime.Now;
                            var tmr = currentTime.AddDays(1); ;
                            Response.Cookies["OAOCookies"].Expires = tmr;
                        }
                    }
                    else
                    {
                        rs.data = null;
                        rs.success = false;
                        rs.message = "failed";
                    }

                    
                }
            }catch( Exception e)
            {
                rs.data = null;
                rs.success = false;
                rs.message = "failed";
                wl.Writer(e.ToString());
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}