using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using OAO.Models;
using iText;
using System.Web.Services;
using iText.Html2pdf;
using iText.Layout.Font;
using iText.IO.Font;
using iText.Html2pdf.Resolver.Font;
using static OAO.Controllers.panel15Controller;

namespace OAO.Controllers
{
    public class panel16Controller : Controller
    {
        // GET: panel16
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult UploadDepositProof(HttpPostedFileBase Deposit)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                var filename1 = Deposit.FileName;
                var file = Server.MapPath("~/upload/" + filename1);

                if (System.IO.File.Exists(file))
                {
                    System.IO.File.Delete(file);
                }
                Deposit.SaveAs(file);
                wl.Writer("success UploadDepositProof page 15");
                rs.success = true;
                rs.message = "Success";
            }
            catch(Exception e)
            {
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
                wl.Writer("failed UploadDepositProof page 15");
            }
            
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public void Remove(string fileNames)
        {

            var file = Server.MapPath("~/upload/" + fileNames);
            if (System.IO.File.Exists(file))
            {
                System.IO.File.Delete(file);
            }
        }

        public string CreateXML(string filename)
        {
            var file = Server.MapPath("~/upload/" + filename);
            Byte[] bytes = System.IO.File.ReadAllBytes(file);
            String file1 = Convert.ToBase64String(bytes);
            //
            //Bitmap bm = new Bitmap(file);
            //TypeConverter converter = TypeDescriptor.GetConverter(typeof(Bitmap));
            XElement xml = new XElement("file",
                new XElement("name", filename),
                new XElement("content", file1));
            var str_xml = xml.ToString();

            return str_xml.Replace(System.Environment.NewLine, String.Empty);

        }

        public string CreateXML(string file, string filename)
        {
            WriteLog wl = new WriteLog();
            try
            {
                Byte[] bytes = System.IO.File.ReadAllBytes(file);
                String file1 = Convert.ToBase64String(bytes);
                //
                //Bitmap bm = new Bitmap(file);
                //TypeConverter converter = TypeDescriptor.GetConverter(typeof(Bitmap));
                XElement xml = new XElement("file",
                    new XElement("name", filename),
                    new XElement("content", file1));
                var str_xml = xml.ToString();

                return str_xml.Replace(System.Environment.NewLine, String.Empty);
            }
            catch (Exception e)
            {
                wl.Writer(e.ToString());
            }

            return "";
        }

        public string CheckName(string filename, string folder)
        {
            var path = Path.Combine(folder, filename);
            var file = Server.MapPath(path);
            if (System.IO.File.Exists(file))
            {
                NameNumber nm = new NameNumber();
                NameNumber.name = NameNumber.name + 1;
            }

            var ext = Path.GetExtension(filename);
            var name = Path.GetFileNameWithoutExtension(filename);

            var rename = name + "_1"+ "_" + NameNumber.name.ToString() + ext;

            return rename;
        }

        public JsonResult UploadDeposit16(HttpPostedFileBase Deposit, Guid FormID, Guid File_ID, bool UseFPS)
        {
            WriteLog wl = new WriteLog();
            result rs = new result();
            panel15Controller pn15 = new panel15Controller();
            //string uploadPath = ConfigurationManager.AppSettings["uploadPath"].ToString();
            try
            {
                var filename1 = Deposit.FileName;
                var flname = Path.GetFileName(filename1);
                string ext = Path.GetExtension(flname);
                var isAllowedFile = pn15.AllowedFileExtension(flname);
                if(isAllowedFile == true)
                {
                    //var folder = Path.Combine(@uploadPath, FormID.ToString());
                    //var file = Path.Combine(folder, flname);
                    var folder = "~/upload/" + FormID.ToString() + "/";
                    var file = Server.MapPath(folder + flname);
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(Server.MapPath(folder));
                    }

                    if (System.IO.File.Exists(file))
                    {
                        //System.IO.File.Delete(file);
                        flname = CheckName(flname, folder);
                        file = Path.Combine(Server.MapPath(folder + flname));
                    }
                    var filesize = Deposit.ContentLength;
                    if (filesize > TwoMegaBytes)
                    {
                        if (ext.ToLower() != ".pdf")
                        {
                            var resize = pn15.ResizeBigImage(Deposit, file);
                            var xml1 = CreateXML(file, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdateUpload16(xml1, flname, FormID, File_ID, "Bank Deposit Slip", ext, UseFPS);
                            return res;
                        }
                        else
                        {

                            Deposit.SaveAs(file);
                            CompressPdf(file);
                            var xml1 = CreateXML(file, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdateUpload16(xml1, flname, FormID, File_ID, "Bank Deposit Slip", ext, UseFPS);
                            return res;
                        }
                    }
                    else
                    {
                        Deposit.SaveAs(file);
                        var xml1 = CreateXML(file, flname);
                        //string ext = Path.GetExtension(file);
                        var res = SaveUpdateUpload16(xml1, flname, FormID, File_ID, "Bank Deposit Slip", ext, UseFPS);
                        return res;
                    }
                    //Deposit.SaveAs(file);
                    //var xml1 = CreateXML(file, flname);
                    //string ext = Path.GetExtension(file);
                    //var res = SaveUpdateUpload16(xml1, flname, FormID, File_ID, "Bank Deposit Slip", ext, UseFPS);
                    //return res;
                }
                else
                {
                    wl.Writer("filename " + flname + ", extension is not allowed");
                    rs.success = false;
                    rs.message = "filename " + flname + ", extension is not allowed";
                }
                
            }
            catch (Exception e)
            {
                wl.Writer(e.ToString());
                rs.success = false;
                rs.message = e.ToString();
            }

            return Json(rs, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SaveUpdateUpload16(string xml, string filename, Guid ID_Form, Guid file_ID, string AttType, string ext, bool UseFPS)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step <= 15)
                        {
                            fm.Step = 15;
                        }
                        //fm.Step = 16;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.LastLoginTime = DateTime.Now;
                        fm.ApplicationMode = 0; // please update this on fao
                        fm.AttFormID = ID_Form;
                        if (fm.ApplicationMode == 1 && UseFPS == true)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else if (fm.ApplicationMode == 0 && UseFPS == true)
                        {
                            fm.ProvideTransferProof = true;
                        }
                        else if (fm.ApplicationMode == 0 && UseFPS == false)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        using (var file_context = new OAOEntities())
                        {
                            file_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var fl = file_context.Tb_Attachment.SingleOrDefault(b => b.AttachmentID == file_ID);

                            if (fl != null)
                            {

                                var elem = XElement.Parse(fl.Attachment);
                                //var oldFile = elem.Element("name").Value;
                                //var file = Server.MapPath("~/upload/" + oldFile);

                                //if (System.IO.File.Exists(file) && filename != oldFile)
                                //{
                                //    System.IO.File.Delete(file);
                                //}

                                fl.AttachmentExt = ext;
                                fl.Attachment = xml;
                                fl.TransferStatusUpdatedTime = DateTime.Now;

                                if (file_context.SaveChanges() > 0)
                                {
                                    wl.Writer("Success client save Tb_Attachment Step : " + fm.Step);
                                    var data = new
                                    {
                                        AttachmentID = fl.AttachmentID,
                                        NameFile = filename,
                                    };
                                    rs.data = data;
                                    rs.success = true;
                                    rs.message = "Success";
                                }
                                else
                                {
                                    wl.Writer("failed client save Tb_Attachment Step : " + fm.Step);
                                    rs.success = false;
                                    rs.message = "Failed";
                                }

                            }
                            else
                            {
                                var new_fl = new Tb_Attachment()
                                {
                                    AttachmentID = Guid.NewGuid(),
                                    FormID = ID_Form,
                                    AttachmentType = AttType,
                                    FormName = ConfigurationManager.AppSettings["FormName"].ToString(),
                                    AttachmentExt = ext,
                                    TransferStatus = 0,
                                    Attachment = xml,
                                    CreateTime = DateTime.Now,
                                    TransferStatusUpdatedTime = DateTime.Now,
                                    Version = "1.0",
                                };

                                file_context.Tb_Attachment.Add(new_fl);
                                if (file_context.SaveChanges() > 0)
                                {
                                    wl.Writer("success client save Tb_Attachment Step : " + fm.Step);
                                    fm.SubmitStatus = null;
                                    fm.SubmittedDateTime = null;
                                    if (context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_AccOpenRequest Step : " + fm.Step);
                                        var data = new
                                        {
                                            AttachmentID = new_fl.AttachmentID,
                                            NameFile = filename,
                                        };
                                        rs.data = data;
                                        rs.success = true;
                                        rs.message = "Success";
                                    }
                                    else
                                    {
                                        wl.Writer("failed client save Tb_AccOpenRequest Step : " + fm.Step);
                                        rs.success = false;
                                        rs.message = "Failed";
                                    }
                                }
                                else
                                {
                                    wl.Writer("failed client save Tb_Attachment Step : " + fm.Step);
                                    rs.success = false;
                                    rs.message = "Failed";
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

        public JsonResult SaveUpdatePanel16(panel16 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                //var xml = CreateXML(param.filename);
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {
                        fm.Step = 15;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.LastLoginTime = DateTime.Now;
                        /*fm.ApplicationMode = 0;*/ // please update this when fao
                        fm.SubmittedBy = "Online";
                        if (param.UseFPS == true)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else if (fm.ApplicationMode == 1)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else
                        {
                            fm.ProvideTransferProof = true;
                        }
                        fm.SubmitStatus = "Submitted";
                        fm.SubmittedDateTime = DateTime.Now;
                        fm.SubmittedByName = ConfigurationManager.AppSettings["SubmittedByName"].ToString();
                        fm.LastStatusUpdatedBy = ConfigurationManager.AppSettings["SubmittedByName"].ToString();
                        fm.Status = "0";
                        using (var cl_context = new OAOEntities())
                        {
                            cl_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = cl_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            if(cl != null)
                            {
                                cl.Status = 1;
                                cl.LastUpdateTime = DateTime.Now;
                                cl.SubmitTime = DateTime.Now;
                                if (context.SaveChanges() > 0)
                                {
                                    wl.Writer("success client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");

                                    if (cl_context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_ClientInfo Step : 16 SaveUpdatePanel161");
                                        
                                        rs.success = true;
                                        rs.message = "Success";
                                    }
                                }
                                else
                                {
                                    wl.Writer("failed client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");
                                    rs.success = false;
                                    rs.message = "Failed";
                                }
                                //using (var file_context = new OAOEntities())
                                //{
                                //    file_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                //    var fl = file_context.Tb_Attachment.SingleOrDefault(b => b.AttachmentID == param.file_ID);

                                //    if (fl != null)
                                //    {

                                //        //var elem = XElement.Parse(fl.Attachment);
                                //        //var oldFile = elem.Element("name").Value;
                                //        //var file = Server.MapPath("~/upload/" + oldFile);
                                //        //fl.AttachmentExt = param.ext;
                                //        //fl.Attachment = xml;
                                //        //fl.TransferStatusUpdatedTime = DateTime.Now;



                                //    }
                                //    else
                                //    {
                                //        wl.Writer("failed client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");
                                //        rs.success = false;
                                //        rs.message = "Failed";
                                //    }
                                //    //else
                                //    //{
                                //    //    var new_fl = new Tb_Attachment()
                                //    //    {
                                //    //        AttachmentID = Guid.NewGuid(),
                                //    //        FormID = param.ID_Form,
                                //    //        AttachmentType = "Bank Deposit Slip",
                                //    //        FormName = ConfigurationManager.AppSettings["FormName"].ToString(),
                                //    //        AttachmentExt = param.ext,
                                //    //        TransferStatus = 0,
                                //    //        Attachment = xml,
                                //    //        CreateTime = DateTime.Now,
                                //    //        TransferStatusUpdatedTime = DateTime.Now,
                                //    //        Version = "1.0",
                                //    //    };

                                //    //    file_context.Tb_Attachment.Add(new_fl);
                                //    //    if (file_context.SaveChanges() > 0)
                                //    //    {
                                //    //        wl.Writer("success client save Tb_Attachment Step : 15");

                                //    //        if (context.SaveChanges() > 0)
                                //    //        {
                                //    //            wl.Writer("success client save Tb_AccOpenRequest Step : 15");
                                //    //            if (cl_context.SaveChanges() > 0)
                                //    //            {
                                //    //                var data = new
                                //    //                {
                                //    //                    AttachmentID = new_fl.AttachmentID,
                                //    //                };
                                //    //                rs.data = data;
                                //    //                rs.success = true;
                                //    //                rs.message = "Success";
                                //    //            }
                                //    //        }
                                //    //        else
                                //    //        {
                                //    //            wl.Writer("failed client save Tb_Attachment Step : 15 SaveUpdatePanel16");
                                //    //            rs.success = false;
                                //    //            rs.message = "Failed";
                                //    //        }
                                //    //    }
                                //    //    else
                                //    //    {
                                //    //        wl.Writer("failed client save Tb_AccOpenRequest Step : 15 SaveUpdatePanel16");
                                //    //        rs.success = false;
                                //    //        rs.message = "Failed";
                                //    //    }


                                //    //}

                                //}
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

        public JsonResult IsFPS(bool UseFPS, Guid FormID)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == FormID);
                    if (fm != null)
                    {
                        if (UseFPS == true)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else if (fm.ApplicationMode == 1)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else
                        {
                            fm.ProvideTransferProof = true;
                        }

                        if (context.SaveChanges() > 0)
                        {
                            wl.Writer("success client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");

                            wl.Writer("success client save Tb_ClientInfo Step : 16 SaveUpdatePanel161");

                            rs.success = true;
                            rs.message = "Success";
                        }
                        else
                        {
                            wl.Writer("failed client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");
                            rs.success = false;
                            rs.message = "Failed";
                        }
                    }
                }
            }
            catch(Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveUpdatePanel161(panel16 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                //var xml = CreateXML(param.filename);
                using (var context = new OAOEntities())
                {
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {

                        fm.Step = 15;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.LastLoginTime = DateTime.Now;
                        //fm.ApplicationMode = 0;
                        fm.SubmittedBy = "Online";
                        if (param.UseFPS == true)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else if (fm.ApplicationMode == 1)
                        {
                            fm.ProvideTransferProof = false;
                        }
                        else 
                        {
                            fm.ProvideTransferProof = true;
                        }

                        fm.SubmittedDateTime = DateTime.Now;
                        fm.SubmitStatus = "Submitted";
                        fm.SubmittedByName = ConfigurationManager.AppSettings["SubmittedByName"].ToString();
                        fm.LastStatusUpdatedBy = ConfigurationManager.AppSettings["SubmittedByName"].ToString();
                        fm.Status = "0";
                        using (var cl_context = new OAOEntities())
                        {
                            var cl = cl_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            if (cl != null)
                            {
                                cl.Status = 1;
                                cl.LastUpdateTime = DateTime.Now;
                                cl.SubmitTime = DateTime.Now;
                                cl.AcknowledgementStockOptAcct = false;
                                if (context.SaveChanges() > 0)
                                {
                                    wl.Writer("success client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");

                                    if (cl_context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_ClientInfo Step : 16 SaveUpdatePanel161");
                                       
                                        rs.success = true;
                                        rs.message = "Success";
                                    }
                                }
                                else
                                {
                                    wl.Writer("failed client save Tb_AccOpenRequest Step : 16 SaveUpdatePanel161");
                                    rs.success = false;
                                    rs.message = "Failed";
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

        [HttpPost]
        public JsonResult GetCertificate(string guid)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            var dGuid = new Guid(guid);
            try
            {
                using (var ncontext = new OAOEntities())
                {
                    ncontext.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    W8BEN_Certification w8_cert = ncontext.W8BEN_Certification.SingleOrDefault(_ => _.FormID == dGuid);

                    var data = new
                    {
                        FormID_ = w8_cert.FormID,
                        W8IamBeneficialOwner_ = w8_cert.W8IamBeneficialOwner,
                        W8IamNotUSPerson_ = w8_cert.W8IamNotUSPerson,
                        W8IncomeRelate_ = w8_cert.W8IncomeRelate,
                        W8IsTaxTreaty_ = w8_cert.W8IsTaxTreaty,
                        W8BrokerTransactions_ = w8_cert.W8BrokerTransactions,
                        W8IAuthorize_ = w8_cert.W8IAuthorize
                    };
                    rs.data = data;
                    rs.success = true;
                    return Json(rs, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
            }

            var mn = rs.data;

            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetAttachment(string FormID)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            var dGuid = new Guid(FormID);
            try
            {
                using (var ncontext = new OAOEntities())
                {
                    ncontext.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var att = ncontext.Tb_Attachment.Where(_ => _.FormID == dGuid).AsEnumerable();

                    var data = new
                    {
                        _attachment = att.ToList()
                    };
                    rs.data = data;
                    rs.success = true;
                    return Json(rs, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
            }

            var mn = rs.data;

            return Json(rs, JsonRequestBehavior.AllowGet);
        }

      

        public static string FONT = "src/main/resources/fonts/cardo/cardo-Regular.ttf";

        public int ConvertToPdf(string baseurl, string html, string destination)
        {
            WriteLog wl = new WriteLog();
            string strf = Server.MapPath("~/fonts/PMINGLIU.ttf");
            try
            {
                ConverterProperties prop = new ConverterProperties();
                

                FontProvider fontProvider = new DefaultFontProvider(false, false, false);
                FontProgram fontProgram = FontProgramFactory.CreateFont(strf);
                fontProvider.AddFont(fontProgram, PdfEncodings.IDENTITY_H);
                prop.SetFontProvider(fontProvider);
                prop.SetBaseUri(baseurl);
                HtmlConverter.ConvertToPdf(html, new FileStream(destination, FileMode.Create, FileAccess.Write), prop);
                wl.Writer("success convert to pdf");
                return 1;
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace + " font: " + strf);
                return 0;
            }
        }


        [HttpPost]
        
        public string PdfGenerator(Guid FormID, string element)
        {
            WriteLog wl = new WriteLog();

            try
            {

                string flname = "Phillip Online Account Opening Confirmation Page.pdf";
                string epath = Server.MapPath("");
                var folder = "~/upload/" + FormID.ToString() + "/";
                var file = Server.MapPath(folder + flname);
                if (!Directory.Exists(Server.MapPath(folder)))
                {
                    Directory.CreateDirectory(Server.MapPath(folder));
                }

                if (System.IO.File.Exists(file))
                {
                    System.IO.File.Delete(file);
                }

                var boostrap = Server.MapPath("~/Content/bootstrap.min.css");
                var logo = Server.MapPath("~/img/header_philiph.png");
                var fonts = Server.MapPath("~/fonts/PMINGLIU.ttf");
                var jquery_slim = Server.MapPath("~/Scripts/jquery-3.4.1.min.js");
                var bootsrapjs = Server.MapPath("~/Scripts/bootsrap.min.js");

                string html = "";
                html = @"<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><meta http-equiv='content-type' content='text/html; charset=utf-8'/> <meta http-equiv='Content-Style-Type' content='text/css'/> <meta http-equiv='Content-Script-Type' content='text/javascript'/> <meta HTTP-EQUIV='X-UA-Compatible' CONTENT='IE=5'><title></title><link rel='stylesheet' href='"+boostrap+"'><script src='"+ jquery_slim +"' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script> <script src='" + bootsrapjs + "' integrity='sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF' crossorigin='anonymous'></script> <style>@font-face{font-family: 'PMingLiU'; src: url('"+ fonts +"') format('opentype');}body{font-family: 'PMingLiU';font-size: 10px;}.tab-left, .tab-right{width: 50%;}</style> </head><body><div class='col-md-12' style='padding-bottom:15px;'> <img src='"+ logo + "' style='width:100%;height:35%;'/> </div>";
                html += element;
                html += "</ body ></ html >";

                string baseUrl = Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/') + "/";
                int tr = ConvertToPdf(baseUrl, html, file);
                if(tr == 1)
                {
                    wl.Writer("success to generate pdf " + baseUrl);
                    return file;
                }
                wl.Writer("failed to generate pdf " + baseUrl);
                return "";


            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                return "";
            }
        }

        

        public FileResult downloadPDF(string path)
        {
            string fileName = "";
            byte[] fileBytes = { };
            if (HttpContext.Session["folder"] != null)
            {
                var folder = HttpContext.Session["folder"].ToString();
                bool indexStr = path.Contains(folder);
                if (indexStr == true)
                {
                    fileBytes = System.IO.File.ReadAllBytes(path);
                    fileName = "Phillip Online Account Opening Confirmation Page.pdf";
                    return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
                }
            }

            return null;
        }

        public JsonResult UpdateStockOption(Guid ID_Form)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == ID_Form);
                    using (var cl_context = new OAOEntities())
                    {
                        var cl = cl_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                        if (cl != null)
                        {
                            cl.AcknowledgementStockOptAcct = false;
                            if (cl_context.SaveChanges() > 0)
                            {
                                wl.Writer("success client save Tb_ClientInfo Step : 16 update stock option");

                                rs.success = true;
                                rs.message = "Success update stock option";
                            }
                            else
                            {
                                wl.Writer("failed client save Tb_AccOpenRequest Step : 16 update stock option");
                                rs.success = false;
                                rs.message = "Failed update stock option";
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
            }

            return Json(rs, JsonRequestBehavior.AllowGet);
        }


        //class HeaderFooter : PdfPageEventHelper
        //{
        //    public override void OnEndPage(PdfWriter writer, Document document)
        //    {
        //        var imagepath = HostingEnvironment.MapPath("~/img/header_philiph.png");
        //        iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(imagepath);
        //        image.ScaleToFit(300, 110);
        //        image.SetAbsolutePosition(55, 775);

        //        document.Add(image);
        //        //var footerpath = HostingEnvironment.MapPath("~/Content/images/footer.png");
        //        //iTextSharp.text.Image footer = iTextSharp.text.Image.GetInstance(footerpath);
        //        //footer.ScaleToFit(200, 110);
        //        //footer.SetAbsolutePosition(200, 15);

        //        //document.Add(footer);
        //        //  base.OnEndPage(writer, document);
        //    }

        //}
    }

}