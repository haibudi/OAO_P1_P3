using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.MarginQuestion.Model
{
    public class MarginQuestionDto
    {
        public System.Guid ID { get; set; }
        public string Q1 { get; set; }
        public string Q1Details { get; set; }
        public string Q2 { get; set; }
        public string Q2Details { get; set; }
        public string Q3 { get; set; }
        public string Q3Details { get; set; }
        public string Q4 { get; set; }
        public string Q4Details { get; set; }
        public DateTime CreateTime { get; set; }
        public string FormName { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
    }
}