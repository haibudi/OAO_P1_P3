using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OAO.BLL.Form.Model;

namespace OAO.Models
{
    public class OAO_Panel_List
    {
        //public OAO_Panel_List()
        //{
        //    this.OAO_Forms = new HashSet<FormDto>();
        //}
        public int ID_Panel { get; set; }
        public int Panel_Location { get; set; }
        public string Status_Panel { get; set; }
        public System.DateTime Date_Create { get; set; }
        public System.DateTime Date_LastUpdate { get; set; }
        public int ID_Form { get; set; }

        //public virtual ICollection<FormDto> OAO_Forms { get; set; }
    }

    public class result
    {
        public object data { get; set; }
        public bool success { get; set; }
        public string message { get; set; }

    }

    public class ResultgetBack
    {
        public object data_form { get; set; }
        public object data_country { get; set; }
        public object data_clientInfo { get; set; }
        public object data_soft { get; set; }
        public object data_invest_obj { get; set; }
        public object data_rpq { get; set; }
        public object data_derivative { get; set; }
        public object data_taxres { get; set; }
        public object data_NDForm { get; set; }
        public object data_w8 { get; set; }
        public object data_mr { get; set; }
        public object data_attach { get; set; }
        public object data_dkQuestionaire { get; set; }
        public object data_File { get; set; }
        public string AllowedCheckFTIN { get; set; }
        public string ClientDateBirth { get; set; }
    }

    public class getAttachment
    {
        public string Name { get; set; }
        public string Source { get; set; }
        public string FileType { get; set; }
        public string Extension { get; set; }
        public byte[] EnByte { get; set; }
        public long size { get; set; }
    }

    public class Panel1
    {
        public Guid ID_Form { get; set; }
        public int PID { get; set; }
        public int ISMAINLAND { get; set; }
        public string Email { get; set; }
        public string Phone_Number { get; set; }
        public string Phone_Code { get; set; }
        public string Source { get; set; }
    }

    public class Panel2
    {
        public Guid ID_Form { get; set; }
        public bool AcknowledgementCashAcct { get; set; }
        public bool AcknowledgementMarginAcct { get; set; }
        public bool AcknowledgementStockOptAcct { get; set; }
        public bool AcknowledgementOnlinePoemsTradingService { get; set; }
        public bool AcknowledgementChinaConnectTradingService { get; set; }
        public Nullable<bool> AcknowledgementHKIDR { get; set; }

        public bool isAutralia { get; set; }
        public bool isCanada { get; set; }
        public bool isFinland { get; set; }
        public bool isTaiwan { get; set; }
        public bool isJapan { get; set; }
        public bool isKorea { get; set; }
    }

    public class Panel3
    {
        public Guid ID_Form { get; set; }
        public int AddresId { get; set; }
        public string Promotion_Code { get; set; }
        public string Title { get; set; }
        public string Surename { get; set; }
        public string ClientName { get; set; }
        //public string FullName { get; set; }
        public string NonEnglishSurname { get; set; }
        public string NoneEnglishName { get; set; }
        public string Nationality { get; set; }
        public string ID_Cardtype { get; set; }
        public string ID_Card { get; set; }
        public string Place_Issue { get; set; }
        public string Country_Birth { get; set; }
        public DateTime Date_Birth { get; set; }
        public string Date_Birth_s { get; set; }
        public int Age { get; set; }
        public string Mobile_number { get; set; }
        public string Home_number { get; set; }
        public string Office_Number { get; set; }
        public string Wechat_ID { get; set; }
        public string mobile_Area_Number { get; set; }
        public string Home_Area_Number { get; set; }
        public string Office_Area_Number { get; set; }
        public string AECODE { get; set; }
        public string AENAME { get; set; }
        public int PreferedAE { get; set; }
    }

    public class Panel4
    {
        public Guid ID_Form { get; set; }
        public string Residential_Country { get; set; }
        public string Residential_Address { get; set; }
        public string Residential_Address2 { get; set; }
        public string Residential_Address3 { get; set; }
        public string Ownership_Residence { get; set; }
        public string Employment_Type { get; set; }
        public string Industry { get; set; }
        public string Other_Industry { get; set; }
        public string Occupation { get; set; }
        public string Other_Occupation { get; set; }
        public string Employer_Company_Name { get; set; }
        public string Office_Address1 { get; set; }
        public string Office_Address2 { get; set; }
        public string Office_Address3 { get; set; }
        public string Office_Region { get; set; }
        public int Years_Of_Service { get; set; }

    }

    public class Panel5
    {
        public Guid ID_Form { get; set; }
        public string Annual_Income { get; set; }
        public string Liquid_Assets { get; set; }
        public string Net_Worth { get; set; }
        public int Previouse_Job { get; set; }
        public string Previouse_Job_Industry { get; set; }
        public string Previouse_Job_Other_Industry { get; set; }
        public string Previouse_Job_Occupation { get; set; }
        public string Previouse_Job_Other_Occupation { get; set; }
        public string Previouse_Job_Company_Name { get; set; }
        public int Prevouse_Job_Annual_Income { get; set; }
        public int Previouse_Job_Year_Service { get; set; }
        public int Provided_Family { get; set; }
        public string Family_Relation { get; set; }
        public string Family_Industry { get; set; }
        public string Family_Other_Industry { get; set; }
        public string Family_Occupation { get; set; }
        public string Family_Other_Occupancy { get; set; }
        public int Investment_Earning { get; set; }
        public string Investment_type { get; set; }
        public string Investment_Capital { get; set; }
        public string Investment_Profit { get; set; }
        public string Investment_Fund_Source { get; set; }
        public string Other_Investment_Type { get; set; }
        public int Rental_Income { get; set; }
        public string Holding_Period_Properties { get; set; }
        public string Annual_Rental_Income { get; set; }
        public string FundSource_Property_Acquisition { get; set; }
        public int Other { get; set; }
        public string Other_Description { get; set; } 
        public string Other_Net_Worth { get; set; }
        public int SavingFromSalary { get; set; }
    }

    public class Panel6
    {
        public Guid ID_Form { get; set; }
        public string Investments_Objective { get; set; }
        public string Listed_Securities { get; set; }
        public string Future_Option { get; set; }
        public string Leverage_foreign_Exchange { get; set; }
        public string Unit_Trust_Bond { get; set; }
        public string Structured_Product { get; set; }
        public string Leverage_Inverse_product { get; set; }
        public string CBBC_Warant { get; set; }
    }

    public class Panel8
    {
        public Guid ID_Form { get; set; }
        public string Question1 { get; set; }
        public string Question2 { get; set; }
        public string Question3 { get; set; }
        public string Question4 { get; set; }
        public string Question5 { get; set; }
        public string Question6 { get; set; }
        public string Question7 { get; set; }
        public string Question8 { get; set; }
    }

    public class Panel9
    {
        public Guid ID_Form { get; set; }
        public string AcquireFrom1 { get; set; }
        public string AcquireFrom2 { get; set; }
    }

    public class Panel10
    {
        public Guid ID_Form { get; set; }
        public bool HK_Tax { get; set; }
        public bool Other_Tax { get; set; }
        public bool Acknowledge { get; set; }
        public ICollection<Tax_Detail> TaxDetail { get; set; }
    }

    public class Tax_Detail
    {
        public int TaxResidentID { get; set; }
        public string jurisdiction { get; set; }
        public string tin { get; set; }
        public string tin_reason { get; set; }
    }

    public class panel11
    {
        public Guid ID_Form { get; set; }
        public string W8_name { get; set; }
        public string W8_citizenship { get; set; }
        public string W8_address1 { get; set; }
        public string W8_address2 { get; set; }
        public string W8_address3 { get; set; }
        public string W8_address4 { get; set; }
        public string W8_residence_city{ get; set; }
        public string W8_residence_state { get; set; }
        public string W8_residence_postalcode { get; set; }
        public string W8_residence_country { get; set; }
        public bool same_As_residence { get; set; }
        public string W8_mailing_address1{ get; set; }
        public string W8_mailing_address2 { get; set; }
        public string W8_mailing_address3 { get; set; }
        public string W8_mailing_city { get; set; }
        public string W8_mailing_state { get; set; }
        public string W8_mailing_postalcode { get; set; }
        public string W8_mailing_country { get; set; }
        public string W8_tax_tin { get; set; }
        public string W8_identifyng_number { get; set; }
        public string W8_reffrence_number { get; set; }
        public DateTime W8_date_birth { get; set; }
        public string W8_benefit_country { get; set; }
        public string W8_rate_paragraph { get; set; }
        public decimal W8_tax { get; set; }
        public decimal w8_witholding_percen { get; set; }
        public string W8_income_type { get; set; }
        public string W8_on_condition { get; set; }
        public string W8_e_signature { get; set; }
        public bool CheckIfFTIN { get; set; }
    }

    public class panel13
    {
        public Guid ID_Form { get; set; }
        public string Q1 { get; set; }
        public string Q1Details { get; set; }
        public string Q2 { get; set; }
        public string Q2Details { get; set; }
        public string Q3 { get; set; }
        public string Q3Details { get; set; }
        public string Q4 { get; set; }
        public string Q4Details { get; set; }
    }

    public class panel14
    {
        public Guid ID_Form { get; set; }
        public string BankName { get; set; }
        public string OtherBankName { get; set; }
        public string AccHolderName { get; set; }
        public string BankAccNumb { get; set; }
        public int OAOFAO_Checked { get; set; }


    }

    public class FileDataInfo
    {
        public Guid ID_Form { get; set; }
        public Guid AttachmentID { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileSize { get; set; }
    }

    public class FileData
    {
        List<FileDataInfo> DataInfos = new List<FileDataInfo>();
    }

    public class panel16
    {
        public string filename { get; set; }
        public Guid ID_Form { get; set; }
        public Guid file_ID { get; set; }
        public string ext { get; set; }
        public bool UseFPS { get; set; }
    }

    public class KeyParam
    {
        public string clientId { get; set; }
        public string phillipId { get; set; }
        public string countryCode { get; set; }
        public string mobileNumber { get; set; }
        public string mobileNo { get; set; }
        public string iss { get; set; }
        public string iat { get; set; }
    }

    public class DecodedParam
    {
        string ClientId;
        string getClientId() { return ClientId; }
        void setClientId(string ClientId) { this.ClientId = ClientId; }
        string phillipId;
        string getPhillipId() { return phillipId; }
        void setPhillipId(string phillipId) { this.phillipId = phillipId; }
        string countryCode;
        string getCountrCode() { return countryCode; }
        void setCountryCode(string countryCode) { this.countryCode = countryCode; }
        string mobileNumber;
        string getMobileNumber() { return mobileNumber; }
        void setMobileNumber(string mobileNumber) { this.mobileNumber = mobileNumber; }
        string iss;
        string getIss() { return iss; }
        void setIss(string iss) { this.iss = iss; }
        string iat;
        string getIat() { return iat; }
        void setIat(string iat) { this.iat = iat; }
    }

    
}