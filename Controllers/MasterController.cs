//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using OAO.Models;

//namespace OAO.Controllers
//{
//    public class MasterController : Controller
//    {
//        // GET: Master
//        public ActionResult Index()
//        {
//            return View();
//        }

//        public class result
//        {
//            public object data { get; set; }
//            public bool success { get; set; }
//            public string message { get; set; }

//        }

//        [HttpPost]
//        public JsonResult InsertIndustry(string Industry_Name)
//        {
//            using(var context = new OAOEntities())
//            {
//                var industries = new Master_Industry()
//                {
//                    Industry_Name = Industry_Name
//                };

//                context.Master_Industry.Add(industries);
//                var res = new result();
//                if (context.SaveChanges() > 0)
//                {
//                    res.data = null;
//                    res.success = true;
//                    res.message = "Success Add data";
//                    return Json(res);
//                }
//                else
//                {
//                    res.data = null;
//                    res.success = false;
//                    res.message = "Failed Add data";
//                    return Json(res);
//                }
            
//            }
//        }

//        public JsonResult InsertEmployment(string Industry_Name)
//        {
//            using (var context = new OAOEntities())
//            {
//                var empl = new Master_Employment()
//                {
//                    Employment_Name = Industry_Name
//                };

//                context.Master_Employment.Add(empl);
//                var res = new result();
//                if (context.SaveChanges() > 0)
//                {
//                    res.data = null;
//                    res.success = true;
//                    res.message = "Success Add data";
//                    return Json(res);
//                }
//                else
//                {
//                    res.data = null;
//                    res.success = false;
//                    res.message = "Failed Add data";
//                    return Json(res);
//                }

//            }
//        }

//        public JsonResult InsertOccupation(string Industry_Name)
//        {
//            using (var context = new OAOEntities())
//            {
//                var occ = new Master_Occupation()
//                {
//                    Occupation_EN = Industry_Name
//                };

//                context.Master_Occupation.Add(occ);
//                var res = new result();
//                if (context.SaveChanges() > 0)
//                {
//                    res.data = null;
//                    res.success = true;
//                    res.message = "Success Add data";
//                    return Json(res);
//                }
//                else
//                {
//                    res.data = null;
//                    res.success = false;
//                    res.message = "Failed Add data";
//                    return Json(res);
//                }

//            }
//        }

//        public JsonResult InsertOwnership(string Industry_Name)
//        {
//            using (var context = new OAOEntities())
//            {
//                var occ = new Master_Ownership()
//                {
//                    Ownership_desc_EN = Industry_Name
//                };

//                context.Master_Ownership.Add(occ);
//                var res = new result();
//                if (context.SaveChanges() > 0)
//                {
//                    res.data = null;
//                    res.success = true;
//                    res.message = "Success Add data";
//                    return Json(res);
//                }
//                else
//                {
//                    res.data = null;
//                    res.success = false;
//                    res.message = "Failed Add data";
//                    return Json(res);
//                }

//            }
//        }

//        public JsonResult InsertCountry(Master_CountryList param)
//        {
//            using (var context = new OAOEntities())
//            {
//                var occ = new Master_Country()
//                {
//                   Country_Code = param.Country_Code,
//                   Country_Name = param.Country_Name,
//                   Currency_Code = param.Currency_Code,
//                   Currency_Name = param.Currency_Name,
//                   Currency_Symbol = param.Currency_Symbol,
//                   Phone_Code = param.Phone_Code,
                    
//                };

//                context.Master_Country.Add(occ);
//                var res = new result();
//                if (context.SaveChanges() > 0)
//                {
//                    res.data = null;
//                    res.success = true;
//                    res.message = "Success Add data";
//                    return Json(res);
//                }
//                else
//                {
//                    res.data = null;
//                    res.success = false;
//                    res.message = "Failed Add data";
//                    return Json(res);
//                }

//            }
//        }

//        [HttpPost]
//        public JsonResult GetAllData()
//        {

//            using(var context = new OAOEntities())
//            {
//                IList<Master_Country> country = context.Master_Country.AsNoTracking().ToList <Master_Country>();
//                IList<Master_Industry> industry = context.Master_Industry.AsNoTracking().ToList<Master_Industry>();
//                IList<Master_Employment> employment = context.Master_Employment.AsNoTracking().ToList<Master_Employment>();
//                IList<Master_Occupation> occupation = context.Master_Occupation.AsNoTracking().ToList<Master_Occupation>();
//                IList<Master_Ownership> ownership = context.Master_Ownership.AsNoTracking().ToList<Master_Ownership>();
//                IList<Master_Income> income = context.Master_Income.AsNoTracking().ToList<Master_Income>();
//                IList<Master_Net_Worth> net_worth = context.Master_Net_Worth.AsNoTracking().ToList<Master_Net_Worth>();
//                IList<Master_Family_Relationship> family_relationships = context.Master_Family_Relationship.AsNoTracking().ToList<Master_Family_Relationship>();
//                IList<Master_Investment_Type> investment_type = context.Master_Investment_Type.AsNoTracking().ToList<Master_Investment_Type>();
//                IList<Investment_Fund_Source> investment_fund_source = context.Investment_Fund_Source.AsNoTracking().ToList<Investment_Fund_Source>();
//                IList<Master_Year_Experience> year_exp = context.Master_Year_Experience.AsNoTracking().ToList<Master_Year_Experience>();
//                var data = new
//                {
//                    data_country = country,
//                    data_industry = industry,
//                    data_employment = employment,
//                    data_occupation = occupation,
//                    data_ownership = ownership,
//                    data_income = income,
//                    data_net_woth = net_worth, 
//                    data_family_relationships = family_relationships,
//                    data_investment_type = investment_type,
//                    data_investment_fund_source = investment_fund_source,
//                    data_year_experience = year_exp,
//                };
//                return Json(data, JsonRequestBehavior.AllowGet);
//            }
//        }



//    }
//}