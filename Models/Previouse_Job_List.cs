using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Previouse_Job_List
    {
        public int Previouse_Job_ID { get; set; }
        public string Industry { get; set; }
        public string Occupation { get; set; }
        public string Employer_Company_Name { get; set; }
        public string Other_Industry { get; set; }
        public string Other_Occupation { get; set; }
        public int ID_Form { get; set; }
        public string Annual_Income { get; set; }
        public string Year_of_Service { get; set; }

        //public virtual OAO_Form_List OAO_Form { get; set; }
    }
}