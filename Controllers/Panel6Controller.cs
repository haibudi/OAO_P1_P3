using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel6Controller : Controller
    {
        // GET: Panel6
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel6(Panel6 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                var isempty = 0;
                isempty = ((param.Investments_Objective != "" && param.Investments_Objective != null) ? 0 : 1) + isempty;
                isempty = ((param.Listed_Securities != "" && param.Listed_Securities != null) ? 0 : 1) + isempty;
                isempty = ((param.CBBC_Warant != "" && param.CBBC_Warant != null) ? 0 : 1) + isempty;
                isempty = ((param.Future_Option != "" || param.Future_Option != null) ? 0 : 1) + isempty;
                isempty = ((param.Unit_Trust_Bond != "" || param.Unit_Trust_Bond != null) ? 0 : 1) + isempty;
                isempty = ((param.Leverage_foreign_Exchange != "" || param.Leverage_foreign_Exchange != null) ? 0 : 1) + isempty;
                isempty = ((param.Structured_Product != "" || param.Structured_Product != null) ? 0 : 1) + isempty;
                isempty = ((param.Leverage_Inverse_product != "" || param.Leverage_Inverse_product != null) ? 0 : 1) + isempty;

                if(isempty == 0)
                {
                    using (var context = new OAOEntities())
                    {
                        context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                        var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                        if (fm != null)
                        {
                            if (fm.Step <= 6)
                            {
                                fm.Step = 5;
                            }
                            //fm.Step = 7;
                            var data = new
                            {
                                page = fm.Step,
                            };
                            rs.data = data;
                            fm.LastStatusUpdatedTime = DateTime.Now;
                            fm.SubmitStatus = null;
                            fm.SubmittedDateTime = null;
                            if (context.SaveChanges() > 0)
                            {
                                using (var new_context = new OAOEntities())
                                {
                                    new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                    var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                                    using (var inv_context = new OAOEntities())
                                    {
                                        var inve = inv_context.Tb_InvestmentObjective.SingleOrDefault(_ => _.ID == cl.InvtObjID);
                                        if (inve != null)
                                        {
                                            inve.InvestmentObj = param.Investments_Objective;
                                            inve.ListSecuritiesExp = param.Listed_Securities;
                                            inve.CBBCWarrantExp = param.CBBC_Warant;
                                            inve.FutureOrOptionExp = param.Future_Option;
                                            inve.LevForeignExExp = param.Leverage_foreign_Exchange;
                                            inve.UTorBondExp = param.Unit_Trust_Bond;
                                            inve.StructuredProductExp = param.Structured_Product;
                                            inve.LevAndInvProductExp = param.Leverage_Inverse_product;
                                            inve.B2BCompany = "PH";
                                            inve.Version = "1.0";
                                            inve.ParentForm = "OAO2";
                                            inve.SubmitTime = DateTime.Now;

                                            if (inv_context.SaveChanges() > 0)
                                            {
                                                //rs.data = null;
                                                rs.success = true;
                                                rs.message = "success";
                                                wl.Writer("sucessfully client Tb_InvestmentObjective save FormID " + param.ID_Form + " Step : " + fm.Step);
                                            }
                                        }
                                        else
                                        {
                                            var inv = new Tb_InvestmentObjective()
                                            {
                                                ID = Guid.NewGuid(),
                                                InvestmentObj = param.Investments_Objective,
                                                ListSecuritiesExp = param.Listed_Securities,
                                                CBBCWarrantExp = param.CBBC_Warant,
                                                FutureOrOptionExp = param.Future_Option,
                                                LevForeignExExp = param.Leverage_foreign_Exchange,
                                                UTorBondExp = param.Unit_Trust_Bond,
                                                StructuredProductExp = param.Structured_Product,
                                                LevAndInvProductExp = param.Leverage_Inverse_product,
                                                B2BCompany = "PH",
                                                Version = "1.0",
                                                ParentForm = "OAO3",
                                                SubmitTime = DateTime.Now,

                                            };

                                            inv_context.Tb_InvestmentObjective.Add(inv);
                                            if (inv_context.SaveChanges() > 0)
                                            {
                                                cl.InvtObjID = inv.ID;
                                                wl.Writer("sucessfully client Tb_InvestmentObjective save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                            }
                                            else
                                            {
                                                wl.Writer("failed client Tb_InvestmentObjective save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                            }
                                        }

                                    };
                                    if (cl != null)
                                    {
                                        cl.LastUpdateTime = DateTime.Now;
                                        if (new_context.SaveChanges() > 0)
                                        {

                                            //rs.data = null;
                                            rs.success = true;
                                            rs.message = "success";
                                            wl.Writer("sucessfully client Tb_ClientInfo save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client Tb_ClientInfo save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                        }
                                    }

                                }
                            }
                            else
                            {
                                rs.data = null;
                                rs.success = false;
                                rs.message = "failed";
                                wl.Writer("failed client save FormID " + param.ID_Form + "  Step : " + fm.Step);
                            }

                        }
                    }
                }
                else
                {
                    rs.data = null;
                    rs.success = false;
                    rs.message = "failed";
                    wl.Writer("sucessfully client Tb_InvestmentObjective save FormID " + param.ID_Form + "  Step : " + 5);
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