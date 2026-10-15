using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Reflection;
using System.Web.Mvc;
using System.Diagnostics;

namespace OAO.Controllers
{
    public class WriteLog
    {
        string e_path = string.Empty;
        public WriteLog()
        {
           
        }

        public void Writer(string log)
        {
            e_path = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/log.txt"));
            try
            {
                using(StreamWriter w = File.AppendText(e_path))
                {
                    Log(log, w);
                }
            }catch(Exception e)
            {

            }
        }

        public void Log(string log, TextWriter txt)
        {
            try
            {
                txt.Write("\r\nLog Entry : ");
                txt.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(), DateTime.Now.ToLongDateString());
                txt.WriteLine(" :");
                txt.WriteLine(" : {0}", log);
                txt.WriteLine("---------------------------------------------------------------------------------------------------------------------------------------------");
            }
            catch(Exception e)
            {

            }
        }

        public static void Main(string[] args)
        {

            // Create a trace listener for the event log.
            EventLogTraceListener myTraceListener = new EventLogTraceListener("myListener");

            // Add the event log trace listener to the collection.
            Trace.Listeners.Add(myTraceListener);

            // Write output to the event log.
            Trace.WriteLine("Test output");
        }
    }
}