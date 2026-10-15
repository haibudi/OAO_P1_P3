using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Master_OccupationList
    {
        public Master_OccupationList()
        {
            this.Ocupations = new HashSet<Master_OccupationList>();
        }

        public int Ocupation_ID { get; set; }
        public string Ocupation_BG { get; set; }
        public string Ocupation_EN { get; set; }
        public string Ocupation_ZH { get; set; }

        public virtual ICollection<Master_OccupationList> Ocupations { get; set; }

    }
}