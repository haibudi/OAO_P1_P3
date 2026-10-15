
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OAO.Models;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace OAO.Controllers
{
    public class KeyController : Controller
    {
        // GET: Key
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CreateKey(KeyParam param)
        {
            var res = new result();
            WriteLog wl = new WriteLog();
            try
            {
                string key = ConfigurationManager.AppSettings["privateKeyP3"].ToString();
                var rsaParams = GetRsaParameters(key);
                var encoder = GetRS256JWTEncoder(rsaParams);

                // create the payload according to your need
                var payload = new Dictionary<string, object>
                {
                    { "clientId", param.clientId },
                    { "phillipID", param.phillipId },
                    { "mobileNo", param.mobileNo },
                    { "iss", param.iss },
                    { "iat", param.iat }
                };

                var token = encoder.Encode(payload, new byte[0]);
                res.data = token;
                res.success = true;
                res.message = "success";

            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                res.data = null;
                res.success = false;
                res.message = e.Message + e.StackTrace;
            }


            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ParsCode(string token)
        {
            var res = new result();
            WriteLog wl = new WriteLog();
            try
            {
                string key = ConfigurationManager.AppSettings["publicKeyP3"].ToString();
                var json = DecodeToken(token, key);

                var decPrm = JsonConvert.DeserializeObject<KeyParam>(json);

                var Ti = decPrm.iat;

                
                var Tdt =  Convert.ToInt64(Ti);
                var start = JavaTimeStampToDateTime(Tdt);

                DateTime end = DateTime.Now;

                var result = (int)end.Subtract(start).TotalMinutes;

                res.data = json;
                res.success = true;
                res.message = "success";
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
                res.data = null;
                res.success = false;
                res.message = e.Message + e.StackTrace;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dateTime;
        }

        public DateTime JavaTimeStampToDateTime(double javaTimeStamp)
        {
            // Java timestamp is milliseconds past epoch
            DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddMilliseconds(javaTimeStamp).ToLocalTime();
            return dateTime;
        }

        public string DecodeStr(string token)
        {
            var res = new result();
            WriteLog wl = new WriteLog();
            var str = "";
            try
            {
                string key = ConfigurationManager.AppSettings["publicKeyP3"].ToString();
                str = DecodeToken(token, key); 
            }
            catch (Exception e)
            {
                wl.Writer(e.Message + e.StackTrace);
            }
            return str;
        }

        public string DecodeToken(string token, string publicRsaKey)
        {
            RSAParameters rsaParams;

            using (var tr = new StringReader(publicRsaKey))
            {
                var pemReader = new PemReader(tr);
                var publicKeyParams = pemReader.ReadObject() as RsaKeyParameters;
                if (publicKeyParams == null)
                {
                    throw new Exception("Could not read RSA public key");
                }
                rsaParams = DotNetUtilities.ToRSAParameters(publicKeyParams);
            }
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                rsa.ImportParameters(rsaParams);
                // This will throw if the signature is invalid
                return Jose.JWT.Decode(token, rsa, Jose.JwsAlgorithm.RS256);
            }
        }

        //public string DecodeToken(string dataEncryptedBase64, string publicKey)
        //{
        //    if (dataEncryptedBase64 == null) throw new ArgumentNullException("dataEncryptedBase64");
        //    if (publicKey == null) throw new ArgumentNullException("publicKey");
        //    try
        //    {
        //        RSAParameters _publicKey = LoadRsaPublicKey(publicKey, false);
        //        RSACryptoServiceProvider rsa = InitRSAProvider(_publicKey);

        //        byte[] bytes = Convert.FromBase64String(dataEncryptedBase64);
        //        byte[] decryptedBytes = rsa.Decrypt(bytes, false);

        //        // I assume here that the decrypted data is intended to be a
        //        // human-readable string, and that it was UTF8 encoded.
        //        return Encoding.UTF8.GetString(decryptedBytes);
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}

        private static IJwtEncoder GetRS256JWTEncoder(RSAParameters rsaParams)
        {
            var csp = new RSACryptoServiceProvider();
            csp.ImportParameters(rsaParams);

            var algorithm = new RS256Algorithm(csp, csp);
            var serializer = new JsonNetSerializer();
            var urlEncoder = new JwtBase64UrlEncoder();
            var encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            return encoder;
        }

        private static RSAParameters GetRsaParameters(string rsaPrivateKey)
        {

            var byteArray = Encoding.ASCII.GetBytes(rsaPrivateKey);
            //using (var ms = new MemoryStream(byteArray))
            //{
            //    using (var sr = new StreamReader(ms))
            //    {
            //        // use Bouncy Castle to convert the private key to RSA parameters
            //        var pemReader = new PemReader(sr);
            //        var keyPair = pemReader.ReadObject() as AsymmetricCipherKeyPair;
            //        return DotNetUtilities.ToRSAParameters(keyPair.Private as RsaPrivateCrtKeyParameters);
            //    }
            //}

            RSAParameters rsaParams;
            using (var stringReader = new StringReader(rsaPrivateKey))
            {
                var pemReader = new PemReader(stringReader);
                var privateRsaParams = pemReader.ReadObject() as RsaPrivateCrtKeyParameters;
                if (privateRsaParams == null)
                {
                    throw new Exception("Could not read RSA private key");
                }
                rsaParams = DotNetUtilities.ToRSAParameters(privateRsaParams);
                return rsaParams;
            }

        }

        //private static RSAParameters GetRsaParameters(string rsaPrivateKey)
        //{
        //    var byteArray = Encoding.ASCII.GetBytes(rsaPrivateKey);
        //    using (var ms = new MemoryStream(byteArray))
        //    {
        //        using (var sr = new StreamReader(ms))
        //        {
        //            // use Bouncy Castle to convert the private key to RSA parameters
        //            var pemReader = new PemReader(sr);
        //            var keyPair = pemReader.ReadObject() as AsymmetricCipherKeyPair;
        //            return DotNetUtilities.ToRSAParameters(keyPair.Private as RsaPrivateCrtKeyParameters);
        //        }
        //    }
        //}

        //public JsonResult CreateKey(KeyParameter param)
        //{
        //    var res = new result();
        //    WriteLog wl = new WriteLog();
        //    try
        //    {
        //        string key = ConfigurationManager.AppSettings["privateKeyP3"].ToString();
        //        var issuer = ConfigurationManager.AppSettings["issuer"].ToString();

        //        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        //        var credentials = new SigningCredentials(securityKey, "RS256");

        //        var permClaims = new List<Claim>();
        //        //permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
        //        permClaims.Add(new Claim("clienId", param.ClientId));
        //        permClaims.Add(new Claim("phillipID", param.phillipId));
        //        permClaims.Add(new Claim("mobile", param.mobileNumber));
        //        permClaims.Add(new Claim("iss", param.iss));
        //        permClaims.Add(new Claim("iat", param.iat));

        //        var token = new JwtSecurityToken(issuer,
        //            issuer,
        //            permClaims,
        //            expires: DateTime.Now.AddDays(1),
        //            signingCredentials: credentials);
        //        var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);

        //        res.data = jwt_token;
        //        res.success = true;
        //        res.message = "success";
        //    }
        //    catch(Exception e)
        //    {
        //        wl.Writer(e.Message + e.StackTrace);
        //        res.data = null;
        //        res.success = false;
        //        res.message = e.Message + e.StackTrace;
        //    }
        //    return Json(res, JsonRequestBehavior.AllowGet);
        //}


    }
}