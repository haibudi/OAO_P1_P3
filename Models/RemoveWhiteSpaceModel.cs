using OAO.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace OAO.Models
{
    public class RemoveWhiteSpaceModel
    {
        public string Value(string val)
        {
            var str_ = "";
            WriteLog wl = new WriteLog();
            try
            {
                if (String.IsNullOrEmpty(val))
                {
                    val = "";
                    wl.Writer("value " + val + "empty");
                    return val;
                }
                //var tst = "   Ini adalah contoh string   tambah tab ";
                val = val.Trim();
                //tst = tst.Trim();
                //var m_ = Regex.Replace(tst, @"(^[\s\0]+)|([\s\0]+$)", "");
                //m_ = Regex.Replace(m_, @"(^[\t\0]+)|([\t\0]+$)", "");
                //str_ = Regex.Replace(val, @"^\s+", " ");
                //str_ = Regex.Replace(str_, @"^\t+", "");
                str_ = val;
                str_ = Regex.Replace(str_, @"(^[\s\0]+)|([\s\0]+$)", "");
                str_ = Regex.Replace(str_, @"(^[\t\0]+)|([\t\0]+$)", "");
            }
            catch(Exception e)
            {

            }
            
           
            return str_;
        }
    }
}