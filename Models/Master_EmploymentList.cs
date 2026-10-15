using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Master_EmploymentList
    {
        public Master_EmploymentList()
        {
            this.Employments = new HashSet<Master_EmploymentList>();
        }

        public int Employment_ID { get; set; }
        private string employment_Name_;
        public string Employment_Name {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(employment_Name_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                employment_Name_ = rm.Value(value);
            }
        }

        public virtual ICollection<Master_EmploymentList> Employments { get; set; }
    }
}