using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;
using OAO.Controllers;

namespace OAO.Controllers
{
    public class Panel1Controller : Controller
    {
        
        // GET: Panel1
        public ActionResult Index()
        {
            return View();
        }

        public class result
        {
            public object data { get; set; }
            public bool success { get; set; }
            public string message { get; set; }

        }

        [HttpPost]
        public JsonResult saveUpdatePanel1(Panel1 param)
        {
            var res = new result();
            WriteLog writeLog = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var rs = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);
                    if (rs != null)
                    {

                    }
                    else
                    {
                        var em = context.sp_OAO2_K2IsEmailAvailable(param.Email).FirstOrDefault();
                        if (em != "F")
                        {
                            RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                            var now = DateTime.Now;
                            var mdata = new Tb_AccOpenRequest()
                            {
                                ID = Guid.NewGuid(),
                                IsInChina = param.ISMAINLAND == 1 ? true : false,
                                EmailAddress = rm.Value(param.Email),
                                MobileNo = rm.Value(param.Phone_Number),
                                CountryCodeMobile = param.Phone_Code,
                                Step = 0,
                                RequestTime = now,
                                LastLoginTime = now,
                                Approver1_SubmitTime = now,
                                Approver2_SubmitTime = now,
                                Approver3_SubmitTime = now,
                                Approver4_SubmitTime = now,
                                Source = param.Source,
                                SubmitStatus = null,
                                SubmittedDateTime = null,
                                //LastStatusUpdatedBy = ConfigurationManager.AppSettings["SubmittedByName"].ToString(),

                            };

                            if(param.PID > 0) {
                                mdata.PID = param.PID;
                            }
                            
                            if(!string.IsNullOrEmpty(mdata.EmailAddress) && !string.IsNullOrEmpty(mdata.CountryCodeMobile) && !string.IsNullOrEmpty(mdata.MobileNo))
                            {
                                var lang = "";
                                if (HttpContext.Session["lang"] != null)
                                {
                                    lang = HttpContext.Session["lang"].ToString();
                                    var m = BuildUrl("null", "null", "null", lang, "2", Request.Url.Scheme, Request.Url.Authority + Request.ApplicationPath, mdata.ID, param.Source);
                                    EmailController mail = new EmailController();
                                    var sent = false;
                                    switch (lang)
                                    {
                                        case "en-us":
                                            sent = mail.SendEmailTemplate(m, "Email Url form access", "", param.Email, "Thank you for your interest in Phillip Securities", lang);
                                            break;
                                        case "zh-hk":
                                            sent = mail.SendEmailTemplate(m, "Email Url form access", "", param.Email, "感謝您對輝立證券的支持", lang);
                                            break;
                                        case "zh-cn":
                                            sent = mail.SendEmailTemplate(m, "Email Url form access", "", param.Email, "感谢您对輝立證券的支持", lang);
                                            break;
                                    }

                                    param.ID_Form = mdata.ID;

                                    if (sent == true)
                                    {
                                        writeLog.Writer("successfull sent email with FormID = " + mdata.ID);
                                        writeLog.Writer("client Info ID " + mdata.ClientInfoID + " FormID "+ mdata.ID+ " email "+ param.Email + " send step : " + mdata.Step);
                                        var cl = new Tb_ClientInfo()
                                        {
                                            ID = Guid.NewGuid(),
                                            AeCd = null,
                                            AeName = null,
                                            //PreferredAE = true,
                                            LastUpdateTime = now,
                                        };

                                        context.Tb_ClientInfo.Add(cl);
                                        if (context.SaveChanges() > 0)
                                        {
                                            mdata.ClientInfoID = cl.ID;

                                            context.Tb_AccOpenRequest.Add(mdata);
                                            if (context.SaveChanges() > 0)
                                            {
                                                var data = new
                                                {
                                                    data = param,
                                                    page = mdata.Step,
                                                };
                                                res.data = data;
                                                res.success = true;
                                                res.message = "success";
                                                Response.Cookies["OAOCookies"].Value = mdata.ID.ToString();
                                                DateTime currentTime = DateTime.Now;
                                                var tmr = currentTime.AddMinutes(1200);
                                                Response.Cookies["OAOCookies"].Expires = tmr;
                                                writeLog.Writer("client Info ID save data on database " + mdata.ClientInfoID + " FormID "+ mdata.ID+ " step : " + mdata.Step);


                                            }
                                            else
                                            {
                                                res.success = false;
                                                res.message = "fail save data on database";
                                                writeLog.Writer("fail save data on database");
                                            }
                                        }

                                    }
                                    else
                                    {
                                        res.success = false;
                                        res.message = "not sending email";
                                        writeLog.Writer("not sending email");
                                    }

                                }
                            }
                            else
                            {
                                res.data = null;
                                res.message = "Email, code area, phone number empty";
                                res.success = false;
                                writeLog.Writer("Email, code area, phone number empty");
                            }
                            
                        }
                        else
                        {
                            res.data = null;
                            res.message = "Email Already Exist";
                            res.success = false;
                            writeLog.Writer("Email Already Exist");
                        }
                    }

                    
                }

            }
            catch (Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
            }

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public string BuildUrl(string AeCode, string AeName, string PromotionCode, string lang, string page, string scheme, string auth, Guid ID, string Source)
        {
            WriteLog writeLog = new WriteLog();
            try
            {
                var mainurl = string.Format("{0}://{1}", scheme, auth);
                var urlBuilder = new UriBuilder(mainurl);
                var query = HttpUtility.ParseQueryString(urlBuilder.Query);
                query["lang"] = Session["lang"].ToString();
                query["ID"] = ID.ToString();
                query["Source"] = Source;
                if (HttpContext.Session["AeCode"].ToString() != "")
                {
                    query["AECode"] = Session["AeCode"].ToString();
                }

                if (HttpContext.Session["AeName"].ToString() != "")
                {
                    query["AEName"] = Session["AeName"].ToString();
                }

                if (HttpContext.Session["PromotionCode"].ToString() != "")
                {
                    query["PromoCode"] = Session["PromotionCode"].ToString();
                }

                query["login"] = "1";
                urlBuilder.Query = query.ToString();
                writeLog.Writer("client form ID " + ID.ToString() + "AECODE " + Session["AeCode"].ToString());
                return urlBuilder.ToString();
            }
            catch(Exception e)
            {
                writeLog.Writer(e.Message + e.StackTrace);
            }

            return "fail build url";
        }



        //[HttpPost]
        //public JsonResult saveUpdatePanel2(Panel3 param)
        //{
        //    var res = new result();
        //    using (var context = new OAOEntities())
        //    {
        //        if (param.ID_Form != null)
        //        {
        //            var rs = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);
        //            if (rs != null)
        //            {
        //                rs.PromoCode = param.Promotion_Code;
        //                //rs.Surename = param.Surename;
        //                //rs.Title = param.Title;
        //                //rs.First_Name = param.FirstName;
        //                //rs.Nationality = param.Nationality;
        //                //rs.ID_Card = param.ID_Card;
        //                //rs.Place_of_Issue = param.Place_Issue;
        //                //rs.Country_of_Birth = param.Country_Birth;
        //                //rs.Date_of_Birth = param.Date_Birth;
        //                //rs.Age = param.Age;
        //                rs.CountryCodeMobile = param.mobile_Area_Number;
        //                rs.MobileNo = param.Mobile_number;
        //                //rs.Home_Number = param.Home_number;
        //                //rs.Office_Number = param.Office_Number;
        //                //rs.Wechat_ID = param.Wechat_ID;
        //                //rs.Home_Area_Number = param.Home_Area_Number;
        //                //rs.Office_Area_Number = param.Office_Area_Number;
        //                //rs.AECODE = param.AECODE;
        //                //rs.AENAME = param.AENAME;
        //                if (context.SaveChanges() > 0)
        //                {
        //                    var cl = context.Tb_ClientInfo.SingleOrDefault(b => b.ID == rs.ClientInfoID);
        //                    if(cl != null)
        //                    {
        //                        cl.PreferredAE
        //                    }
        //                    var updatepanel = SavePanel(3, rs.ID_Form, "Draft", "");
        //                    if (updatepanel.success)
        //                    {
        //                        res.data = null;
        //                        res.success = true;
        //                        res.message = "Success Updated data";
        //                        return Json(res);
        //                    }
        //                    else
        //                    {
        //                        res.data = null;
        //                        res.success = false;
        //                        res.message = "Failed Updated data";
        //                        return Json(res);
        //                    }

        //                }
        //                else
        //                {
        //                    res.data = null;
        //                    res.success = false;
        //                    res.message = "Failed Updated data";
        //                    return Json(res);
        //                }

        //            }
        //        }

        //        return Json(res);

        //    }
        //}
    }
}