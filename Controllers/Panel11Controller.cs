using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel11Controller : Controller
    {
        // GET: Panel11
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel1(panel11 param)
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
                        if (fm.Step <= 11)
                        {
                            fm.Step = 10;
                        }
                        //fm.Step = 12;
                        
                        fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;

                        if (!String.IsNullOrEmpty(param.W8_address1)) 
                        {
                            if ((param.W8_address1).Length > 100)
                            {
                                var dt = new
                                {
                                    message_error = "address_error"
                                };
                                rs.data = dt;
                                rs.success = false;
                                rs.message = "data length address 1 validation more than 100 character";
                                return Json(rs, JsonRequestBehavior.AllowGet);
                            }
                            
                        }
                        else if (!String.IsNullOrEmpty(param.W8_address2)) 
                        {
                            if ((param.W8_address2).Length > 100)
                            {
                                var dt = new
                                {
                                    message_error = "address_error"
                                };
                                rs.data = dt;
                                rs.success = false;
                                rs.message = "data length address 2 validation more than 100 character";
                                return Json(rs, JsonRequestBehavior.AllowGet);
                            }
                            
                        }
                        else if (!String.IsNullOrEmpty(param.W8_address3))
                        {
                            if((param.W8_address3).Length > 100)
                            {
                                var dt = new
                                {
                                    message_error = "address_error"
                                };
                                rs.data = dt;
                                rs.success = false;
                                rs.message = "data length address 3 validation more than 100 character";
                                return Json(rs, JsonRequestBehavior.AllowGet);
                            }
                        }

                        using (var new_context = new OAOEntities())
                        {
                            new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            using (var w8_context = new OAOEntities())
                            {
                                var w8 = w8_context.W8BEN_Client.SingleOrDefault(_ => _.FormID == fm.W8ID);
                                if (w8 != null)
                                {

                                    w8.ClientName = rm.Value(param.W8_name);
                                    w8.CountryOfCitizenship = rm.Value(param.W8_citizenship);
                                    w8.DateOfBirth = param.W8_date_birth;
                                    w8.SSN = param.W8_tax_tin;
                                    w8.ITIN = param.W8_tax_tin;
                                    w8.ForeignTaxID = param.W8_identifyng_number;
                                    w8.RefNumber = param.W8_reffrence_number;
                                    w8.FormStatus = "0";
                                    w8.AccNo = "0";
                                    w8.CreatedDateTime = DateTime.Now;
                                    w8.CreatedBy = "OAO phase 3 Form";
                                    w8.B2BCompany = "PH";
                                    w8.Version = "1.0";
                                    w8.CheckIfFTIN = param.CheckIfFTIN;

                                    if (w8_context.SaveChanges() > 0)
                                    {
                                        wl.Writer("success client save W8BEN_Client Step : " + fm.Step);
                                        rs.data = null;
                                        rs.success = true;
                                        rs.message = "success";



                                        using (var upd_addr = new OAOEntities())
                                        {
                                            upd_addr.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                            var add = upd_addr.W8BEN_Address.Where(_ => _.FormID == fm.W8ID).ToList();
                                            if (add != null)
                                            {
                                                if (add.Count != 2 && param.same_As_residence == false)
                                                {
                                                    var w8_addrM = new W8BEN_Address()
                                                    {
                                                        FormID = w8.FormID,
                                                        Address1 = rm.Value(param.W8_mailing_address1),
                                                        Address2 = rm.Value(param.W8_mailing_address2),
                                                        Address3 = rm.Value(param.W8_mailing_address3),
                                                        City = (param.W8_mailing_city == null ? "" : param.W8_mailing_city),
                                                        StateAddress = param.W8_mailing_state,
                                                        PostalCode = param.W8_mailing_postalcode,
                                                        Country = param.W8_mailing_country,
                                                        CreatedBy = "OAO phase 3 Form",
                                                        CreatedDateTime = DateTime.Now,
                                                        ModifyDateTime = null,
                                                        AddressType = "M"

                                                    };
                                                    try
                                                    {
                                                        upd_addr.W8BEN_Address.Add(w8_addrM);
                                                        if (upd_addr.SaveChanges() > 0)
                                                        {
                                                            //fm.W8ID = w8_client.FormID;
                                                            rs.data = null;
                                                            rs.success = true;
                                                            rs.message = "success";

                                                            Param_MailingAddress madrr = new Param_MailingAddress();
                                                            madrr.MailingAddress1 = w8_addrM.Address1;
                                                            madrr.MailingAddress2 = w8_addrM.Address2;
                                                            madrr.MailingAddress3 = w8_addrM.Address3;
                                                            madrr.MailingCountry = w8_addrM.Country;
                                                            madrr.MailingPostalCode = w8_addrM.PostalCode;
                                                            madrr.SameMailingAddress = param.same_As_residence;
                                                            madrr.ResidencePostalCode = param.W8_residence_postalcode;

                                                            var input_client_Address = Client_MailingAddr(fm.ClientInfoID.Value, madrr);

                                                            if (!input_client_Address)
                                                            {
                                                                wl.Writer("failed update mailing Address ClientInfoID = " + fm.ClientInfoID);
                                                            }


                                                        }

                                                    }
                                                    catch (Exception e)
                                                    {
                                                        var dt = new
                                                        {
                                                            message_error = "error_on_exception"
                                                        };
                                                        wl.Writer(e.Message + e.StackTrace);
                                                        rs.data = dt;
                                                        rs.success = false;
                                                        rs.message = e.Message + e.StackTrace;
                                                        return Json(rs, JsonRequestBehavior.AllowGet);
                                                    }
                                                }
                                                else
                                                {
                                                    
                                                    if (param.same_As_residence == true)
                                                    {
                                                        Param_MailingAddress madrr = new Param_MailingAddress();
                                                        madrr.MailingAddress1 = param.W8_address1;
                                                        madrr.MailingAddress2 = param.W8_address2;
                                                        madrr.MailingAddress3 = param.W8_address3;
                                                        madrr.MailingCountry = param.W8_residence_country;
                                                        madrr.MailingPostalCode = param.W8_residence_postalcode;
                                                        madrr.SameMailingAddress = param.same_As_residence;
                                                        madrr.ResidencePostalCode = param.W8_residence_postalcode;

                                                        var input_client_Address = Client_MailingAddr(fm.ClientInfoID.Value, madrr);

                                                        if (!input_client_Address)
                                                        {
                                                            wl.Writer("failed update mailing Address ClientInfoID = " + fm.ClientInfoID);
                                                        }
                                                    }
                                                }

                                                if (rs.success == true)
                                                {
                                                    foreach (var adr in add)
                                                    {
                                                        if (adr.AddressType == "R")
                                                        {
                                                            adr.Address1 = rm.Value(param.W8_address1);
                                                            adr.Address2 = rm.Value(param.W8_address2);
                                                            adr.Address3 = rm.Value(param.W8_address3);
                                                            adr.Address4 = rm.Value(param.W8_address4);

                                                            adr.City = (param.W8_residence_city == null ? "" : param.W8_residence_city);
                                                            adr.StateAddress = param.W8_residence_state;
                                                            adr.PostalCode = param.W8_residence_postalcode;
                                                            adr.Country = param.W8_residence_country;
                                                            adr.ModifyDateTime = null;
                                                            adr.AddressType = "R";

                                                            try
                                                            {
                                                                if (upd_addr.SaveChanges() > 0)
                                                                {
                                                                    wl.Writer("success client save W8BEN_Address Step : " + fm.Step);
                                                                    rs.data = null;
                                                                    rs.success = true;
                                                                    rs.message = "success";
                                                                }

                                                            }
                                                            catch (Exception e)
                                                            {
                                                                wl.Writer(e.Message + e.StackTrace);
                                                                rs.data = null;
                                                                rs.success = false;
                                                                rs.message = e.Message + e.StackTrace;
                                                                return Json(rs, JsonRequestBehavior.AllowGet);
                                                            }

                                                        }
                                                        else
                                                        {
                                                            if (param.same_As_residence == false)
                                                            {
                                                                adr.Address1 = rm.Value(param.W8_mailing_address1);
                                                                adr.Address2 = rm.Value(param.W8_mailing_address2);
                                                                adr.Address3 = rm.Value(param.W8_mailing_address3);

                                                                adr.City = (param.W8_mailing_city == null ? "" : param.W8_mailing_city);
                                                                adr.StateAddress = param.W8_mailing_state;
                                                                adr.PostalCode = param.W8_mailing_postalcode;
                                                                adr.Country = param.W8_mailing_country;
                                                                adr.ModifyDateTime = null;
                                                                adr.AddressType = "M";

                                                                //----- update 

                                                                try
                                                                {
                                                                    if (upd_addr.SaveChanges() > 0)
                                                                    {
                                                                        wl.Writer("success client save W8BEN_Address Step : " + fm.Step);
                                                                        rs.data = null;
                                                                        rs.success = true;
                                                                        rs.message = "success";

                                                                        Param_MailingAddress madrr = new Param_MailingAddress();
                                                                        madrr.MailingAddress1 = rm.Value(param.W8_mailing_address1);
                                                                        madrr.MailingAddress2 = rm.Value(param.W8_mailing_address2);
                                                                        madrr.MailingAddress3 = rm.Value(param.W8_mailing_address3);
                                                                        madrr.MailingCountry = param.W8_mailing_country;
                                                                        madrr.MailingPostalCode = param.W8_mailing_postalcode;
                                                                        madrr.SameMailingAddress = param.same_As_residence;
                                                                        madrr.ResidencePostalCode = param.W8_residence_postalcode;

                                                                        var input_client_Address = Client_MailingAddr(fm.ClientInfoID.Value, madrr);
                                                                    }

                                                                }
                                                                catch (Exception e)
                                                                {
                                                                    wl.Writer(e.Message + e.StackTrace);
                                                                    rs.data = null;
                                                                    rs.success = false;
                                                                    rs.message = e.Message + e.StackTrace;
                                                                    return Json(rs, JsonRequestBehavior.AllowGet);
                                                                }
                                                            }
                                                            else if (param.same_As_residence == true && adr.AddressType == "M")
                                                            {

                                                                try
                                                                {
                                                                    adr.Address1 = rm.Value(param.W8_address1);
                                                                    adr.Address2 = rm.Value(param.W8_address2);
                                                                    adr.Address3 = rm.Value(param.W8_address3);
                                                                    adr.Address4 = rm.Value(param.W8_address4);
                                                                    adr.City = (param.W8_residence_city == null ? "" : param.W8_residence_city);
                                                                    adr.StateAddress = param.W8_residence_state;
                                                                    adr.PostalCode = param.W8_residence_postalcode;
                                                                    adr.Country = param.W8_residence_country;
                                                                    adr.ModifyDateTime = null;
                                                                    adr.AddressType = "M";
                                                                    if (upd_addr.SaveChanges() > 0)
                                                                    {
                                                                        wl.Writer("success client save W8BEN_Address Step : " + fm.Step);
                                                                        rs.data = null;
                                                                        rs.success = true;
                                                                        rs.message = "success";
                                                                    }

                                                                }
                                                                catch (Exception e)
                                                                {
                                                                    wl.Writer(e.Message + e.StackTrace);
                                                                    rs.data = null;
                                                                    rs.success = false;
                                                                    rs.message = e.Message + e.StackTrace;
                                                                    return Json(rs, JsonRequestBehavior.AllowGet);
                                                                }
                                                            }

                                                        }
                                                    }

                                                    if(rs.success == true)
                                                    {
                                                        using (var w8_TaxTreaty = new OAOEntities())
                                                        {
                                                            var tr = w8_TaxTreaty.W8BEN_TaxTreaty.SingleOrDefault(_ => _.FormID == fm.W8ID);
                                                            if (tr != null)
                                                            {

                                                                tr.Country = param.W8_benefit_country;
                                                                tr.ParagraphArticle = param.W8_rate_paragraph;
                                                                tr.WithholdingTaxPercentRate = Convert.ToDecimal(param.W8_tax);
                                                                tr.IncomeType = param.W8_income_type;
                                                                tr.ParagraphArticleAddOnConditions = param.W8_on_condition;
                                                                tr.ModifyDateTime = null;
                                                                tr.CreatedBy = "OAO phase 3 Form";


                                                                try
                                                                {
                                                                    if (w8_TaxTreaty.SaveChanges() > 0)
                                                                    {
                                                                        wl.Writer("success client save W8BEN_TaxTreaty Step : " + fm.Step);
                                                                        rs.data = null;
                                                                        rs.success = true;
                                                                        rs.message = "success";
                                                                    }

                                                                }
                                                                catch (Exception e)
                                                                {
                                                                    var dt = new
                                                                    {
                                                                        message_error = "error_on_exception"
                                                                    };
                                                                    wl.Writer(e.Message + e.StackTrace);
                                                                    rs.data = dt;
                                                                    rs.success = false;
                                                                    rs.message = e.Message + e.StackTrace;
                                                                    return Json(rs, JsonRequestBehavior.AllowGet);
                                                                }

                                                            }
                                                        }
                                                    }
                                                }
                                                
                                            }

                                        }
                                    }
                                    
                                    

                                    //try
                                    //{
                                    //    if (w8_context.SaveChanges() > 0)
                                    //    {
                                    //        wl.Writer("success client save W8BEN_Client Step : " + fm.Step);
                                    //        rs.data = null;
                                    //        rs.success = true;
                                    //        rs.message = "success";
                                    //    }
                                    //    else
                                    //    {
                                    //        rs.data = null;
                                    //        rs.success = false;
                                    //        rs.message = "failed";
                                    //        return Json(rs, JsonRequestBehavior.AllowGet);
                                    //    }
                                    //}
                                    //catch(Exception e)
                                    //{
                                    //    wl.Writer(e.Message + e.StackTrace);
                                    //    rs.data = null;
                                    //    rs.success = false;
                                    //    rs.message = e.Message + e.StackTrace;
                                    //    return Json(rs, JsonRequestBehavior.AllowGet);
                                    //}

                                }
                                else
                                {
                                    var w8_client = new W8BEN_Client()
                                    {
                                        FormID = Guid.NewGuid(),
                                        ClientName = param.W8_name,
                                        CountryOfCitizenship = param.W8_citizenship,
                                        DateOfBirth = param.W8_date_birth,
                                        SSN = param.W8_tax_tin,
                                        ITIN = param.W8_tax_tin,
                                        ForeignTaxID = param.W8_identifyng_number,
                                        RefNumber = param.W8_reffrence_number,
                                        FormStatus = "0",
                                        AccNo = "0",
                                        CreatedDateTime = DateTime.Now,
                                        CreatedBy = "OAO phase 3 Form",
                                        B2BCompany = "PH",
                                        Version = "1.0",
                                        ModifyBy = null,
                                        CompletionBy = null,
                                        CompletionDateTime = null,
                                        ModifyDateTime = null,
                                        CheckIfFTIN = param.CheckIfFTIN,
                                    };
                                    using (var cw8_client = new OAOEntities())
                                    {

                                        cw8_client.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                        cw8_client.W8BEN_Client.Add(w8_client);

                                        if (cw8_client.SaveChanges() > 0)
                                        {
                                            //w8_client.FormID = FormIDAll;
                                            //w8_client.FormID = FormIDAll;
                                            //fm.W8ID = w8_client.FormID;
                                            rs.data = null;
                                            rs.success = true;
                                            rs.message = "success";

                                            using (var cw8_addr = new OAOEntities())
                                            {
                                                cw8_addr.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");

                                                var w8_addrR = new W8BEN_Address()
                                                {
                                                    FormID = w8_client.FormID,
                                                    Address1 = param.W8_address1,
                                                    Address2 = param.W8_address2,
                                                    Address3 = param.W8_address3,
                                                    Address4 = param.W8_address4,
                                                    City = (param.W8_residence_city == null ? "" : param.W8_residence_city),
                                                    StateAddress = param.W8_residence_state,
                                                    PostalCode = param.W8_residence_postalcode,
                                                    Country = param.W8_residence_country,
                                                    CreatedBy = "OAO phase 3 Form",
                                                    CreatedDateTime = DateTime.Now,
                                                    AddressType = "R"

                                                };

                                                cw8_addr.W8BEN_Address.Add(w8_addrR);
                                                if (cw8_addr.SaveChanges() > 0)
                                                {
                                                    //fm.W8ID = w8_client.FormID;
                                                    rs.data = null;
                                                    rs.success = true;
                                                    rs.message = "success";


                                                }
                                                else
                                                {
                                                    rs.data = null;
                                                    rs.success = false;
                                                    rs.message = "failed";
                                                    return Json(rs, JsonRequestBehavior.AllowGet);
                                                }

                                                if (param.same_As_residence == false)
                                                {
                                                    var w8_addrM = new W8BEN_Address()
                                                    {
                                                        FormID = w8_client.FormID,
                                                        Address1 = param.W8_mailing_address1,
                                                        Address2 = param.W8_mailing_address2,
                                                        Address3 = param.W8_mailing_address3,
                                                        City = (param.W8_mailing_city == null ? "" : param.W8_mailing_city),
                                                        StateAddress = param.W8_mailing_state,
                                                        PostalCode = param.W8_mailing_postalcode,
                                                        Country = param.W8_mailing_country,
                                                        CreatedBy = "OAO phase 3 Form",
                                                        CreatedDateTime = DateTime.Now,
                                                        AddressType = "M"

                                                    };
                                                    try
                                                    {
                                                        cw8_addr.W8BEN_Address.Add(w8_addrM);
                                                        if (cw8_addr.SaveChanges() > 0)
                                                        {
                                                            //fm.W8ID = w8_client.FormID;
                                                            rs.data = null;
                                                            rs.success = true;
                                                            rs.message = "success";

                                                            Param_MailingAddress madrr = new Param_MailingAddress();
                                                            madrr.MailingAddress1 = w8_addrM.Address1;
                                                            madrr.MailingAddress2 = w8_addrM.Address2;
                                                            madrr.MailingAddress3 = w8_addrM.Address3;
                                                            madrr.MailingCountry = w8_addrM.Country;
                                                            madrr.MailingPostalCode = w8_addrM.PostalCode;
                                                            madrr.SameMailingAddress = param.same_As_residence;
                                                            madrr.ResidencePostalCode = param.W8_residence_postalcode;

                                                            var input_client_Address = Client_MailingAddr(fm.ClientInfoID.Value, madrr);

                                                            if (!input_client_Address)
                                                            {
                                                                wl.Writer("failed update mailing Address ClientInfoID = " + fm.ClientInfoID);
                                                            }
                                                        }
                                                        else
                                                        {
                                                            rs.data = null;
                                                            rs.success = false;
                                                            rs.message = "failed";
                                                            return Json(rs, JsonRequestBehavior.AllowGet);
                                                        }
                                                    }
                                                    catch (Exception e)
                                                    {
                                                        var dt = new
                                                        {
                                                            message_error = "error_on_exception"
                                                        };
                                                        wl.Writer(e.Message + e.StackTrace);
                                                        rs.data = dt;
                                                        rs.success = false;
                                                        rs.message = e.Message + e.StackTrace;
                                                        return Json(rs, JsonRequestBehavior.AllowGet);
                                                    }
                                                }
                                                else
                                                {
                                                    var w8_addrMC = new W8BEN_Address()
                                                    {
                                                        FormID = w8_client.FormID,
                                                        Address1 = param.W8_address1,
                                                        Address2 = param.W8_address2,
                                                        Address3 = param.W8_address3,
                                                        Address4 = param.W8_address4,
                                                        City = (param.W8_residence_city == null ? "" : param.W8_residence_city),
                                                        StateAddress = param.W8_residence_state,
                                                        PostalCode = param.W8_residence_postalcode,
                                                        Country = param.W8_residence_country,
                                                        CreatedBy = "OAO phase 3 Form",
                                                        CreatedDateTime = DateTime.Now,
                                                        AddressType = "M"

                                                    };

                                                    try
                                                    {
                                                        cw8_addr.W8BEN_Address.Add(w8_addrMC);
                                                        if (cw8_addr.SaveChanges() > 0)
                                                        {
                                                            //fm.W8ID = w8_client.FormID;
                                                            rs.data = null;
                                                            rs.success = true;
                                                            rs.message = "success";

                                                            Param_MailingAddress madrr = new Param_MailingAddress();
                                                            madrr.MailingAddress1 = w8_addrMC.Address1;
                                                            madrr.MailingAddress2 = w8_addrMC.Address2;
                                                            madrr.MailingAddress3 = w8_addrMC.Address3;
                                                            madrr.MailingCountry = w8_addrMC.Country;
                                                            madrr.MailingPostalCode = w8_addrMC.PostalCode;
                                                            madrr.SameMailingAddress = param.same_As_residence;
                                                            madrr.ResidencePostalCode = param.W8_residence_postalcode;

                                                            var input_client_Address = Client_MailingAddr(fm.ClientInfoID.Value, madrr);

                                                            if (!input_client_Address)
                                                            {
                                                                wl.Writer("failed update mailing Address ClientInfoID = " + fm.ClientInfoID);
                                                            }


                                                        }
                                                        else
                                                        {
                                                            rs.data = null;
                                                            rs.success = false;
                                                            rs.message = "failed";
                                                            return Json(rs, JsonRequestBehavior.AllowGet);
                                                        }
                                                    }
                                                    catch (Exception e)
                                                    {
                                                        wl.Writer(e.Message + e.StackTrace);
                                                        rs.data = null;
                                                        rs.success = false;
                                                        rs.message = e.Message + e.StackTrace;
                                                        return Json(rs, JsonRequestBehavior.AllowGet);
                                                    }
                                                }

                                                //---

                                                if(rs.success == true)
                                                {
                                                    using (var w8c_Taxttreaty = new OAOEntities())
                                                    {
                                                        w8c_Taxttreaty.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                                        var w8_Taxtreaty = new W8BEN_TaxTreaty()
                                                        {
                                                            FormID = w8_client.FormID,
                                                            Country = param.W8_benefit_country,
                                                            ParagraphArticle = param.W8_rate_paragraph,
                                                            WithholdingTaxPercentRate = Convert.ToDecimal(param.W8_tax),
                                                            IncomeType = param.W8_income_type,
                                                            ParagraphArticleAddOnConditions = param.W8_on_condition,
                                                            CreatedBy = "OAO phase 3 Form",
                                                            CreatedDateTime = DateTime.Now,
                                                            ModifyDateTime = null,

                                                        };
                                                        try
                                                        {
                                                            w8c_Taxttreaty.W8BEN_TaxTreaty.Add(w8_Taxtreaty);
                                                            if (w8c_Taxttreaty.SaveChanges() > 0)
                                                            {
                                                                wl.Writer("success client save W8BEN_TaxTreaty Step : " + fm.Step);
                                                                //fm.W8ID = w8_client.FormID;
                                                                rs.data = null;
                                                                rs.success = true;
                                                                rs.message = "success";

                                                                using (var w8c_cert = new OAOEntities())
                                                                {
                                                                    w8c_cert.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                                                    var w8_cert = new W8BEN_Certification()
                                                                    {
                                                                        FormID = w8_client.FormID,
                                                                        W8IamBeneficialOwner = true,
                                                                        W8IamNotUSPerson = true,
                                                                        W8IncomeRelate = true,
                                                                        W8IsTaxTreaty = true,
                                                                        W8BrokerTransactions = true,
                                                                        W8IAuthorize = true,
                                                                        CreatedDateTime = DateTime.Now,
                                                                        CreatedBy = "OAO phase 3 Form",
                                                                    };

                                                                    try
                                                                    {
                                                                        w8c_cert.W8BEN_Certification.Add(w8_cert);

                                                                        if (w8c_cert.SaveChanges() > 0)
                                                                        {
                                                                            wl.Writer("success client save W8BEN_Certification Step : " + fm.Step);
                                                                            fm.W8ID = w8_client.FormID;
                                                                            if (context.SaveChanges() > 0)
                                                                            {
                                                                                wl.Writer("success client save Tb_AccOpen Step : " + fm.Step);
                                                                                rs.data = null;
                                                                                rs.success = true;
                                                                                rs.message = "success";
                                                                            }
                                                                            else
                                                                            {
                                                                                rs.data = null;
                                                                                rs.success = false;
                                                                                rs.message = "failed";
                                                                                wl.Writer("failed client save Tb_AccOpen Step : " + fm.Step);
                                                                                return Json(rs, JsonRequestBehavior.AllowGet);
                                                                            }
                                                                        }
                                                                    }
                                                                    catch (Exception e)
                                                                    {
                                                                        var dt = new
                                                                        {
                                                                            message_error = "error_on_exception"
                                                                        };
                                                                        wl.Writer(e.Message + e.StackTrace);
                                                                        rs.data = dt;
                                                                        rs.success = false;
                                                                        rs.message = e.Message + e.StackTrace;
                                                                        return Json(rs, JsonRequestBehavior.AllowGet);
                                                                    }

                                                                }

                                                            }
                                                            else
                                                            {
                                                                rs.data = null;
                                                                rs.success = false;
                                                                rs.message = "failed W8BEN_TaxTreaty.Add";
                                                                return Json(rs, JsonRequestBehavior.AllowGet);
                                                            }
                                                        }
                                                        catch (Exception e)
                                                        {
                                                            var dt = new
                                                            {
                                                                message_error = "error_on_exception"
                                                            };
                                                            wl.Writer(e.Message + e.StackTrace);
                                                            rs.data = dt;
                                                            rs.success = false;
                                                            rs.message = e.Message + e.StackTrace;
                                                            return Json(rs, JsonRequestBehavior.AllowGet);
                                                        }

                                                    }
                                                }

                                            }

                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            return Json(rs, JsonRequestBehavior.AllowGet);
                                        }
                                    }


                                }

                            };
                            if(rs.success == true)
                            {
                                if (cl != null)
                                {
                                    cl.LastUpdateTime = DateTime.Now;
                                    cl.SameMailingAddress = param.same_As_residence; //----update
                                    //cl.ResidentialPostalCode = param.W8_residence_postalcode;
                                    try
                                    {
                                        if (new_context.SaveChanges() > 0)
                                        {
                                            wl.Writer("success client save Client_info Step : " + fm.Step);
                                            rs.data = null;
                                            rs.success = true;
                                            rs.message = "success";
                                            return Json(rs, JsonRequestBehavior.AllowGet);

                                            //if (context.SaveChanges() > 0)
                                            //{
                                            //    wl.Writer("success client save Tb_AccOpenRequest Step : " + fm.Step);

                                            //}
                                            //else
                                            //{
                                            //    rs.data = null;
                                            //    rs.success = false;
                                            //    rs.message = "failed";
                                            //    return Json(rs, JsonRequestBehavior.AllowGet);
                                            //}
                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client save Client_info Step : " + fm.Step);
                                        }
                                    }
                                    catch (Exception e)
                                    {
                                        var dt = new
                                        {
                                            message_error = "error_on_exception"
                                        };
                                        wl.Writer(e.Message + e.StackTrace);
                                        rs.data = dt;
                                        rs.success = false;
                                        rs.message = e.Message + e.StackTrace;
                                        return Json(rs, JsonRequestBehavior.AllowGet);
                                    }

                                }
                            }
                            

                        }
  
                    }
                }
            }
            catch (Exception e)
            {
                var dt = new
                {
                    message_error = "error_on_exception"
                };
                wl.Writer(e.Message + e.StackTrace);
                rs.data = dt;
                rs.success = false;
                rs.message = e.Message + e.StackTrace;
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public class Param_MailingAddress
        {
            public string MailingAddress1 { get; set; }
            public string MailingAddress2 { get; set; }
            public string MailingAddress3 { get; set; }
            public string MailingCountry { get; set; }
            public string MailingPostalCode { get; set; }

            public string ResidencePostalCode { get; set; }
            public bool SameMailingAddress { get; set; }
        }

        public bool Client_MailingAddr(Guid ClientInfoID, Param_MailingAddress param)
        {
            try
            {
                using (var cl_Addrcontext = new OAOEntities())
                {
                    cl_Addrcontext.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var cl = cl_Addrcontext.Tb_ClientInfo.SingleOrDefault(b => b.ID == ClientInfoID);
                    if(cl != null)
                    {
                        cl.MailingAddress1 = param.MailingAddress1;
                        cl.MailingAddress2 = param.MailingAddress2;
                        cl.MailingAddress3 = param.MailingAddress3;
                        cl.MailingCountry = param.MailingCountry;
                        cl.MailingPostalCode = param.MailingPostalCode;
                        cl.SameMailingAddress = param.SameMailingAddress;
                        cl.ResidentialPostalCode = param.ResidencePostalCode;

                        if(cl_Addrcontext.SaveChanges() > 0)
                        {
                            return true;
                        }
                    }
                }
                  
            }catch(Exception e)
            {

            }

            return false;
        }

    }
}