using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Configuration;
using System.IO;


namespace OAO.Controllers
{
    public class EmailController : Controller
    {
        // GET: Email
        public ActionResult Index()
        {
            return View();
        }

        public bool ConfigureEmail(string recipient, string subject, string body)
        {
            WriteLog writeLog = new WriteLog();
            try
            {              
                using (MailMessage mail = new MailMessage())
                {
                    
                    mail.From = new MailAddress(ConfigurationManager.AppSettings["Username"]);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;
                    mail.To.Add(new MailAddress(recipient));
                    SmtpClient smtp = new SmtpClient();
                    //string working = AppDomain.CurrentDomain.BaseDirectory;
                    //string dir = Directory.GetParent(working).FullName;
                    //string folder = Path.Combine(dir, "SpecifiedPickupDirectory");
                    //Directory.CreateDirectory(folder);
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    //smtp.PickupDirectoryLocation = folder;
                    smtp.Host = ConfigurationManager.AppSettings["Host"];

                    smtp.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSsl"]);
                    System.Net.NetworkCredential cred = new System.Net.NetworkCredential();
                    cred.UserName = ConfigurationManager.AppSettings["Username"];
                    if (ConfigurationManager.AppSettings["Password"] != "")
                    {
                        cred.Password = ConfigurationManager.AppSettings["Password"];
                    }
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = cred;
                    smtp.Port = int.Parse(ConfigurationManager.AppSettings["Port"]);
                    
                    try
                    {
                        smtp.Send(mail);
                    }
                    catch (Exception e)
                    {
                        writeLog.Writer(e.Message + e.StackTrace);
                        //please change this part for bypass email 03/05/2021
                        return false; //--- > change this
                    }

                    return true;
                }
            }
            catch(Exception e)
            {
                writeLog.Writer(e.ToString());
            }
            return false;
        }

        public class MailBody
        {
            public string Link { get; set; }
        }

        public string PopulateBody(string url, string desc, string title, string lang)
        {
            string body = string.Empty;
            WriteLog writeLog = new WriteLog();
            try
            {
                
                switch (lang)
                {
                    case "en-us":
                        using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/EmailTemplates/LinkTemplate.html")))
                        {
                            body = reader.ReadToEnd();
                        }
                        body = body.Replace("{Title}", title);
                        body = body.Replace("{Url}", url);
                        body = body.Replace("{datetime}", DateTime.Now.ToString());

                        break;
                    case "zh-hk":
                        using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/EmailTemplates/zh-hkTemplate.html")))
                        {
                            body = reader.ReadToEnd();
                        }
                        body = body.Replace("{Title}", title);
                        body = body.Replace("{Url}", url);
                        body = body.Replace("{datetime}", DateTime.Now.ToString());

                        break;

                    case "zh-cn":
                        using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/EmailTemplates/zh-cnTemplate.html")))
                        {
                            body = reader.ReadToEnd();
                        }
                        body = body.Replace("{Title}", title);
                        body = body.Replace("{Url}", url);
                        body = body.Replace("{datetime}", DateTime.Now.ToString());

                        break;
                }
            }
            catch(Exception e)
            {
                writeLog.Writer(e.ToString());
            }
            
            
            return body;
        }

        public bool SendEmailTemplate(string url, string desc, string title, string recipient, string subject, string lang)
        {
            WriteLog writeLog = new WriteLog();
            try
            {
                string body = PopulateBody(url, desc, title, lang);
                var data = ConfigureEmail(recipient, subject, body);
                return data;
            }
            catch (Exception e)
            {
                writeLog.Writer(e.ToString());
            }
            return false;
        }
    }
}