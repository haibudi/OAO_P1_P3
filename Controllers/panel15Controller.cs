using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Drawing;
using System.ComponentModel;
using System.Xml.Linq;
using OAO.Models;
using System.Configuration;
using System.Drawing.Drawing2D;
using PdfSharp.Pdf.IO;
using PdfSharp.Pdf;

namespace OAO.Controllers
{
    public class panel15Controller : Controller
    {
        // GET: panel15
        public String[] allowedFileExt = { ".gif", ".jpg", ".png", ".pdf", ".jpeg", ".bmp", ".JPG", ".PNG", ".PDF", ".JPEG", ".BMP" };
        public ActionResult Index()
        {
            return View();
        }

        public class NameNumber
        {
            public static int name = 0;
        }


        public string CheckName(string filename, string folder)
        {
            var path = Path.Combine(folder, filename);
            var file = Server.MapPath(path);
            if (System.IO.File.Exists(file))
            {
                NameNumber.name = NameNumber.name + 1;
            }

            var ext = Path.GetExtension(filename);
            var name = Path.GetFileNameWithoutExtension(filename);

            var rename =  name + "_" + NameNumber.name.ToString() + ext;

            return rename;
        }

        public Boolean AllowedFileExtension(string filename)
        {
            var ext = Path.GetExtension(filename);
            var res_ext = (from dt_m in allowedFileExt where dt_m.Equals(ext) select dt_m).FirstOrDefault();
            if(res_ext == null){
                return false;
            }
            return true;
        }

        public const int TwoMegaBytes = 2 * 1024 * 1024;

        public string ResizeBigImage(HttpPostedFileBase file_, string path)
        {
            string name = Path.GetFileNameWithoutExtension(file_.FileName);
            var ext = Path.GetExtension(file_.FileName);
            string _file = name + ext;

            try
            {
                using (Image image = Image.FromStream(file_.InputStream, true, false))
                {
                    try
                    {
                        float thumbWidth_ = 800;
                        float thumbHeight_ = 600;
                        if (image.Width > image.Height)
                        {
                            thumbHeight_ = ((float)image.Height / image.Width) * thumbWidth_;
                        }
                        else
                        {
                            thumbWidth_ = ((float)image.Width / image.Height) * thumbHeight_;
                        }

                        int actualWidth = Convert.ToInt32(Math.Floor(thumbWidth_));
                        int actualtHeight = Convert.ToInt32(Math.Floor(thumbHeight_));
                        var thumbnailBitmap = new Bitmap(actualWidth, actualtHeight);
                        var thumbG = Graphics.FromImage(thumbnailBitmap);
                        thumbG.CompositingQuality = CompositingQuality.HighQuality;
                        thumbG.SmoothingMode = SmoothingMode.HighQuality;
                        thumbG.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        var imageRectangle_ = new Rectangle(0, 0, actualWidth, actualtHeight);
                        thumbG.DrawImage(image, imageRectangle_);
                        var ms = new MemoryStream();
                        thumbnailBitmap.Save(path);
                        ms.Position = 0;
                        GC.Collect();
                        thumbG.Dispose();
                        thumbnailBitmap.Dispose();
                        image.Dispose();
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _file;
        }

        public static void CompressPdf(string targetPath)
        {
            using (var stream = new MemoryStream(System.IO.File.ReadAllBytes(targetPath)) { Position = 0 })
            using (var source = PdfReader.Open(stream, PdfDocumentOpenMode.Import))
            using (var document = new PdfDocument())
            {
                var options = document.Options;
                options.FlateEncodeMode = PdfFlateEncodeMode.BestCompression;
                options.UseFlateDecoderForJpegImages = PdfUseFlateDecoderForJpegImages.Automatic;
                options.CompressContentStreams = true;
                options.NoCompression = false;
                foreach (var page in source.Pages)
                {
                    document.AddPage(page);
                }

                document.Save(targetPath);
            }
        }


        public JsonResult UploadIdentity(HttpPostedFileBase identity, Guid FormID, Guid File_ID)
        {
            WriteLog wl = new WriteLog();
            result rs = new result();
            //string uploadPath = ConfigurationManager.AppSettings["uploadPath"].ToString();
            try
            {
                var filename1 = identity.FileName;
                var flname = Path.GetFileName(filename1);
                string ext = Path.GetExtension(flname);
                var isAllowedFile = AllowedFileExtension(flname);
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
                    
                    var filesize = identity.ContentLength;
                    if(filesize > TwoMegaBytes)
                    {
                        if(ext.ToLower() != ".pdf")
                        {
                            var resize = ResizeBigImage(identity, file);
                            var xml1 = CreateXML(file, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml1, flname, FormID, File_ID, "HKID Card", ext);
                            return res;
                        }
                        else
                        {
                            
                            identity.SaveAs(file);
                            CompressPdf(file);
                            var xml1 = CreateXML(file, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml1, flname, FormID, File_ID, "HKID Card", ext);
                            return res;
                        }
                    }
                    else
                    {
                        identity.SaveAs(file);
                        var xml1 = CreateXML(file, flname);
                        //string ext = Path.GetExtension(file);
                        var res = SaveUpdatePanel15(xml1, flname, FormID, File_ID, "HKID Card", ext);
                        return res;
                    }
                    
                   
                }
                else
                {
                    wl.Writer( "filename " + flname + ", extension is not allowed");
                    rs.success = false;
                    rs.message = "filename " + flname + ", extension is not allowed";
                }
               
            }
            catch(Exception e)
            {
                wl.Writer(e.ToString());
                rs.success = false;
                rs.message = e.ToString();
            }

            return Json(rs, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public void UploadFile()
        {
            for (int i = 0; i < Request.Files.Count; i++)
            {
                var file = Request.Files[i];

                var fileName = Path.GetFileName(file.FileName);

                // Write logic to handle file here.
            }
        }

        public JsonResult UploadAddress(HttpPostedFileBase address, Guid FormID, Guid File_ID)
        {
            WriteLog wl = new WriteLog();
            result rs = new result();
            //string uploadPath = ConfigurationManager.AppSettings["uploadPath"].ToString();
            try
            {
                var filename2 = address.FileName;
                var flname = Path.GetFileName(filename2);
                string ext = Path.GetExtension(flname);
                var isAllowedFile = AllowedFileExtension(flname);
                if (isAllowedFile == true) {
                    //var folder = Path.Combine(@uploadPath, FormID.ToString());
                    //var file2 = Path.Combine(folder, flname);
                    var folder = "~/upload/" + FormID.ToString() + "/";
                    var file2 = Server.MapPath(folder + flname);
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(Server.MapPath(folder));
                    }

                    if (System.IO.File.Exists(file2))
                    {
                        //System.IO.File.Delete(file2);
                        flname = CheckName(flname, folder);
                        file2 = Path.Combine(Server.MapPath(folder + flname));
                    }

                    var filesize = address.ContentLength;
                    if (filesize > TwoMegaBytes)
                    {
                        if (ext.ToLower() != ".pdf")
                        {
                            var resize = ResizeBigImage(address, file2);
                            var xml2 = CreateXML(file2, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml2, flname, FormID, File_ID, "Address Proof", ext);
                            return res;
                        }
                        else
                        {

                            address.SaveAs(file2);
                            CompressPdf(file2);
                            var xml2 = CreateXML(file2, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml2, flname, FormID, File_ID, "Address Proof", ext);
                            return res;
                        }
                    }
                    else
                    {
                        address.SaveAs(file2);
                        var xml2 = CreateXML(file2, flname);
                        //string ext = Path.GetExtension(file);
                        var res = SaveUpdatePanel15(xml2, flname, FormID, File_ID, "Address Proof", ext);
                        return res;
                    }
                    //address.SaveAs(file2);
                    //var xml2 = CreateXML(file2, flname);
                    //string ext2 = Path.GetExtension(file2);
                    //var res = SaveUpdatePanel15(xml2, flname, FormID, File_ID, "Address Proof", ext2);
                    wl.Writer("success upload client Address Proof");
                    //return res;
                }
                else
                {
                    wl.Writer("filename " + flname + ", extension is not allowed");
                    rs.success = false;
                    rs.message = "filename " + flname + ", extension is not allowed";
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

        public JsonResult UploadBankAcc(HttpPostedFileBase BankAcc, Guid FormID, Guid File_ID)
        {
            WriteLog wl = new WriteLog();
            result rs = new result();
            //string uploadPath = ConfigurationManager.AppSettings["uploadPath"].ToString();
            try
            {
                var filename3 = BankAcc.FileName;
                var flname = Path.GetFileName(filename3);
                string ext = Path.GetExtension(flname);
                var isAllowedFile = AllowedFileExtension(flname);
                if (isAllowedFile == true)
                {
                    //var folder = Path.Combine(@uploadPath, FormID.ToString());
                    //var file3 = Path.Combine(folder, flname);
                    var folder = "~/upload/" + FormID.ToString() + "/";
                    var file3 = Server.MapPath(folder + flname);
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(Server.MapPath(folder));
                    }

                    if (System.IO.File.Exists(file3))
                    {
                        //System.IO.File.Delete(file3);
                        flname = CheckName(flname, folder);
                        file3 = Path.Combine(Server.MapPath(folder + flname));
                    }

                    var filesize = BankAcc.ContentLength;
                    if (filesize > TwoMegaBytes)
                    {
                        if (ext.ToLower() != ".pdf")
                        {
                            var resize = ResizeBigImage(BankAcc, file3);
                            var xml3 = CreateXML(file3, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Bank Account Proof", ext);
                            return res;
                        }
                        else
                        {

                            BankAcc.SaveAs(file3);
                            CompressPdf(file3);
                            var xml3 = CreateXML(file3, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Bank Account Proof", ext);
                            return res;
                        }
                    }
                    else
                    {
                        BankAcc.SaveAs(file3);
                        var xml3 = CreateXML(file3, flname);
                        //string ext = Path.GetExtension(file);
                        var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Bank Account Proof", ext);
                        return res;
                    }
                    //BankAcc.SaveAs(file3);
                    //var xml3 = CreateXML(file3, flname);
                    //string ext3 = Path.GetExtension(file3);
                    //var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Bank Account Proof", ext3);
                    wl.Writer("success upload client Bank Account Proof");
                    //return res;
                }
                else
                {
                    wl.Writer("filename " + flname + ", extension is not allowed");
                    rs.success = false;
                    rs.message = "filename " + flname + ", extension is not allowed";
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

        public JsonResult UploadBackID(HttpPostedFileBase ID, Guid FormID, Guid File_ID)
        {
            WriteLog wl = new WriteLog();
            result rs = new result();
            //string uploadPath = ConfigurationManager.AppSettings["uploadPath"].ToString();
            try
            {
                var filename3 = ID.FileName;
                var flname = Path.GetFileName(filename3);
                string ext = Path.GetExtension(flname);
                var isAllowedFile = AllowedFileExtension(flname);
                if (isAllowedFile == true)
                {
                    //var folder = Path.Combine(@uploadPath, FormID.ToString());
                    //var file3 = Path.Combine(folder, flname);
                    var folder = "~/upload/" + FormID.ToString() + "/";
                    var file3 = Server.MapPath(folder + flname);
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(Server.MapPath(folder));
                    }
                    if (System.IO.File.Exists(file3))
                    {
                        //System.IO.File.Delete(file3);
                        flname = CheckName(flname, folder);
                        file3 = Path.Combine(Server.MapPath(folder + flname));
                    }

                    var filesize = ID.ContentLength;
                    if (filesize > TwoMegaBytes)
                    {
                        if (ext.ToLower() != ".pdf")
                        {
                            var resize = ResizeBigImage(ID, file3);
                            var xml3 = CreateXML(file3, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Back of ID", ext);
                            return res;
                        }
                        else
                        {

                            ID.SaveAs(file3);
                            CompressPdf(file3);
                            var xml3 = CreateXML(file3, flname);
                            //string ext = Path.GetExtension(file);
                            var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Back of ID", ext);
                            return res;
                        }
                    }
                    else
                    {
                        ID.SaveAs(file3);
                        var xml3 = CreateXML(file3, flname);
                        //string ext = Path.GetExtension(file);
                        var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Back of ID", ext);
                        return res;
                    }
                    //ID.SaveAs(file3);
                    //var xml3 = CreateXML(file3, flname);
                    //string ext3 = Path.GetExtension(file3);
                    //var res = SaveUpdatePanel15(xml3, flname, FormID, File_ID, "Back of ID", ext3);
                    wl.Writer("success upload client Back of ID");
                    //return res;
                }
                else
                {
                    wl.Writer("filename " + flname + ", extension is not allowed");
                    rs.success = false;
                    rs.message = "filename " + flname + ", extension is not allowed";
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
        public void Remove(string fileNames)
        {
            WriteLog wl = new WriteLog();
            try
            {
                var file = Server.MapPath("~/upload/" + fileNames);
                if (System.IO.File.Exists(file))
                {
                    System.IO.File.Delete(file);
                }
            }
            catch(Exception e)
            {
                wl.Writer(e.ToString());
            }
            
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
            catch(Exception e)
            {
                wl.Writer(e.ToString());
            }

            return "";
        }

        public JsonResult SaveUpdatePanel15(string xml, string filename, Guid ID_Form, Guid file_ID, string AttType, string ext)
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
                        //comment this when fao
                        if (fm.Step <= 14)
                        {
                            fm.Step = 14;
                        }
                        //if (fm.Step <= 14 && fm.ApplicationMode == 0)
                        //{
                        //    fm.Step = 14;
                        //}
                        //else
                        //{
                        //    fm.Step = 15;
                        //}
                       
                        //fm.Step = 16;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.LastLoginTime = DateTime.Now;
                        fm.AttFormID = ID_Form;
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

                                if(file_context.SaveChanges() > 0)
                                {
                                    
                                    if (context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_AccOpenRequest FormID " + ID_Form + " Step : " + fm.Step);
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
                                        wl.Writer("failed client save Tb_AccOpenRequest FormID " + ID_Form + " Step : " + fm.Step);
                                        rs.success = false;
                                        rs.message = "Failed";
                                    }
                                }
                                else
                                {
                                    wl.Writer("failed client save Tb_Attachment FormID " + ID_Form + " Step : " + fm.Step);
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
                                if(file_context.SaveChanges() > 0)
                                {
                                    wl.Writer("success client save Tb_Attachment FormID " + ID_Form + " Step : " + fm.Step);
                                    fm.SubmitStatus = null;
                                    fm.SubmittedDateTime = null;
                                    if (context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save Tb_AccOpenRequest FormID " + ID_Form + " Step : " + fm.Step);
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
                                        wl.Writer("failed client save Tb_AccOpenRequest FormID " + ID_Form + " Step : " + fm.Step);
                                        rs.success = false;
                                        rs.message = "Failed";
                                    }
                                }
                                else
                                {
                                    wl.Writer("failed client save Tb_Attachment FormID " + ID_Form + " Step : " + fm.Step);
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
    }
}