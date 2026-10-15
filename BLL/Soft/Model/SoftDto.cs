using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.Soft.Model
{
    public class SoftDto
    {
        public System.Guid ID { get; set; }
        public Nullable<bool> InvestmentEarning { get; set; }
        public string InvestmentType { get; set; }
        public string InvestmentTypeOthers { get; set; }
        public string InvestmentAmount { get; set; }
        public string InvestmentEarningAmount { get; set; }
        public string InvestmentFundSource { get; set; }
        public Nullable<bool> PreviousJobs { get; set; }
        public string PreviousJobsIndustry { get; set; }
        public string PreviousJobsIndustryOthers { get; set; }
        public string PreviousJobsOccupation { get; set; }
        public string PreviousJobsOccupationOthers { get; set; }
        public string PreviousJobsEmployerCompanyName { get; set; }
        public Nullable<int> PreviousJobsYearsOfService { get; set; }
        public Nullable<bool> ProvidedByFamilyMember { get; set; }
        public string RelationshipWithTheFamilyMember { get; set; }
        public string FamilyMembersIndustry { get; set; }
        public string FamilyMembersIndustryOthers { get; set; }
        public string FamilyMembersOccupation { get; set; }
        public string FamilyMembersOccupationOthers { get; set; }
        public Nullable<bool> RentalIncome { get; set; }
        public string RentalHoldingPeriod { get; set; }
        public string RentalAnnualIncome { get; set; }
        public string RentalFundSource { get; set; }
        public Nullable<bool> OtherIncome { get; set; }
        public string OtherIncomeTextBox { get; set; }
        public Nullable<System.DateTime> SubmitTime { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
        public string ParentForm { get; set; }
        public Nullable<int> PreviousJobAnnualIncome { get; set; }
        public Nullable<bool> SavingFromSalary { get; set; }
    }
}