using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class _rpqForm
    {

        public System.Guid ID { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
        public string ParentForm { get; set; }
        public string Accode { get; set; }
        public string Q1 { get; set; }
        public string Q2 { get; set; }
        public string Q3 { get; set; }
        public string Q4 { get; set; }
        public string Q5 { get; set; }
        public string Q6 { get; set; }
        public string Q7 { get; set; }
        public string Q8 { get; set; }
        public int RPQLevel { get; set; }
        public int RPQScore { get; set; }
        public System.DateTime SubmitTime { get; set; }
        public int Status { get; set; }
        public System.DateTime LastUpdateTime { get; set; }
        public int Q1Score { get; set; }
        public int Q2Score { get; set; }
        public int Q3Score { get; set; }
        public int Q4Score { get; set; }
        public int Q5Score { get; set; }
        public int Q6Score { get; set; }
        public int Q7Score { get; set; }
        public int Q8Score { get; set; }
    }
}