using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class _taxRes
    {
        public int TaxResidentID { get; set; }
        public System.Guid FormID { get; set; }
        public string ForeignTaxResidentCountry { get; set; }
        public string ForeignTaxResidentTaxIdentificationNo { get; set; }
        public string ForeignTaxResidentNoTINReason { get; set; }
        public string ForeignTaxResidentExplanationToSelectedReasonC { get; set; }
        public string ForeignTaxResidentAdditionalInformation { get; set; }
        public int JointIndicator { get; set; }
        public int Status { get; set; }
        public System.DateTime LastUpdateTime { get; set; }
        public System.DateTime SubmitTime { get; set; }
    }
}