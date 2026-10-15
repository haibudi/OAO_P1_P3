using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel10Controller : Controller
    {
        // GET: Panel10
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel10(Panel10 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);
                    RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();

                    if (fm != null)
                    {
                        if (fm.Step <= 10)
                        {
                            fm.Step = 9;
                        }
                        //fm.Step = 11;
                       
                        fm.LastStatusUpdatedTime = DateTime.Now;

                        using (var new_context = new OAOEntities())
                        {
                            new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            using(var tx_context = new OAOEntities())
                            {
                                tx_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var tx = tx_context.Tb_TaxResident.Where(_ => _.FormID == fm.TRID).ToList();
                                int m = 0;
                                var pass = false;
                                if(tx.Count > 0)
                                {
                                    foreach (var ls in param.TaxDetail)
                                    {
                                        foreach(var txm in tx)
                                        {
                                            if (txm.TaxResidentID == ls.TaxResidentID)
                                            {
                                                txm.ForeignTaxResidentCountry = ls.jurisdiction;
                                                txm.ForeignTaxResidentTaxIdentificationNo = rm.Value(ls.tin);
                                                txm.ForeignTaxResidentNoTINReason = rm.Value(ls.tin_reason);
                                                txm.JointIndicator = 2;  //harcoded value unknown
                                                txm.Status = 1;
                                                txm.SubmitTime = DateTime.Now;
                                                txm.LastUpdateTime = DateTime.Now;
                                            }
                                            
                                        }

                                        if (ls.TaxResidentID == 0)
                                        {
                                            using (var tx_context1 = new OAOEntities())
                                            {
                                                tx_context1.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                                var inID1 = fm.TRID;
                                                var in_tx1 = new Tb_TaxResident()
                                                {
                                                    FormID = inID1,
                                                    ForeignTaxResidentCountry = ls.jurisdiction,
                                                    ForeignTaxResidentTaxIdentificationNo = rm.Value(ls.tin),
                                                    ForeignTaxResidentNoTINReason = rm.Value(ls.tin_reason),
                                                    JointIndicator = 2,  //harcoded value unknown
                                                    Status = 1,
                                                    SubmitTime = DateTime.Now,
                                                    LastUpdateTime = DateTime.Now,
                                                };

                                                tx_context.Tb_TaxResident.Add(in_tx1);
                                                if (tx_context1.SaveChanges() > 0)
                                                {
                                                    wl.Writer("success client Tb_TaxResident save Step : " + fm.Step);
                                                    pass = true;
                                                }
                                            }
                                                
                                        }

                                        if(tx_context.SaveChanges() > 0)
                                        {
                                            wl.Writer("success client Tb_TaxResident save Step : " + fm.Step);
                                            pass = true;
                                        }
                                    }

                                    if (pass == true)
                                    {
                                        if (cl != null)
                                        {
                                            //if (cl.AcknowledgementStockOptAcct == true && param.AcquireFrom1 == null)
                                            //{
                                            cl.HongKongTaxResident = param.HK_Tax;
                                            cl.ForeignTaxResident = param.Other_Tax;
                                            cl.AcknowledgementByCust4 = param.Acknowledge;
                                            cl.LastUpdateTime = DateTime.Now;

                                            if (new_context.SaveChanges() > 0)
                                            {
                                                wl.Writer("success client Client_Info save Step : " + fm.Step);
                                                fm.SubmitStatus = null;
                                                fm.SubmittedDateTime = null;
                                                if (context.SaveChanges() > 0)
                                                {
                                                    rs.data = fm.TRID;
                                                    rs.success = true;
                                                    rs.message = "success";
                                                    wl.Writer("success client Tb_AccOpenRequest save Step : " + fm.Step);
                                                }
                                            }
                                            else
                                            {
                                                rs.data = null;
                                                rs.success = false;
                                                rs.message = "failed";
                                                wl.Writer("failed client Client_Info save Step : " + fm.Step);
                                            }
                                            //}

                                        }
                                    }
                                    else
                                    {
                                        rs.data = null;
                                        rs.success = false;
                                        rs.message = "failed";
                                        wl.Writer("failed client save Step : " + fm.Step);
                                    }
                                }
                                else
                                {
                                    var inID = Guid.NewGuid();
                                    if(param.TaxDetail != null)
                                    {
                                        if (param.TaxDetail.Count > 0)
                                        {
                                            foreach (var ls in param.TaxDetail)
                                            {
                                                var in_tx = new Tb_TaxResident()
                                                {
                                                    FormID = inID,
                                                    ForeignTaxResidentCountry = ls.jurisdiction,
                                                    ForeignTaxResidentTaxIdentificationNo = rm.Value(ls.tin),
                                                    ForeignTaxResidentNoTINReason = rm.Value(ls.tin_reason),
                                                    JointIndicator = 2,  //harcoded value unknown
                                                    Status = 1,
                                                    SubmitTime = DateTime.Now,
                                                    LastUpdateTime = DateTime.Now,
                                                };

                                                tx_context.Tb_TaxResident.Add(in_tx);
                                                if (tx_context.SaveChanges() > 0)
                                                {
                                                    wl.Writer("success client save Tb_TaxResident Step : " + fm.Step);
                                                    if (cl != null)
                                                    {
                                                        //if (cl.AcknowledgementStockOptAcct == true && param.AcquireFrom1 == null)
                                                        //{
                                                        cl.HongKongTaxResident = param.HK_Tax;
                                                        cl.ForeignTaxResident = param.Other_Tax;
                                                        cl.AcknowledgementByCust4 = param.Acknowledge;
                                                        cl.LastUpdateTime = DateTime.Now;

                                                        if (new_context.SaveChanges() > 0)
                                                        {
                                                            wl.Writer("success client save client info Step : " + fm.Step);
                                                            fm.TRID = inID;
                                                            if (context.SaveChanges() > 0)
                                                            {
                                                                var dt = new
                                                                {
                                                                    data = inID,
                                                                    page = fm.Step,
                                                                };
                                                                rs.data = dt;
                                                                //rs.data = inID;
                                                                rs.success = true;
                                                                rs.message = "success";
                                                                wl.Writer("success client save Tb_Accinfo Step : " + fm.Step);
                                                            }
                                                        }
                                                        else
                                                        {
                                                            rs.data = null;
                                                            rs.success = false;
                                                            rs.message = "failed";
                                                            wl.Writer("failed client save Tb_AccOpenRequest Step : " + fm.Step);
                                                        }
                                                        //}

                                                    }
                                                    else
                                                    {
                                                        rs.data = null;
                                                        rs.success = false;
                                                        rs.message = "failed";
                                                        wl.Writer("failed client save : " + fm.Step);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        if (cl != null)
                                        {
                                            //if (cl.AcknowledgementStockOptAcct == true && param.AcquireFrom1 == null)
                                            //{
                                            cl.HongKongTaxResident = param.HK_Tax;
                                            cl.ForeignTaxResident = param.Other_Tax;
                                            cl.AcknowledgementByCust4 = param.Acknowledge;
                                            cl.LastUpdateTime = DateTime.Now;

                                            if (new_context.SaveChanges() > 0)
                                            {

                                                if (context.SaveChanges() > 0)
                                                {
                                                    var dt = new
                                                    {
                                                        data = "",
                                                        page = fm.Step,
                                                    };
                                                    rs.data = dt;
                                                    //rs.data = inID;
                                                    rs.success = true;
                                                    rs.message = "success";
                                                    wl.Writer("success client save Tb_AccOpenRequest Step : " + fm.Step);
                                                }
                                            }
                                            else
                                            {
                                                rs.data = null;
                                                rs.success = false;
                                                rs.message = "failed";
                                                wl.Writer("failed client save 1 Step : " + fm.Step);
                                            }
                                            //}

                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client save 2 Step : " + fm.Step);
                                        }
                                        
                                    }
                                    
                                    
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
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteResidentTax(int ID)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            Guid formID;
            try
            {
                using (var tx_context = new OAOEntities())
                {
                    tx_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var tx = tx_context.Tb_TaxResident.Where(_ => _.TaxResidentID == ID).SingleOrDefault();
                    formID = (Guid)tx.FormID;
                    if (tx != null)
                    {
                        tx_context.Tb_TaxResident.Remove(tx);
                        if (tx_context.SaveChanges() > 0)
                        {
                            rs.success = true;
                            rs.message = "success";
                            wl.Writer("success delete taxResidentID : " + ID + " client save formID : " + tx.FormID);
                        }

                    }
                }
                }catch(Exception e)
            {
                wl.Writer(e.Message + e.StackTrace + "\n failed delete taxResidentID : " + ID);
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }

            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}