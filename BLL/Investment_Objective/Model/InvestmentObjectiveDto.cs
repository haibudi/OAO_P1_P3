using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.Investment_Objective.Model
{
    public class InvestmentObjectiveDto
    {
        public System.Guid ID { get; set; }
        public string InvestmentObj { get; set; }
        public string ListSecuritiesExp { get; set; }
        public string CBBCWarrantExp { get; set; }
        public string FutureOrOptionExp { get; set; }
        public string LevForeignExExp { get; set; }
        public string UTorBondExp { get; set; }
        public string StructuredProductExp { get; set; }
        public string LevAndInvProductExp { get; set; }
        public Nullable<System.DateTime> SubmitTime { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
        public string ParentForm { get; set; }
    }
}