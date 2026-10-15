using AutoMapper;
using OAO.BLL.Form.FormLogic;
using OAO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OAO.Controllers
{
    public class TestPageController : Controller
    {
        private IMapper _mapper;
        private FormLogic _formbll;
        // GET: TestPage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }


        public JsonResult RemoveW8ID(Guid ID)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID);

                    if(fm != null && fm.W8ID != null && fm.W8ID.ToString() != "")
                    {
                        fm.W8ID = null;

                        if(context.SaveChanges() > 0)
                        {
                            rs.success = true;
                            rs.message = "success update w8id to be empty or null";
                        }
                    }
                    else
                    {
                        rs.success = false;
                        rs.message = "W8ID is already empty";
                    }
                }
            }
            catch(Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }

            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public bool removeW8ID(Guid ID)
        {
            WriteLog wl = new WriteLog();
            bool res = false;
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID);

                    if (fm != null && fm.W8ID != null && fm.W8ID.ToString() != "")
                    {
                        fm.W8ID = null;

                        if (context.SaveChanges() > 0)
                        {
                            res = true;
                        }
                    }
                    else
                    {
                        res = false;
                    }
                }
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                res = false;
            }

            return res;
        }

        public JsonResult SetClientInfandW8200(Guid ID)
        {

            //var dt = _formbll.Get(_ => _.ID == ID);
            //var dt_form = _mapper.Map<_accOpenRequest>(dt.Data);
            WriteLog wl = new WriteLog();
            result rs = new result();

            try
            {
                using (var context = new OAOEntities())
                {
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID);

                    if(fm != null)
                    {
                        var clInfo = AddrClientInf200((Guid)fm.ClientInfoID);
                        if (clInfo == true)
                        {
                            var w8T = removeW8ID(ID);
                            if (w8T == true)
                            {
                                rs.success = true;
                                rs.message = "success remove w8 and set address 200";
                            }
                            else
                            {
                                rs.success = false;
                                rs.message = "failed remove w8 and set address 200";
                            }
                        }
                        else
                        {
                            rs.success = false;
                            rs.message = "failed remove WID already empty";
                        }
                    }
                }
                    
            }
            catch(Exception e)
            {
                wl.Writer(e.StackTrace + e.Message);
                rs.success = false;
                rs.message = "e.StackTrace + e.Message";
            }

            

            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public bool AddrClientInf200(Guid ID)
        {
            WriteLog wl = new WriteLog();
            bool res = true;
            try
            {
                using (var contextCl = new OAOEntities())
                {
                    
                    contextCl.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = contextCl.Tb_ClientInfo.SingleOrDefault(b => b.ID == ID);

                    if (fm != null)
                    {
                        fm.ResidentialAddress1 = "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";
                        fm.ResidentialAddress2 = "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";
                        fm.ResidentialAddress3 = "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";

                        if(contextCl.SaveChanges() > 0)
                        {
                            res = true;
                        }
                        
                    }
                    else
                    {
                        res = false;
                    }
                }
            }
            catch(Exception e)
            {
                wl.Writer(e.StackTrace + e.Message);
            }

            return res;
        }

    }
}