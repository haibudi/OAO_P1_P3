using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.DKQuestionaire.Model
{
    public class Dkdto
    {
        public Guid ID { get; set; }
        public string B2BCompany { get; set; }
        public string Version { get; set; }
        public string ParentForm { get; set; }
        public string Accode { get; set; }
        public string AcquireFrom1 { get; set; }
        public string AcquireFrom2 { get; set; }
        public Nullable<System.DateTime> SubmitTime { get; set; }
        public int Status { get; set; }
        public DateTime LastUpdateTime { get; set; }
    }
}