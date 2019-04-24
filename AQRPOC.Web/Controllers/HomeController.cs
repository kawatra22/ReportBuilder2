using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AQRPOC.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult GetPDF([ModelBinder(typeof(AllowHtmlBinder))] string headerHtml, string bodyHtml, string footerHtml, float headerHeight, float bodyHeight, float footerHeight)
        {
            var filePaths = PDFConvertor.CreateTemplate(headerHtml, bodyHtml, footerHtml);
            string pdfOutput = PDFConvertor.ConvertHTMLToPDF(filePaths.Item1, filePaths.Item2, filePaths.Item3, headerHeight, bodyHeight, footerHeight);
            try
            {
                //generate pdf document
                byte[] buffer = System.IO.File.ReadAllBytes(pdfOutput);
                string fileName = "PDFOutput_" + DateTime.Now.ToFileTime() + ".pdf";
                var contentLength = buffer.Length;
                return File(buffer, "application/pdf", fileName);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }


    }
}
