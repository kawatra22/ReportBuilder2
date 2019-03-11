using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using AQRPPOC.Console;
namespace AQRPOC.Service.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        // GET api/values/5
        public string Get(int id)
        {
            return "Saurabh Kawatra";
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult GetPDF([ModelBinder(typeof(AllowHtmlBinder))] string headerHtml, string bodyHtml, string footerHtml, float headerHeight, float bodyHeight, float footerHeight)
        {
            var  filePaths = PDFConvertor.CreateTemplate(headerHtml, bodyHtml, footerHtml);
            string pdfOutput = PDFConvertor.ConvertHTMLToPDFSample(filePaths.Item1,filePaths.Item2,filePaths.Item3, headerHeight, bodyHeight, footerHeight);
            try
            {

                byte[] buffer = System.IO.File.ReadAllBytes(pdfOutput);
                string fileName = "PDFOutput_" + DateTime.Now.ToFileTime() + ".pdf";
                //generate pdf document
                HttpResponseMessage response = new HttpResponseMessage();
                var contentLength = buffer.Length;
                return File(buffer, "application/pdf", fileName);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }

        //[HttpPost]
        //[ValidateInput(false)]
        //public FileStreamResult GetPDF(string htmlBody)
        //{
        //    string filePath = PDFConvertor.CreateTemplate(htmlBody);
        //    string pdfOutput = PDFConvertor.ConvertHTMLToPDFSample1(filePath);

        //    MemoryStream stream = new MemoryStream();
        //    stream.Flush(); //Always catches me out
        //    stream.Position = 0; //Not sure if this is required

        //    return File(stream, "application/pdf", pdfOutput);
        //}
    }
}
