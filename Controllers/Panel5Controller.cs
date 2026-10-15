using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Controllers;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel5Controller : Controller
    {
        // GET: Panel5
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel5(Panel5 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using(var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step <= 5)
                        {
                            fm.Step = 4;
                        }
                        //fm.Step = 6;
                        //fm.LastStatusUpdatedTime = DateTime.Now;
                        fm.SubmitStatus = null;
                        fm.SubmittedDateTime = null;
                        var data = new
                        {
                            page = fm.Step,
                        };
                        rs.data = data;
                        using (var new_context = new OAOEntities())
                        {
                            new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            if (cl != null)
                            {
                                cl.AnnualIncomeLevel = param.Annual_Income;
                                cl.LiquidNetWorth = param.Liquid_Assets;
                                cl.EstimatedNetWorth = param.Net_Worth;
                                cl.EstimatedNetWorthOthers = param.Other_Net_Worth;
                                cl.PreviousIndustry = param.Previouse_Job_Industry;
                                

                                using (var soft_context = new OAOEntities())
                                {
                                    soft_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                    var tbse = soft_context.Tb_SOF.SingleOrDefault(_ => _.ID == cl.ID);
                                    if (tbse != null)
                                    {
                                        if(param.SavingFromSalary == 0)
                                        {
                                            tbse.SavingFromSalary = false;
                                            tbse.InvestmentEarning = false;
                                            tbse.InvestmentType = null;
                                            tbse.InvestmentTypeOthers = null;
                                            tbse.InvestmentAmount = null;
                                            tbse.InvestmentEarningAmount = null;
                                            tbse.InvestmentFundSource = null;
                                        }
                                        else
                                        {
                                            tbse.SavingFromSalary = param.SavingFromSalary == 1 ? true : false;
                                            tbse.InvestmentEarning = param.Investment_Earning == 1 ? true : false;
                                            tbse.InvestmentType = param.Investment_type != "" ? param.Investment_type : null;
                                            tbse.InvestmentTypeOthers = param.Other_Investment_Type != "" ? param.Other_Investment_Type : null;
                                            tbse.InvestmentAmount = param.Investment_Capital != "" ? param.Investment_Capital : null;
                                            tbse.InvestmentEarningAmount = param.Investment_Profit != "" ? param.Investment_Profit : null;
                                            tbse.InvestmentFundSource = param.Investment_Fund_Source != "" ? param.Investment_Fund_Source : null;
                                        }

                                        if(param.Previouse_Job == 0)
                                        {
                                            tbse.PreviousJobs = false;
                                            tbse.PreviousJobsIndustry = null;
                                            tbse.PreviousJobsIndustryOthers = null;
                                            tbse.PreviousJobsOccupation = null;
                                            tbse.PreviousJobsOccupationOthers = null;
                                            tbse.PreviousJobsEmployerCompanyName = null;
                                            tbse.PreviousJobsYearsOfService = 0;
                                            tbse.PreviousJobAnnualIncome = 0;
                                        }
                                        else
                                        {
                                            tbse.PreviousJobs = param.Previouse_Job == 1 ? true : false;
                                            tbse.PreviousJobsIndustry = param.Previouse_Job_Industry != "" ? param.Previouse_Job_Industry : null;
                                            tbse.PreviousJobsIndustryOthers = param.Previouse_Job_Other_Industry != "" ? param.Previouse_Job_Other_Industry : null;
                                            tbse.PreviousJobsOccupation = param.Previouse_Job_Occupation != "" ? param.Previouse_Job_Occupation : null;
                                            tbse.PreviousJobsOccupationOthers = param.Previouse_Job_Other_Occupation != "" ? param.Previouse_Job_Other_Occupation : null;
                                            tbse.PreviousJobsEmployerCompanyName = param.Previouse_Job_Company_Name != "" ? param.Previouse_Job_Company_Name : null;
                                            tbse.PreviousJobsYearsOfService = param.Previouse_Job_Year_Service != 0 ? param.Previouse_Job_Year_Service : 0;
                                            tbse.PreviousJobAnnualIncome = param.Prevouse_Job_Annual_Income != 0 ? param.Prevouse_Job_Annual_Income : 0;
                                        }
                                        
                                        if(param.Provided_Family == 0)
                                        {
                                            tbse.ProvidedByFamilyMember = false;
                                            tbse.RelationshipWithTheFamilyMember = null;
                                            tbse.FamilyMembersIndustry = null;
                                            tbse.FamilyMembersIndustryOthers = null;
                                            tbse.FamilyMembersOccupation = null;
                                            tbse.FamilyMembersOccupationOthers = null;
                                        }
                                        else
                                        {
                                            tbse.ProvidedByFamilyMember = param.Provided_Family == 1 ? true : false;
                                            tbse.RelationshipWithTheFamilyMember = param.Family_Relation != "" ? param.Family_Relation : null;
                                            tbse.FamilyMembersIndustry = param.Family_Industry != "" ? param.Family_Industry : null;
                                            tbse.FamilyMembersIndustryOthers = param.Family_Other_Industry != "" ? param.Family_Other_Industry : null;
                                            tbse.FamilyMembersOccupation = param.Family_Occupation != "" ? param.Family_Occupation : null;
                                            tbse.FamilyMembersOccupationOthers = param.Family_Other_Occupancy != "" ? param.Family_Other_Occupancy : null;
                                        }
                                        
                                        if(param.Rental_Income == 0)
                                        {
                                            tbse.RentalIncome = false;
                                            tbse.RentalHoldingPeriod = null;
                                            tbse.RentalAnnualIncome = null;
                                            tbse.RentalFundSource = null;
                                        }
                                        else
                                        {
                                            tbse.RentalIncome = param.Rental_Income == 1 ? true : false;
                                            tbse.RentalHoldingPeriod = param.Holding_Period_Properties != "" ? param.Holding_Period_Properties : null;
                                            tbse.RentalAnnualIncome = param.Annual_Rental_Income != "" ? param.Annual_Rental_Income : null;
                                            tbse.RentalFundSource = param.FundSource_Property_Acquisition != "" ? param.FundSource_Property_Acquisition : null;
                                        }
                                        
                                        if(param.Other == 0)
                                        {
                                            tbse.OtherIncome = false;
                                            tbse.OtherIncomeTextBox = null;
                                        }
                                        else
                                        {
                                            tbse.OtherIncome = param.Other == 1 ? true : false;
                                            tbse.OtherIncomeTextBox = param.Other_Description != "" ? param.Other_Description : null;
                                        }
                                        
                                        tbse.SubmitTime = DateTime.Now;
                                        tbse.B2BCompany = "PH";
                                        tbse.Version = "1.1";
                                        tbse.ParentForm = "OAOP3";

                                        fm.SubmitStatus = null;
                                        fm.SubmittedDateTime = null;
                                        if (soft_context.SaveChanges() > 0)
                                        {
                                            cl.SofVersion = 1;
                                            //cl.LastUpdateTime = DateTime.Now;
                                            //fm.LastLoginTime = DateTime.Now;
                                            rs.data = null;
                                            rs.success = true;
                                            rs.message = "success";
                                            wl.Writer("sucessfully client Tb_SOF save ID " + fm.ID + " Step : " + fm.Step);
                                        }
                                    }
                                    else
                                    {
                                        var tbs = new Tb_SOF
                                        {
                                            ID = Guid.NewGuid(),
                                            SavingFromSalary = param.SavingFromSalary == 1 ? true : false,
                                            InvestmentEarning = param.Investment_Earning == 1 ? true : false,
                                            InvestmentType = param.Investment_type,
                                            InvestmentTypeOthers = param.Other_Investment_Type,
                                            InvestmentAmount = param.Investment_Capital,
                                            InvestmentEarningAmount = param.Investment_Profit,
                                            InvestmentFundSource = param.Investment_Fund_Source,

                                            PreviousJobs = param.Previouse_Job == 1 ? true : false,
                                            PreviousJobsIndustry = param.Previouse_Job_Industry,
                                            PreviousJobsIndustryOthers = param.Previouse_Job_Other_Industry,
                                            PreviousJobsOccupation = param.Previouse_Job_Occupation,
                                            PreviousJobsOccupationOthers = param.Previouse_Job_Other_Occupation,
                                            PreviousJobsEmployerCompanyName = param.Previouse_Job_Company_Name,
                                            PreviousJobsYearsOfService = param.Previouse_Job_Year_Service,
                                            PreviousJobAnnualIncome = param.Prevouse_Job_Annual_Income,

                                            ProvidedByFamilyMember = param.Provided_Family == 1 ? true : false,
                                            RelationshipWithTheFamilyMember = param.Family_Relation,
                                            FamilyMembersIndustry = param.Family_Industry,
                                            FamilyMembersIndustryOthers = param.Family_Other_Industry,
                                            FamilyMembersOccupation = param.Family_Occupation,
                                            FamilyMembersOccupationOthers = param.Family_Other_Occupancy,

                                            RentalIncome = param.Rental_Income == 1 ? true : false,
                                            RentalHoldingPeriod = param.Holding_Period_Properties,
                                            RentalAnnualIncome = param.Annual_Rental_Income,
                                            RentalFundSource = param.FundSource_Property_Acquisition,

                                            OtherIncome = param.Other == 1 ? true : false,
                                            OtherIncomeTextBox = param.Other_Description,
                                            SubmitTime = DateTime.Now,
                                            B2BCompany = "PH",
                                            Version = "1.0",
                                            ParentForm = "OAOP3"
                                        };
                                        soft_context.Tb_SOF.Add(tbs);
                                        if (soft_context.SaveChanges() > 0)
                                        {
                                            cl.SofID = tbs.ID;
                                            cl.SofVersion = 1;
                                            //cl.LastUpdateTime = DateTime.Now;
                                            //fm.LastLoginTime = DateTime.Now;
                                            //rs.data = null;
                                            rs.success = true;
                                            rs.message = "success";
                                            wl.Writer("sucessfully client Tb_SOF save ID " + fm.ID + " Step : " + fm.Step);
                                        }
                                    }
                                }

                                if (new_context.SaveChanges() > 0)
                                {

                                    //rs.data = null;
                                    rs.success = true;
                                    rs.message = "success";
                                    wl.Writer("sucessfully client Tb_ClientInfo save ID " + fm.ID + " Step : " + fm.Step);
                                }
                                else
                                {
                                    rs.data = null;
                                    rs.success = false;
                                    rs.message = "failed";
                                    wl.Writer("failed client save Step : " + fm.Step);
                                }
                            }

                        }
                        if (context.SaveChanges() > 0)
                        {
                            wl.Writer("sucessfully client Tb_AccOpenRequest save ID " + fm.ID + " Step : " + fm.Step);
                        }
                        

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
    }
}