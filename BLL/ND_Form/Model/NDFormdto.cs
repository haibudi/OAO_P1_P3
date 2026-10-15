using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.BLL.ND_Form.Model
{
    public class NDFormdto
    {
        public Guid ID { get; set; }
        public bool IsNotAustralian { get; set; }
        public bool IsNotCanadian { get; set; }
        public bool IsNotFinnish { get; set; }
        public bool IsNotChinese { get; set; }
        public bool IsNotJPXOfficer { get; set; }
        public bool IsNotKorean { get; set; }
        public int Status { get; set; }
        public DateTime LastUpdateTime { get; set; }
        public DateTime SubmitTime { get; set; }
    }
}