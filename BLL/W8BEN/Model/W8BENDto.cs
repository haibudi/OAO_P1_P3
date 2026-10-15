using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.W8BEN.Model
{
    public class W8BENDto
    {
        public System.Guid FormID { get; set; }
        public string ClientName { get; set; }
        public string CountryOfCitizenship { get; set; }
        public System.DateTime DateOfBirth { get; set; }
        public string SSN { get; set; }
        public string ITIN { get; set; }
        public string ForeignTaxID { get; set; }
        public string AccNo { get; set; }
        public string RefNumber { get; set; }
        public string FormStatus { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifyDateTime { get; set; }
        public string ModifyBy { get; set; }
        public DateTime CompletionDateTime { get; set; }
        public string CompletionBy { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
        public Nullable<bool> CheckIfFTIN { get; set; }
        public ICollection<_Address> W8BEN_Address { get; set; }
        public ICollection<_TaxTreaty> W8BEN_TaxTreaty { get; set; }
        public ICollection<_Certification> W8BEN_Cert { get; set; }

    }

    public class _Address
    {
        public int AddressID { get; set; }
        public System.Guid FormID { get; set; }
        public string AddressType { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string StateAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifyDateTime { get; set; }
        public string ModifyBy { get; set; }
    }

    public class _TaxTreaty
    {
        public int TaxTreatyID { get; set; }
        public System.Guid FormID { get; set; }
        public string Country { get; set; }
        public string ParagraphArticle { get; set; }
        public string IncomeType { get; set; }
        public decimal WithholdingTaxPercentRate { get; set; }
        public string ParagraphArticleAddOnConditions { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifyDateTime { get; set; }
        public string ModifyBy { get; set; }
    }

    public class _Certification
    {
        public int CertID { get; set; }
        public System.Guid FormID { get; set; }
        public bool W8IamBeneficialOwner { get; set; }
        public bool W8IamNotUSPerson { get; set; }
        public bool W8IncomeRelate { get; set; }
        public bool W8IsTaxTreaty { get; set; }
        public bool W8BrokerTransactions { get; set; }
        public bool W8IAuthorize { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifyDateTime { get; set; }
        public string ModifyBy { get; set; }
    }
}