using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.Form.Model
{
    public class FormDto
    {

        public System.Guid ID { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public System.DateTime RequestTime { get; set; }
        public Nullable<System.Guid> ClientInfoID { get; set; }
        public Nullable<System.Guid> RPQID { get; set; }
        public Nullable<System.Guid> DKID { get; set; }
        public Nullable<System.Guid> W8ID { get; set; }
        public Nullable<System.Guid> NDID { get; set; }
        public Nullable<System.Guid> AttFormID { get; set; }
        public int Step { get; set; }
        public System.DateTime LastLoginTime { get; set; }
        public Nullable<System.DateTime> SubmittedDateTime { get; set; }
        public string SubmittedBy { get; set; }
        public string SubmitStatus { get; set; }
        public string SubmittedByName { get; set; }
        public string Status { get; set; }
        public string LastStatusUpdatedBy { get; set; }
        public Nullable<System.DateTime> LastStatusUpdatedTime { get; set; }
        public string CountryCodeMobile { get; set; }
        public Nullable<System.Guid> TRID { get; set; }
        public Nullable<bool> IsInChina { get; set; }
        public string Approver1 { get; set; }
        public string Approver1_SuppDocPath { get; set; }
        public string Approver1_Remarks { get; set; }
        public System.DateTime Approver1_SubmitTime { get; set; }
        public string Approver2 { get; set; }
        public string Approver2_Remarks { get; set; }
        public System.DateTime Approver2_SubmitTime { get; set; }
        public string Approver3 { get; set; }
        public string Approver3_Remarks { get; set; }
        public System.DateTime Approver3_SubmitTime { get; set; }
        public string Approver4 { get; set; }
        public string Approver4_Remarks { get; set; }
        public System.DateTime Approver4_SubmitTime { get; set; }
        public string Approver1_SuppDocPath2 { get; set; }
        public string Approver3_SuppDocPath { get; set; }
        public string AssignedAeCd { get; set; }
        public string Approver0_SuppDocPath { get; set; }
        public string Approver0_Remarks { get; set; }
        public string Approver2_SuppDocPath { get; set; }
        public string Approver0 { get; set; }
        public Nullable<bool> AeCdValid { get; set; }
        public Nullable<System.DateTime> Approver0_SubmitTime { get; set; }
        public Nullable<bool> ProvideTransferProof { get; set; }
        public int ApplicationMode { get; set; }
        public Nullable<System.Guid> MQID { get; set; }
        public string PromoCode { get; set; }
        public string Source { get; set; }
        public Nullable<int> PID { get; set; }
    }
}