using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OAO.Models;

namespace OAO.Controllers
{
    public class Panel7Controller : Controller
    {
        // GET: Panel7
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult saveUpdatePanel7(Panel8 param)
        {
            result rs = new result();
            WriteLog wl = new WriteLog();
            try
            {
                using (var context = new OAOEntities())
                {
                    context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    var fm = context.Tb_AccOpenRequest.SingleOrDefault(b => b.ID == param.ID_Form);

                    if (fm != null)
                    {
                        if (fm.Step <= 7)
                        {
                            fm.Step = 6;
                        }
                        //fm.Step = 9;

                        fm.LastStatusUpdatedTime = DateTime.Now;


                        using (var new_context = new OAOEntities())
                        {
                            new_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                            var cl = new_context.Tb_ClientInfo.SingleOrDefault(b => b.ID == fm.ClientInfoID);
                            using (var rpq_context = new OAOEntities())
                            {
                                rpq_context.Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                                var rpq = rpq_context.Tb_RPQForm.SingleOrDefault(_ => _.ID == fm.RPQID);
                                if (rpq != null)
                                {

                                    string[] val4 = param.Question4.ToCharArray().Select(c => c.ToString()).ToArray();
                                    var scr = 0;
                                    if (val4.Length == 1 && val4[0] == "A")
                                    {
                                        if (val4[0] == "A")
                                        {
                                            scr = -10;
                                        }
                                    }
                                    else
                                    {
                                        foreach (string vl in val4)
                                        {
                                            var v4 = populate_score(4, vl);
                                            scr = scr + v4;
                                        }
                                    }
                                    var total = 0;
                                    if (populate_score(1, param.Question1) + populate_score(2, param.Question2) + populate_score(3, param.Question3) + scr > 0)
                                    {
                                        total = 0;
                                    }
                                    else
                                    {
                                        total = populate_score(1, param.Question1) + populate_score(2, param.Question2) + populate_score(3, param.Question3) + scr;
                                    }
                                    total = (total + populate_score(5, param.Question5) + populate_score(6, param.Question6) + populate_score(7, param.Question7) + populate_score(8, param.Question8));
                                    rpq.Q1 = param.Question1;
                                    rpq.Q1Score = populate_score(1, param.Question1);
                                    rpq.Q2 = param.Question2;
                                    rpq.Q2Score = populate_score(2, param.Question2);
                                    rpq.Q3 = param.Question3;
                                    rpq.Q3Score = populate_score(3, param.Question3);
                                    rpq.Q4 = param.Question4;
                                    rpq.Q4Score = scr;
                                    rpq.Q5 = param.Question5;
                                    rpq.Q5Score = populate_score(5, param.Question5);
                                    rpq.Q6 = param.Question6;
                                    rpq.Q6Score = populate_score(6, param.Question6);
                                    rpq.Q7 = param.Question7;
                                    rpq.Q7Score = populate_score(7, param.Question7);
                                    rpq.Q8 = param.Question8;
                                    rpq.Q8Score = populate_score(8, param.Question8);
                                    rpq.RPQScore = total;
                                    rpq.B2BCompany = "PH";
                                    rpq.Status = 1;
                                    rpq.SubmitTime = DateTime.Now;
                                    rpq.LastUpdateTime = DateTime.Now;
                                    rpq.RPQLevel = populateLevel(total);
                                    rpq.Accode = "0";
                                    rpq.Version = "Phase 2";
                                    rpq.ParentForm = "OAO Phase 3";

                                    if (rpq_context.SaveChanges() > 0)
                                    {
                                        fm.LastLoginTime = DateTime.Now;
                                        fm.SubmitStatus = null;
                                        fm.SubmittedDateTime = null;
                                        if (context.SaveChanges() > 0)
                                        {
                                            var dt = new
                                            {
                                                data = rpq.ID,
                                                page = fm.Step
                                            };
                                            rs.data = dt;
                                            rs.success = true;
                                            rs.message = "success";
                                            wl.Writer("sucessfully client Tb_RPQForm save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client Tb_RPQForm save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                        }
                                    }
                                }
                                else
                                {

                                    string[] val4 = param.Question4.ToCharArray().Select(c => c.ToString()).ToArray();
                                    var scr = 0;
                                    if (val4.Length == 1 && val4[0] == "A")
                                    {
                                        if (val4[0] == "A")
                                        {
                                            scr = -10;
                                        }
                                    }
                                    else
                                    {
                                        foreach (string vl in val4)
                                        {
                                            var v4 = populate_score(4, vl);
                                            scr = scr + v4;
                                        }
                                    }
                                    var total = 0;
                                    if (populate_score(1, param.Question1) + populate_score(2, param.Question2) + populate_score(3, param.Question3) + scr > 0)
                                    {
                                        total = 0;
                                    }
                                    else
                                    {
                                        total = populate_score(1, param.Question1) + populate_score(2, param.Question2) + populate_score(3, param.Question3) + scr;
                                    }

                                    total = (total + populate_score(5, param.Question5) + populate_score(6, param.Question6) + populate_score(7, param.Question7) + populate_score(8, param.Question8));
                                    var rp = new Tb_RPQForm()
                                    {
                                        ID = Guid.NewGuid(),
                                        Q1 = param.Question1,
                                        Q1Score = populate_score(1, param.Question1),
                                        Q2 = param.Question2,
                                        Q2Score = populate_score(2, param.Question2),
                                        Q3 = param.Question3,
                                        Q3Score = populate_score(3, param.Question3),
                                        Q4 = param.Question4,
                                        Q4Score = scr,
                                        Q5 = param.Question5,
                                        Q5Score = populate_score(5, param.Question5),
                                        Q6 = param.Question6,
                                        Q6Score = populate_score(6, param.Question6),
                                        Q7 = param.Question7,
                                        Q7Score = populate_score(7, param.Question7),
                                        Q8 = param.Question8,
                                        Q8Score = populate_score(8, param.Question8),
                                        RPQScore = total,
                                        B2BCompany = "PH",
                                        Status = 1,
                                        SubmitTime = DateTime.Now,
                                        LastUpdateTime = DateTime.Now,
                                        RPQLevel = populateLevel(total),
                                        Accode = "0",
                                        Version = "Phase 2",
                                        ParentForm = "OAO Phase 3",
                                    };

                                    rpq_context.Tb_RPQForm.Add(rp);
                                    if (rpq_context.SaveChanges() > 0)
                                    {

                                        fm.RPQID = rp.ID;
                                        fm.LastLoginTime = DateTime.Now;
                                        if (context.SaveChanges() > 0)
                                        {
                                            var dt = new
                                            {
                                                data = rp.ID,
                                                page = fm.Step
                                            };
                                            rs.data = dt;

                                            rs.success = true;
                                            rs.message = "success";
                                            wl.Writer("successfully client Tb_RPQForm save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                        }
                                        else
                                        {
                                            rs.data = null;
                                            rs.success = false;
                                            rs.message = "failed";
                                            wl.Writer("failed client Tb_RPQForm save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                        }
                                    }
                                }

                            };
                            if (cl != null)
                            {
                                cl.LastUpdateTime = DateTime.Now;

                                if (new_context.SaveChanges() > 0)
                                {

                                    //rs.data = null;
                                    rs.success = true;
                                    rs.message = "success";
                                    wl.Writer("success client Tb_ClientInfo save FormID " + param.ID_Form + "  Step : " + fm.Step);
                                }
                                else
                                {
                                    rs.data = null;
                                    rs.success = false;
                                    rs.message = "failed";
                                    wl.Writer("failed client Tb_ClientInfo save FormID " + param.ID_Form + "  Step : " + fm.Step);
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

        public int populateLevel(int score)
        {
            int scr = 0;
            if (score <= 40)
            {
                scr = 1;
            }
            else if (score >= 41 && score <= 70)
            {
                scr = 2;
            }
            else if (score > 70)
            {
                scr = 3;
            }
            return scr;
        }
        public int populate_score(int qst, string val)
        {
            //int score;
            int dt = 0;
            switch (qst)
            {
                case 1:
                    switch (val)
                    {
                        case "A":
                            dt = 0;
                            break;
                        case "B":
                            dt = 0;
                            break;
                        case "C":
                            dt = 0;
                            break;
                    }

                    break;
                case 2:
                    switch (val)
                    {
                        case "A":
                            dt = -20;
                            break;
                        case "B":
                            dt = 0;
                            break;
                        case "C":
                            dt = 0;
                            break;
                    }
                    break;
                case 3:
                    switch (val)
                    {
                        case "A":
                            dt = -10;
                            break;
                        case "B":
                            dt = 0;
                            break;
                        case "C":
                            dt = 10;
                            break;
                    }
                    break;
                case 4:
                    switch (val)
                    {
                        case "A":
                            dt = 0;
                            break;
                        case "B":
                            dt = 0;
                            break;
                        case "C":
                            dt = 10;
                            break;
                    }
                    break;
                case 5:
                    switch (val)
                    {
                        case "A":
                            dt = 65;
                            break;
                        case "B":
                            dt = 50;
                            break;
                        case "C":
                            dt = 20;
                            break;
                    }
                    break;
                case 6:
                    switch (val)
                    {
                        case "A":
                            dt = 0;
                            break;
                        case "B":
                            dt = -10;
                            break;
                        case "C":
                            dt = -20;
                            break;
                        case "D":
                            dt = -25;
                            break;
                    }
                    break;
                case 7:
                    switch (val)
                    {
                        case "A":
                            dt = 10;
                            break;
                        case "B":
                            dt = 0;
                            break;
                        case "C":
                            dt = -10;
                            break;

                    }
                    break;
                case 8:
                    switch (val)
                    {
                        case "A":
                            dt = 5;
                            break;
                        case "B":
                            dt = 15;
                            break;
                        case "C":
                            dt = 20;
                            break;
                        case "D":
                            dt = 25;
                            break;
                    }
                    break;
            }
            return dt;
        }


    }
}