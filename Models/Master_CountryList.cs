using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Master_CountryList
    {
        public Master_CountryList()
        {
            this.CountryLists = new HashSet<Master_CountryList>();
        }

        public int Master_Country_ID { get; set; }
        public string Country_Code { get; set; }
        public string Country_Name { get; set; }
        public string Currency_Code { get; set; }
        public string Currency_Name { get; set; }
        public string Currency_Symbol { get; set; }
        public string Phone_Code { get; set; }

        public virtual ICollection<Master_CountryList> CountryLists { get; set; }
    }
}