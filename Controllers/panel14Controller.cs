using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using OAO.Models;

namespace OAO.Controllers
{
    public class panel14Controller : Controller
    {
        // GET: panel14
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel14(panel14 prm)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == prm.ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step < 13)
                        {
                            fm.Step = 13;
                        }
                        
                        //fm.Step = 15;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.LastLoginTime = DateTime.Now;
                        fm.ApplicationMode = prm.OAOFAO_Checked;
                        if(prm.OAOFAO_Checked == 1)
                        {
                            fm.ProvideTransferProof = false;
                            //DeleteDepositSlip(fm.ID);
                        }

                        //string[] nm_ = (rm.Value(prm.AccHolderName)).Split(new char[] {' '});
                        //string sr_name = "";
                        //string cl_name = "";
                        //for ( var i = 0; i < nm_.Length; i ++)
                        //{
                        //    if(i == 0)
                        //    {
                        //        sr_name = nm_[0];
                        //    }
                        //    else
                        //    {
                        //        if(cl_name == "")
                        //        {
                        //            cl_name = nm_[i];
                        //        }
                        //        else
                        //        {
                        //            cl_name = cl_name + " " + nm_[i];
                        //        }
                        //    }
                        //}
                        using (var new_context = new OAOEntities())
                        {
                            new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            if (fm != null)
                            {
                                //cl.Surname = sr_name;
                                //cl.ClientName = cl_name;
                                cl.DesignatedBankName = prm.BankName;
                                cl.DesignatedBankNameOthers = prm.OtherBankName;
                                cl.DesignatedBankAccountNo = rm.Value(prm.BankAccNumb);
                                cl.DesignatedBankAccountName = rm.Value(prm.AccHolderName);
                                fm.SubmitStatus = null;
                                fm.SubmittedDateTime = null;
                                if (new_context.SaveChanges() > 0)
                                {
                                    wl.Writer("success client save Tb_ClientInfo FormID " + prm.ID_Form + " Step : " + fm.Step);
                                    if (context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_AccOpenRequest FormID " + prm.ID_Form + " Step : " + fm.Step);
                                        rs.success = true;
                                        rs.message = "success";
                                    }
                                    else
                                    {
                                        wl.Writer("failed client save Tb_AccOpenRequest FormID " + prm.ID_Form + " Step : " + fm.Step);
                                        rs.success = false;
                                        rs.message = "failed";
                                    }
                                }
                                else
                                {
                                    if (context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_AccOpenRequest FormID " + prm.ID_Form + " Step : " + fm.Step);
                                        rs.success = true;
                                        rs.message = "success";
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
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public void DeleteDepositSlip(Guid FormID)
        {
            bool result;
            WriteLog wl = new WriteLog();
            try
            {
                using (var file_context = new OAOEntities())
                {
                    file_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fl = file_context.Tb_Attachment.SingleOrDefault(b => b.FormID == FormID && b.AttachmentType == "Bank Deposit Slip");
                    if(fl != null)
                    {
                        wl.Writer("delete Bank Deposit Slip change OAO to FAO with FormID = " + FormID);
                        var elem = XElement.Parse(fl.Attachment);
                        var filename = elem.Element("name").Value;
                        Remove(filename, FormID);
                        file_context.Tb_Attachment.Remove(fl);
                        file_context.SaveChanges();
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }
            }
            catch (Exception e)
            {
                result = false;
                wl.Writer(e.Message + e.StackTrace + " formID = " + FormID);
            }
            
        }

        public void Remove(string fileNames, Guid FormID)
        {
            WriteLog wl = new WriteLog();
            try
            {
                string path = Path.Combine("~/upload/" + FormID, fileNames);
                var file = Server.MapPath(path);
                if (System.IO.File.Exists(file))
                {
                    System.IO.File.Delete(file);
                }
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace + " formID = " + FormID);
            }

        }
    }
}