using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class _w8ben
    {

        public System.Guid FormID { get; set; }
        private string clientName_;
        public string ClientName {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(clientName_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                clientName_ = rm.Value(value);
            }
        }
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
        public ICollection<_address> W8BEN_Address { get; set; }
        public ICollection<_taxTreaty> W8BEN_TaxTreaty { get; set; }

        public ICollection<_certification> W8BEN_Cert { get; set; }

    }

    public class _address
    {
        public int AddressID { get; set; }
        public System.Guid FormID { get; set; }
        public string AddressType { get; set; }
        private string address1_;
        public string Address1 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(address1_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                address1_ = rm.Value(value);
            }
        }

        private string address2_;
        public string Address2 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(address2_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                address2_ = rm.Value(value);
            }
        }
        private string address3_;
        public string Address3 {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(address3_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                address3_ = rm.Value(value);
            }
        }
        public string address4_ { get; set; }
        private string stateAddress;
        public string StateAddress {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(address4_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                address4_ = rm.Value(value);
            }
        }
        private string city_;
        public string City {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(city_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                city_ = rm.Value(value);
            }
        }
        private string country_;
        public string Country {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(country_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                country_ = rm.Value(value);
            }
        }
        public string PostalCode { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifyDateTime { get; set; }
        public string ModifyBy { get; set; }
    }

    public class _taxTreaty
    {
        public int TaxTreatyID { get; set; }
        public System.Guid FormID { get; set; }
        public string Country { get; set; }
        private string paragrapArticle_;
        public string ParagraphArticle {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(paragrapArticle_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                paragrapArticle_ = rm.Value(value);
            }
        }
        private string incomeType_;
        public string IncomeType {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(incomeType_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                incomeType_ = rm.Value(value);
            }
        }
        public decimal WithholdingTaxPercentRate { get; set; }
        private string paragraphArticleAddOnConditions_;
        public string ParagraphArticleAddOnConditions {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(paragraphArticleAddOnConditions_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                paragraphArticleAddOnConditions_ = rm.Value(value);
            }
        }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifyDateTime { get; set; }
        public string ModifyBy { get; set; }
    }

    public class _certification
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