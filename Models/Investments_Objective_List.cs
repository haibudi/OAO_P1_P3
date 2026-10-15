using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Investments_Objective_List
    {
        public int Investments_Objective_ID { get; set; }
        public int Is_Generating_Income { get; set; }
        public int Is_Capital_Appreciation { get; set; }
        public int Is_Hedging { get; set; }
        public int Is_Speculation { get; set; }
        public int ID_Form { get; set; }
    }
}