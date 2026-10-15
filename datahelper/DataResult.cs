using System;
using System.Net;

namespace OAO.datahelper
{
    public class DataResult<T>
    {
        /// <summary>
        /// A generic class that holds a value of certain operation and status result class
        /// which can be used for detecting certain operation succeeded or not
        /// </summary>

        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public T Data { get; private set; }

        public DataResult(HttpStatusCode statuscode, string message, T data)
        {
            StatusCode = statuscode;
            Message = message;
            Data = data;
        }

        public static DataResult<T> Ok(string message = null)
        {
            return new DataResult<T>(HttpStatusCode.OK, message, default(T));
        }

        public static DataResult<T> Ok(T data, string message = null)
        {
            return new DataResult<T>(HttpStatusCode.OK, message, data);
        }

        public static DataResult<T> Error(HttpStatusCode code, string message = null)
        {
            return new DataResult<T>(code, message, default(T));
        }

        public static DataResult<T> Exception(Exception error)
        {
            return new DataResult<T>(HttpStatusCode.InternalServerError, error.Message, default(T));
        }
    }
}