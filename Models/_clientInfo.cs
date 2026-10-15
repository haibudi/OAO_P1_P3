using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class _clientInfo
    {
        public System.Guid ID { get; set; }
        public string Surname { get; set; }
        public string ClientName { get; set; }
        public string Salutation { get; set; }
        public string NRICPassportType { get; set; }
        public string NRICPassportNo { get; set; }
        public string PlaceOfIssue { get; set; }
        public Nullable<System.DateTime> DateOfBirth { get; set; }
        public string Nationality { get; set; }
        public string CountryOfBirth { get; set; }
        public string HomeTelNo { get; set; }

        private string residentialAddress1_;
        public string ResidentialAddress1 { 
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(residentialAddress1_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                residentialAddress1_ = rm.Value(value);
            } 
        }
        private string residentialAddress2_;
        public string ResidentialAddress2 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(residentialAddress2_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                residentialAddress2_ = rm.Value(value);
            }
        }
        private string residentialAddress3_;
        public string ResidentialAddress3 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(residentialAddress3_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                residentialAddress3_ = rm.Value(value);
            }
        }
        public string ResidentialCountry { get; set; }
        public string ResidentialPostalCode { get; set; }
        public string MailingAddress1 { get; set; }
        public string MailingAddress2 { get; set; }
        public string MailingAddress3 { get; set; }
        public string MailingCountry { get; set; }
        public string MailingPostalCode { get; set; }
        public Nullable<System.DateTime> RiskDisclosureAcceptTime { get; set; }
        public int Status { get; set; }
        public System.DateTime LastUpdateTime { get; set; }
        public Nullable<System.DateTime> SubmitTime { get; set; }
        public Nullable<bool> PreferredAE { get; set; }
        public string AeCd { get; set; }
        public string AeName { get; set; }
        public Nullable<int> KnownToAeForhowLong { get; set; }
        public string IntroducedBy { get; set; }
        public string WeChatID { get; set; }
        public string CountryCodeOfficeMain { get; set; }
        public string OfficeNoMain { get; set; }
        public string StatusOfResidence { get; set; }
        public string EmploymentType { get; set; }
        public string EmploymentIndustry { get; set; }
        public string Occupation { get; set; }
        private string employerName_;
        public string EmployerName {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(employerName_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                employerName_ = rm.Value(value);
            }
        }

        private string employerAddress1_;
        public string EmployerAddress1 {
            get {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();

                return rm.Value(employerAddress1_);
            }
            set {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                employerAddress1_ = rm.Value(value);
            }
        }
        private string employerAddress2_;
        public string EmployerAddress2 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();

                return rm.Value(employerAddress2_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                employerAddress2_ = rm.Value(value);
            }
        }

        private string employerAddress3_;
        public string EmployerAddress3 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();

                return rm.Value(employerAddress3_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                employerAddress3_ = rm.Value(value);
            }
        }
        public string EmployerAddressCountry { get; set; }
        public string EmployerAddressPostalCode { get; set; }
        public Nullable<int> YearsOfService { get; set; }
        public string AnnualIncomeLevel { get; set; }
        public string LiquidNetWorth { get; set; }
        public string EstimatedNetWorth { get; set; }
        public string SourceOfFunds { get; set; }
        public string EstimatedNetWorthOthers { get; set; }
        public string SourceOfFundsOthers { get; set; }
        public Nullable<bool> SameMailingAddress { get; set; }
        public string CountryCodeHome { get; set; }
        public Nullable<bool> HongKongTaxResident { get; set; }
        public Nullable<bool> ForeignTaxResident { get; set; }
        public string AcctType { get; set; }
        public Nullable<bool> AcknowledgementCashAcct { get; set; }
        public Nullable<bool> AcknowledgementMarginAcct { get; set; }
        public Nullable<bool> AcknowledgementStockOptAcct { get; set; }
        public Nullable<bool> AcknowledgementOnlinePoemsTradingService { get; set; }
        public Nullable<bool> AcknowledgementByCust1 { get; set; }
        public Nullable<bool> AcknowledgementByCust2 { get; set; }
        public Nullable<bool> AcknowledgementByCust3 { get; set; }
        public Nullable<bool> AcknowledgementByCust4 { get; set; }
        public Nullable<bool> AcknowledgementByCust5 { get; set; }
        public Nullable<bool> AcknowledgementByCust6 { get; set; }
        public Nullable<bool> AcknowledgementChinaConnectTradingService { get; set; }
        public string SourceOfFundsRelationship { get; set; }
        public string PreviousAnnualIncomeLevel { get; set; }
        public string PreviousOccupation { get; set; }
        public string DesignatedBankName { get; set; }
        public string DesignatedBankAccountNo { get; set; }
        public string DesignatedBankAccountName { get; set; }
        public Nullable<System.DateTime> TermsAcceptTime { get; set; }
        public string SourceOfFundsOccupation { get; set; }
        public string EmploymentIndustryOthers { get; set; }
        public string OccupationOthers { get; set; }
        public string DesignatedBankNameOthers { get; set; }
        public string SourceOfFundsInvestmentEarnings { get; set; }
        public string SourceOfFundsInvestmentEarningsOthers { get; set; }
        public string PreviousOccupationOthers { get; set; }
        public string PreviousIndustry { get; set; }
        public string PreviousIndustryOthers { get; set; }
        public Nullable<int> SofVersion { get; set; }
        public Nullable<System.Guid> SofID { get; set; }
        public Nullable<System.Guid> InvtObjID { get; set; }
        public Nullable<bool> AcknowledgementHKIDR { get; set; }
        public string HKIDROtherName { get; set; }
        public string NonEnglishSurname { get; set; }
        public string NoneEnglishName { get; set; }
    }
}