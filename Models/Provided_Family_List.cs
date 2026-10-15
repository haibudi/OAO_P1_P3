using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Provided_Family_List
    {
        public int Provided_Family_ID { get; set; }
        public string Relation_Family { get; set; }
        public string Family_Industry { get; set; }
        public string Family_Occupation { get; set; }
        public string Other_Industry { get; set; }
        public string Other_Occupation { get; set; }
        public int ID_Form { get; set; }

        //public virtual OAO_Form_List OAO_Form { get; set; }
    }
}