using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.Attachment.Model
{
    public class AttcDto
    {
        public Guid AttachmentID { get; set; }
        public Guid FormID { get; set; }
        public string FormName { get; set; }
        public string AttachmentType { get; set; }
        public string Attachment { get; set; }
        public string AttachmentExt { get; set; }
        public DateTime CreateTime { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
        public int TransferStatus { get; set; }
        public DateTime TransferStatusUpdatedTime { get; set; }
    }
}