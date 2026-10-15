using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Controllers;
using OAO.Models;

namespace OAO.Controllers
{
    public class Pane4Controller : Controller
    {
        // GET: Pane4
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel4(Panel4 param)
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


                    var validResidential = false;

                    var residential1_addr = rm.Value(param.Residential_Address);
                    var residential2_addr = rm.Value(param.Residential_Address2);
                    var residential3_addr = rm.Value(param.Residential_Address3);

                    if (residential1_addr == "")
                    {
                        validResidential = false;
                    }
                    else
                    {
                        validResidential = true;
                    }

                    if (residential2_addr == "")
                    {
                        validResidential = false;
                    }
                    else
                    {
                        validResidential = true;
                    }

                    if (residential3_addr == "")
                    {
                        validResidential = false;
                    }
                    else
                    {
                        validResidential = true;
                    }

                    if (validResidential == false)
                    {
                        rs.success = false;
                        rs.message = "Error address can not empty";
                        wl.Writer("failed client filled address empty info save ID " + fm.ID + " ID " + fm.ID + " Step : " + fm.Step);

                        return Json(rs, JsonRequestBehavior.AllowGet);
                    }

                    if (fm != null)
                    {
                        if (fm.Step <= 4)
                        {
                            fm.Step = 3;
                        }
                        //fm.Step = 5;

                        var dt = new
                        {
                            page = fm.Step,
                        };
                        rs.data = dt;
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;
                        if (context.SaveChanges() > 0)
                        {
                            using (var new_context = new OAOEntities())
                            {
                                new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                                if (cl != null)
                                {
                                    cl.ResidentialCountry = param.Residential_Country;
                                    cl.ResidentialAddress1 = rm.Value(param.Residential_Address);
                                    cl.ResidentialAddress2 = rm.Value(param.Residential_Address2);
                                    cl.ResidentialAddress3 = rm.Value(param.Residential_Address3);
                                    cl.StatusOfResidence = param.Ownership_Residence;
                                    cl.EmploymentType = param.Employment_Type;
                                    cl.EmploymentIndustry = param.Industry;
                                    cl.EmployerName = rm.Value(param.Employer_Company_Name);
                                    cl.Occupation = param.Occupation;
                                    cl.SameMailingAddress = true;
                                    if (param.Occupation == "Other Occupations")
                                    {
                                        cl.OccupationOthers = param.Other_Occupation;
                                    }
                                    
                                    if(param.Industry == "Other industries")
                                    {
                                        cl.EmploymentIndustryOthers = param.Other_Industry;
                                    }
                                    
                                    //cl.CompanyName
                                    cl.EmployerAddress1 = rm.Value(param.Office_Address1);
                                    cl.EmployerAddress2 = rm.Value(param.Office_Address2);
                                    cl.EmployerAddress3 = rm.Value(param.Office_Address3);
                                    cl.EmployerAddressCountry = param.Office_Region;
                                    cl.YearsOfService = param.Years_Of_Service;
                                    //cl.Employer_Company_Name = 
                                    //cl.LastUpdateTime = DateTime.Now;
                                    if (new_context.SaveChanges() > 0)
                                    {
                                        
                                        //rs.data = null;
                                        rs.success = true;
                                        rs.message = "success";
                                        wl.Writer("sucessfully client info save ID " + fm.ID + " Step : " + fm.Step);
                                        try
                                        {
                                            using (var w8_context = new OAOEntities())
                                            {

                                                var w8 = w8_context.W8BEN_Address.SingleOrDefault(_ => _.FormID == fm.W8ID && _.AddressType == "R");
                                                if (w8 != null)
                                                {
                                                    w8.Country = rm.Value(param.Residential_Country);
                                                    w8.Address1 = rm.Value(param.Residential_Address);
                                                    w8.Address2 = rm.Value(param.Residential_Address2);
                                                    w8.Address3 = rm.Value(param.Residential_Address3);

                                                    if (w8_context.SaveChanges() > 0)
                                                    {
                                                        wl.Writer("success client save  : CheckIfFTIN  ID " + fm.ID + " step " + fm.Step);
                                                        //rs.data = null;
                                                        rs.success = true;
                                                        rs.message = "success";
                                                    }

                                                }
                                            }
                                        }
                                        catch (Exception e)
                                        {
                                            //rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed to save CheckIfFTIN " + false + " ID " + fm.ID + " Step : " + fm.Step);
                                        }
                                    }
                                    else
                                    {
                                        //rs.data = null;
                                        rs.success = false;
                                        rs.message = "failed";
                                        wl.Writer("failed client info save ID " + fm.ID + " ID " + fm.ID + " Step : " + fm.Step);
                                    }
                                }

                            }
                        }
                        else
                        {
                            rs.data = null;
                            rs.success = false;
                            rs.message = "failed";
                            wl.Writer("failed client info save ID " + fm.ID + " Step : " + fm.Step);
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
        public JsonResult GetLookupData(string Lang)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using(var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    //IList<Tb_Lookup_Translation_Temp> lookup = context.Tb_Lookup_Translation_Temp.AsNoTracking().ToList<Tb_Lookup_Translation_Temp>();
                    IList<Tb_Lookup_Translation_Temp> lookup = context.Tb_Lookup_Translation_Temp.Where(b => b.LanguageCode == Lang).ToList<Tb_Lookup_Translation_Temp>();
                    
                    if (lookup != null)
                    {
                        rs.data = lookup;
                        rs.success = true;
                        rs.message = "success";
                        wl.Writer("successfully client info get data look up Tb_Lookup_Translation_Temp");
                    }
                    else
                    {
                        rs.data = null;
                        rs.success = false;
                        rs.message = "failed";
                        wl.Writer("failed client info get data look up Tb_Lookup_Translation_Temp");
                    }
                    
                }
            }catch(Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                rs.data = null;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }

            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetLookupConf()
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    //IList<Tb_Lookup_Translation_Temp> lookup = context.Tb_Lookup_Translation_Temp.AsNoTracking().ToList<Tb_Lookup_Translation_Temp>();
                    IList<Tb_Lookup_Translation_Temp> lookup = context.Tb_Lookup_Translation_Temp.Where(b => b.LanguageCode == "en-us" || b.LanguageCode == "zh-hk").ToList<Tb_Lookup_Translation_Temp>();

                    if (lookup != null)
                    {
                        rs.data = lookup;
                        rs.success = true;
                        rs.message = "success";
                        wl.Writer("successfully client info get data look up Tb_Lookup_Translation_Temp");
                    }
                    else
                    {
                        rs.data = null;
                        rs.success = false;
                        rs.message = "failed";
                        wl.Writer("failed client info get data look up Tb_Lookup_Translation_Temp");
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