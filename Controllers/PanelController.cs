//using System;
//using AutoMapper;
//using System.IO;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Web.Mvc;
//using System.Web.UI.WebControls;
//using System.Globalization;
//using System.Threading.Tasks;
//using System.Collections.Concurrent;
//using OAO.datahelper;
//using OAO.Models;
//using OAO.BLL.Form.Model;
//using OAO.BLL.PaneL.Model;
//using OAO.BLL.Form.FormLogic;
//using OAO.BLL.PaneL.Logic;

//namespace OAO.Controllers
//{
//    public class PanelController : Controller
//    {
//        // GET: Panel
//        private IMapper _mapper;
//        private FormLogic _formbll;
//        private PanelLogic _panelbll;
//        public PanelController()
//        {
//            BaseMapper basemap = new BaseMapper();
//            _mapper = basemap._mapper;
//            _formbll = new FormLogic();
//            _panelbll = new PanelLogic();
//        }

//        public class result
//        {
//            public object data { get; set; }
//            public bool success { get; set; }
//            public string message { get; set; }

//        }

//        public JsonResult GetPanel(string data)
//        {
//            EncryptDecrypt cript = new EncryptDecrypt();
//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                context.Configuration.ProxyCreationEnabled = false;
//                int id = Int32.Parse(cript.DecryptString(data));
//                var rs = _formbll.Get(_ => _.ID_Form == id);
//                var result = _mapper.Map<OAO_Form_List>(rs.Data);

//                var pn = _panelbll.Get(_ => _.ID_Form == id);
//                var pnl = _mapper.Map<OAO_Panel_List>(pn.Data);
//                var pj = context.Previouse_Job.SingleOrDefault(_ => _.ID_Form == id);
//                var fm = context.Provided_Family.SingleOrDefault(_ => _.ID_Form == id);
//                var iv = context.Investment_Earning.SingleOrDefault(_ => _.ID_Form == id);
//                var ri = context.Rental_Income.SingleOrDefault(_ => _.ID_Form == id);
//                var ib = context.Investments_Objective.SingleOrDefault(_ => _.ID_Form == id);
//                result.Previouse_Job_ = pj;
//                result.Provided_Family_ = fm;
//                result.investment_Earning_ = iv;
//                result.Rental_Income_ = ri;
//                result.Investments_Objective_ = ib;
//                //var data1 = _mapper.Map<OAO_Form, OAO_Form_List>(rs);

//                var dt = new
//                {
//                    form = result,
//                    panel = pnl,
//                };

//                if (rs != null && pnl != null)
//                {
//                    if (rs != null && pnl != null)
//                    {
//                        res.data = dt;
//                        res.success = true;
//                        res.message = "success";

//                        return Json(res);
//                    }
//                    else
//                    {

//                        res.data = null;
//                        res.success = false;
//                        res.message = "Fail";
//                    }
//                }
//                else
//                {

//                    res.data = null;
//                    res.success = false;
//                    res.message = "Fail";
//                }
//            }
//            return Json(res);
//        }

//        public result SavePanel(int panel, int ID, string sts, string email)
//        {
//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                if (ID != 0)
//                {
//                    var rs = context.OAO_Panel.SingleOrDefault(b => b.ID_Form == ID);
//                    if (rs != null)
//                    {
//                        rs.Panel_Location = panel;
//                        rs.Status_Panel = sts;
//                        rs.Date_LastUpdate = DateTime.Now;
//                        if (context.SaveChanges() > 0)
//                        {
//                            var dtid = new
//                            {
//                                ID_Panel = rs.ID_Panel,
//                            };

//                            res.data = dtid;
//                            res.success = true;
//                            res.message = "success";
//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "fail";
//                        }
//                    }
//                    else
//                    {
//                        var pnl = new OAO_Panel()
//                        {

//                            Panel_Location = panel,
//                            Status_Panel = sts,
//                            Date_Create = DateTime.Now,
//                            Date_LastUpdate = DateTime.Now,
//                            ID_Form = ID
//                        };

//                        context.OAO_Panel.Add(pnl);
//                        if (context.SaveChanges() > 0)
//                        {
//                            EncryptDecrypt cript = new EncryptDecrypt();
//                            string param = "?paramid=" + cript.EncryptString((pnl.ID_Form).ToString());
//                            string m = string.Format("{0}://{1}{2}", Request.Url.Scheme, Request.Url.Authority, param);
//                            EmailController mail = new EmailController();
//                            mail.SendEmailTemplate(m, "Email Url form access", "Email url Access", email, "test");
//                            res.success = true;
//                            res.message = "success";
//                        }
//                        else
//                        {
//                            res.success = false;
//                            res.message = "fail";
//                        }
//                    }
//                }
//                else
//                {
//                    var pnl = new OAO_Panel()
//                    {
//                        ID_Form = ID,
//                        Date_LastUpdate = DateTime.Now,
//                        Date_Create = DateTime.Now,
//                    };

//                    context.OAO_Panel.Add(pnl);
//                    if (context.SaveChanges() > 0)
//                    {
//                        var dtid = new
//                        {
//                            ID_Panel = pnl.ID_Panel,
//                        };

//                        res.data = dtid;
//                        res.success = true;
//                        res.message = "success";
//                    }
//                    else
//                    {
//                        res.data = null;
//                        res.success = false;
//                        res.message = "fail";
//                    }

//                }
//            }

//            return res;
//        }



//        [HttpPost]
//        public JsonResult SaveDraftPanel1(Panel1 param)
//        {
//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                if (param.ID_Form != 0)
//                {
//                    var rs = context.OAO_Form.SingleOrDefault(b => b.ID_Form == param.ID_Form);
//                    if (rs != null)
//                    {
//                        rs.ISMAINLAND = param.ISMAINLAND;
//                        rs.Email = param.Email;
//                        rs.Phone_Number = param.Phone_Number;
//                        rs.Phone_Code = param.Phone_Code;
//                        if (context.SaveChanges() > 0)
//                        {
//                            res.data = null;
//                            res.success = true;
//                            res.message = "Success Updated data";

//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "Failed Updated data";

//                        }

//                    }
//                }
//                else
//                {
//                    var form = new OAO_Form()
//                    {
//                        Email = param.Email,
//                        ISMAINLAND = param.ISMAINLAND,
//                        Phone_Number = param.Phone_Number,
//                        Phone_Code = param.Phone_Code,
//                    };

//                    context.OAO_Form.Add(form);

//                    if (context.SaveChanges() > 0)
//                    {

//                        int ID = (int)form.ID_Form;
//                        var addpanel = SavePanel(1, ID, "Draft", form.Email);
//                        if (addpanel.success)
//                        {
//                            var frm = new
//                            {
//                                ID_Form = ID,
//                            };
//                            res.data = frm;
//                            res.success = true;
//                            res.message = "Success Add data";
//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "Failed Add data";
//                        }

//                    }
//                    else
//                    {
//                        res.data = null;
//                        res.success = false;
//                        res.message = "Failed Add data";

//                    }
//                }

//                return Json(res);

//            }
//        }
//        [HttpPost]
//        public JsonResult SaveDraftPanel3(Panel3 param)
//        {
//            //return Json("masuk");
//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                if (param.ID_Form != 0)
//                {
//                    var rs = context.OAO_Form.SingleOrDefault(b => b.ID_Form == param.ID_Form);
//                    if (rs != null)
//                    {
//                        rs.Promotion_Code = param.Promotion_Code;
//                        rs.Surename = param.Surename;
//                        rs.Title = param.Title;
//                        rs.First_Name = param.FirstName;
//                        rs.Nationality = param.Nationality;
//                        rs.ID_Card = param.ID_Card;
//                        rs.Place_of_Issue = param.Place_Issue;
//                        rs.Country_of_Birth = param.Country_Birth;
//                        rs.Date_of_Birth = param.Date_Birth;
//                        rs.Age = param.Age;
//                        rs.Phone_Number = param.Mobile_number;
//                        rs.Home_Number = param.Home_number;
//                        rs.Office_Number = param.Office_Number;
//                        rs.Wechat_ID = param.Wechat_ID;
//                        rs.Home_Area_Number = param.Home_Area_Number;
//                        rs.Office_Area_Number = param.Office_Area_Number;
//                        rs.AECODE = param.AECODE;
//                        rs.AENAME = param.AENAME;
//                        if (context.SaveChanges() > 0)
//                        {
//                            var updatepanel = SavePanel(3, rs.ID_Form, "Draft", "");
//                            if (updatepanel.success)
//                            {
//                                res.data = null;
//                                res.success = true;
//                                res.message = "Success Updated data";
//                                return Json(res);
//                            }
//                            else
//                            {
//                                res.data = null;
//                                res.success = false;
//                                res.message = "Failed Updated data";
//                                return Json(res);
//                            }

//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "Failed Updated data";
//                            return Json(res);
//                        }

//                    }
//                }

//                return Json(res);

//            }
//        }

//        [HttpPost]
//        public JsonResult SaveDraftPanel4(Panel4 param)
//        {
//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                if (param.ID_Form != 0)
//                {
//                    var rs = context.OAO_Form.SingleOrDefault(b => b.ID_Form == param.ID_Form);
//                    if (rs != null)
//                    {
//                        rs.Residential_Country = param.Residential_Country;
//                        rs.Residential_Address = param.Residential_Address;
//                        rs.Ownershio_of_Residence = param.Ownership_Residence;
//                        rs.Employment_Type = param.Employment_Type;
//                        rs.Industry = param.Industry;
//                        rs.Occupation = param.Occupation;
//                        rs.Other_Occupation = param.Other_Occupation;
//                        rs.Employer_Company_Name = param.Employer_Company_Name;
//                        rs.Office_Address1 = param.Office_Address1;
//                        rs.Office_Address2 = param.Office_Address2;
//                        rs.Office_Address3 = param.Office_Address3;
//                        rs.Office_Region = param.Office_Region;
//                        rs.Years_of_Service = param.Years_Of_Service;
//                        rs.Ownershio_of_Residence = param.Ownership_Residence;

//                        if (context.SaveChanges() > 0)
//                        {
//                            var updatepanel = SavePanel(4, rs.ID_Form, "Draft", "");
//                            if (updatepanel.success)
//                            {
//                                res.data = null;
//                                res.success = true;
//                                res.message = "Success Updated data";
//                                return Json(res);
//                            }
//                            else
//                            {
//                                res.data = null;
//                                res.success = false;
//                                res.message = "Failed Updated data";
//                                return Json(res);
//                            }

//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "Failed Updated data";
//                            return Json(res);
//                        }

//                    }
//                }

//                return Json(res);

//            }

//        }

//        [HttpPost]
//        public JsonResult SaveDraftPanel5(Panel5 param)
//        {

//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                if (param.ID_Form != 0)
//                {
//                    var rs = context.OAO_Form.SingleOrDefault(b => b.ID_Form == param.ID_Form);
//                    if (rs != null)
//                    {
//                        rs.Annual_Income = param.Annual_Income;
//                        rs.LIquid_Assets = param.Liquid_Assets;
//                        rs.Net_Worth = param.Net_Worth;
//                        rs.Other_Net_Worth = param.Other_Net_Worth;
//                        rs.Is_Previouse_Job = param.Previouse_Job;
//                        rs.Is_Provided_Family = param.Provided_Family;
//                        rs.Is_Rental_Income = param.Rental_Income;
//                        rs.Is_Investment_Earning = param.Investment_Earning;
//                        rs.Other = param.Other_Description;

//                        if (context.SaveChanges() > 0)
//                        {
//                            res.data = null;
//                            res.success = true;
//                            res.message = "Success Updated data";
//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "no Updated data";

//                        }
//                        var updatepanel = SavePanel(5, rs.ID_Form, "Draft", "");
//                        if (updatepanel.success)
//                        {
//                            var pj = context.Previouse_Job.SingleOrDefault(_ => _.ID_Form == param.ID_Form);
//                            if (pj != null)
//                            {
//                                pj.Industry = param.Previouse_Job_Industry;
//                                pj.Other_Industry = param.Previouse_Job_Other_Industry;
//                                pj.Occupation = param.Previouse_Job_Occupation;
//                                pj.Other_Occupation = param.Previouse_Job_Other_Occupation;
//                                pj.Employer_Company_Name = param.Previouse_Job_Company_Name;
//                                pj.Annual_Income = param.Prevouse_Job_Annual_Income;
//                                pj.Year_of_Service = param.Previouse_Job_Year_Service;
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }
//                            }
//                            else
//                            {
//                                var _ = new Previouse_Job()
//                                {
//                                    ID_Form = param.ID_Form,
//                                    Industry = param.Previouse_Job_Industry,
//                                    Other_Industry = param.Previouse_Job_Other_Industry,
//                                    Occupation = param.Previouse_Job_Occupation,
//                                    Other_Occupation = param.Previouse_Job_Other_Occupation,
//                                    Employer_Company_Name = param.Previouse_Job_Company_Name,
//                                    Annual_Income = param.Prevouse_Job_Annual_Income,
//                                    Year_of_Service = param.Previouse_Job_Year_Service,
//                                };
//                                context.Previouse_Job.Add(_);
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }
//                            }

//                            var pb = context.Provided_Family.SingleOrDefault(_ => _.ID_Form == param.ID_Form);
//                            if (pb != null)
//                            {
//                                pb.Family_Occupation = param.Family_Occupation;
//                                pb.Other_Occupation = param.Family_Other_Industry;
//                                pb.Family_Industry = param.Family_Industry;
//                                pb.Other_Industry = param.Family_Other_Industry;
//                                pb.Relation_Family = param.Family_Relation;
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";
//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";
//                                }
//                            }
//                            else
//                            {
//                                var _ = new Provided_Family()
//                                {
//                                    ID_Form = param.ID_Form,
//                                    Family_Occupation = param.Family_Occupation,
//                                    Other_Occupation = param.Family_Other_Industry,
//                                    Family_Industry = param.Family_Industry,
//                                    Other_Industry = param.Family_Other_Industry,
//                                    Relation_Family = param.Family_Relation,

//                                };
//                                context.Provided_Family.Add(_);
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }
//                            }

//                            var ie = context.Investment_Earning.SingleOrDefault(_ => _.ID_Form == param.ID_Form);
//                            if (ie != null)
//                            {
//                                ie.Investment_Fund_Source = param.Investment_Fund_Source;
//                                ie.Investment_Capital = param.Investment_Capital;
//                                ie.Investment_Profit = param.Investment_Profit;
//                                ie.Investment_Type = param.Investment_type;
//                                ie.Other_Investment_Type = param.Other_Investment_Type;
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }
//                            }
//                            else
//                            {
//                                var _ = new Investment_Earning()
//                                {
//                                    ID_Form = param.ID_Form,
//                                    Investment_Fund_Source = param.Investment_Fund_Source,
//                                    Investment_Capital = param.Investment_Capital,
//                                    Investment_Profit = param.Investment_Profit,
//                                    Investment_Type = param.Investment_type,
//                                    Other_Investment_Type = param.Other_Investment_Type

//                                };
//                                context.Investment_Earning.Add(_);
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }
//                            }

//                            var ri = context.Rental_Income.SingleOrDefault(_ => _.ID_Form == param.ID_Form);
//                            if (ri != null)
//                            {
//                                ri.Holding_Period_Properties = param.Holding_Period_Properties;
//                                ri.Annual_Rental_Income = param.Annual_Rental_Income;
//                                ri.FundSource_Property_Acquisition = param.FundSource_Property_Acquisition;
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }
//                            }
//                            else
//                            {
//                                var m = new Rental_Income()
//                                {
//                                    ID_Form = param.ID_Form,
//                                    FundSource_Property_Acquisition = param.FundSource_Property_Acquisition,
//                                    Holding_Period_Properties = param.Holding_Period_Properties,
//                                    Annual_Rental_Income = param.Annual_Rental_Income,
//                                };
//                                context.Rental_Income.Add(m);
//                                if (context.SaveChanges() > 0)
//                                {
//                                    res.data = null;
//                                    res.success = true;
//                                    res.message = "Success Updated data";

//                                }
//                                else
//                                {
//                                    res.data = null;
//                                    res.success = false;
//                                    res.message = "no Updated data";

//                                }

//                            }
//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "no Updated data";

//                        }


//                    }
//                }

//                return Json(res);

//            }
//        }

//        [HttpPost]
//        public JsonResult SaveDraftPanel6(Panel6 param)
//        {
//            var res = new result();
//            using (var context = new OAOEntities())
//            {
//                var rs = context.OAO_Form.SingleOrDefault(b => b.ID_Form == param.ID_Form);
//                if(rs != null)
//                {
//                    rs.Listed_Securities = param.Listed_Securities;
//                    rs.Future_Options = param.Future_Option;
//                    rs.Leverage_Foreign_Exchange = param.Leverage_foreign_Exchange;
//                    rs.Unit_Trust_Bonds = param.Unit_Trust_Bond;
//                    rs.Structured_Product = param.Structured_Product;
//                    rs.Leveraged_Inverse_Product = param.Leverage_Inverse_product;
//                    rs.CBBC_Warrants = param.CBBC_Warant;
//                    if (context.SaveChanges() > 0)
//                    {
//                        res.data = null;
//                        res.success = true;
//                        res.message = "Success Updated data";
//                    }
//                    else
//                    {
//                        res.data = null;
//                        res.success = false;
//                        res.message = "no Updated data";

//                    }
//                    var updatepanel = SavePanel(6, rs.ID_Form, "Draft", "");
//                    if (updatepanel.success)
//                    {
//                        res.data = null;
//                        res.success = true;
//                        res.message = "Success Updated data";
//                    }
//                    else
//                    {
//                        res.data = null;
//                        res.success = false;
//                        res.message = "no Updated data";

//                    }
//                    var iob = context.Investments_Objective.SingleOrDefault(_ => _.ID_Form == param.ID_Form);
//                    if(iob != null)
//                    {
//                        iob.Is_Capital_Appreciation = param.Capital_Appreciation;
//                        iob.Is_Generating_Income = param.Generating_Income;
//                        iob.Is_Hedging = param.Hedging;
//                        iob.Is_Speculation = param.Speculation;
//                        if(context.SaveChanges() > 0)
//                        {
//                            res.data = null;
//                            res.success = true;
//                            res.message = "Success Updated data";
//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "no Updated data";

//                        }
//                    }
//                    else
//                    {
//                        var ib = new Investments_Objective()
//                        {
//                            ID_Form = param.ID_Form,
//                            Is_Capital_Appreciation = param.Capital_Appreciation,
//                            Is_Generating_Income = param.Generating_Income,
//                            Is_Hedging = param.Hedging,
//                            Is_Speculation = param.Speculation,
//                        };
//                        context.Investments_Objective.Add(ib);
//                        if(context.SaveChanges() > 0)
//                        {
//                            res.data = null;
//                            res.success = true;
//                            res.message = "Success Updated data";
//                        }
//                        else
//                        {
//                            res.data = null;
//                            res.success = false;
//                            res.message = "no Updated data";

//                        }
//                    }
//                }
//            }
//                return Json(res);
//        }

//        [HttpPost]
//        public JsonResult SaveDraftPanel8(Panel8 param)
//        {
//            int q1, q2, q3, q5, q6, q7, q8;
//            int q4 = 0;
//            q1 = populate_score(1, param.Question1);
//            q2 = populate_score(2, param.Question2);
//            q3 = populate_score(3, param.Question3);
//            foreach(var dt in param.Question4)
//            {
//                q4 = q4 + populate_score(4, dt);
//            }
//            q5 = populate_score(5, param.Question5);
//            q6 = populate_score(6, param.Question6);
//            q7 = populate_score(7, param.Question7);
//            q8 = populate_score(8, param.Question8);

//            var total = (q1 + q2 + q3 + q4) + q5 + q6 + q7 + q8;
//            return Json(total);
//        }

//        public int populate_score(int qst, string val)
//        {
//            int score;
//            switch (qst)
//            {
//                case 1:
//                    switch (val)
//                    {
//                        case "a":
//                            return 0;
//                            break;
//                        case "b":
//                            return 0;
//                            break;
//                        case "c":
//                            return 0;
//                            break;
//                    }

//                    break;
//                case 2:
//                    switch (val)
//                    {
//                        case "a":
//                            return -20;
//                            break;
//                        case "b":
//                            return 0;
//                            break;
//                        case "c":
//                            return 0;
//                            break;
//                    }
//                    break;
//                case 3:
//                    switch (val)
//                    {
//                        case "a":
//                            return -10;
//                            break;
//                        case "b":
//                            return 0;
//                            break;
//                        case "c":
//                            return 0;
//                            break;
//                    }
//                    break;
//                case 4:
//                    switch (val)
//                    {
//                        case "a":
//                            return -10;
//                            break;
//                        case "b":
//                            return 0;
//                            break;
//                        case "c":
//                            return 0;
//                            break;
//                    }
//                    break;
//                case 5:
//                    switch (val)
//                    {
//                        case "a":
//                            return 65;
//                            break;
//                        case "b":
//                            return 50;
//                            break;
//                        case "c":
//                            return 20;
//                            break;
//                    }
//                    break;
//                case 6:
//                    switch (val)
//                    {
//                        case "a":
//                            return 0;
//                            break;
//                        case "b":
//                            return -10;
//                            break;
//                        case "c":
//                            return -20;
//                            break;
//                        case "d":
//                            return -25;
//                            break;
//                    }
//                    break;
//                case 7:
//                    switch (val)
//                    {
//                        case "a":
//                            return 10;
//                            break;
//                        case "b":
//                            return 0;
//                            break;
//                        case "c":
//                            return -10;
//                            break;

//                    }
//                    break;
//                case 8:
//                    switch (val)
//                    {
//                        case "a":
//                            return 5;
//                            break;
//                        case "b":
//                            return 15;
//                            break;
//                        case "c":
//                            return 20;
//                            break;
//                        case "d":
//                            return 25;
//                            break;
//                    }
//                    break;
//            }
//            return 0;
//        }
//    }
//}