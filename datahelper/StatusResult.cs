using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OAO.datahelper
{
    public class StatusResult
    {
        /// <summary>
        /// A flag that indicates certain operation succeeded or not
        /// </summary>
        public bool IsSuccess { get; set; }
        /// <summary>
        /// List of Errors
        /// </summary>
        public List<string> Errors { get; set; }

        public StatusResult(bool isSuccess, List<string> errors)
        {
            IsSuccess = isSuccess;
            Errors = errors;
        }
    }
}