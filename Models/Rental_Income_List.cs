using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Rental_Income_List
    {
        public int Rental_Income_ID { get; set; }
        public string Holding_Period_Properties { get; set; }
        public string Annual_Rental_Income { get; set; }
        public string FundSource_Property_Acquisition { get; set; }
        public int ID_Form { get; set; }

        //public virtual OAO_Form_List OAO_Form { get; set; }
    }
}