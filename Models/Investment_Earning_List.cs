using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.Models
{
    public class Investment_Earning_List
    {
        public int Investment_Earning_ID { get; set; }
        private string investment_Type_;
        public string Investment_Type {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(investment_Type_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                investment_Type_ = rm.Value(value);
            }
        }
        private string investment_Capital_;
        public string Investment_Capital {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(investment_Capital_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                investment_Capital_ = rm.Value(value);
            }
        }
        private string investment_Profit_;
        public string Investment_Profit {
            get
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                return rm.Value(investment_Profit_);
            }
            set
            {
                RemoveWhiteSpaceModel rm = new RemoveWhiteSpaceModel();
                investment_Profit_ = rm.Value(value);
            }
        }
        public string Investment_Fund_Source { get; set; }
        public string Other_Investment_Type { get; set; }
        public Nullable<int> ID_Form { get; set; }

        //public virtual OAO_Form OAO_Form_List { get; set; }
    }
}