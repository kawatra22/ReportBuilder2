using System.Net;
using System.IO;
using SelectPdf;
using System.Linq;
using System;

namespace AQRPPOC.Console
{
    public static class PDFConvertor
    {


        public static void ConvertIntoPDFTest()
        {
            PdfDocument doc = new SelectPdf.PdfDocument();
            PdfPage page = doc.AddPage();

            PdfFont font = doc.AddFont(PdfStandardFont.Helvetica);
            font.Size = 20;

            SelectPdf.PdfTextElement text = new SelectPdf.PdfTextElement(50, 50, "Hello world!", font);
            page.Add(text);

            doc.Save("test.pdf");
            doc.Close();
        }
        public static void ConvertIntoPDFURL()
        {
            SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
            SelectPdf.PdfDocument doc = converter.ConvertUrl(@"C:\Users\Home\Desktop\test\ReportApp.html");
            doc.Save("testURL.pdf");
            doc.Close();
        }
        public static void ConvertHTMLToPDF(string filePath)
        {
            String fileContents = "";
            using (StreamReader sr = new StreamReader(@"C:\Users\Home\Desktop\test\test.html"))
            {
                // Read the stream to a string, and write the string to the console.
                fileContents = sr.ReadToEnd();
            }
            // read parameters from the webpage
            string htmlString = fileContents;

            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize), pdf_page_size, true);

            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation =
                (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),
                pdf_orientation, true);

            int webPageWidth = 1024;

            int webPageHeight = 1000;

            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();

            // set converter options
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
            converter.Options.WebPageWidth = webPageWidth;
            converter.Options.WebPageHeight = webPageHeight;

            // create a new pdf document converting an url
            PdfDocument doc = converter.ConvertHtmlString(htmlString, "");

            // save pdf document
            doc.Save(@"C:\Users\Home\Desktop\test\Sample.pdf");

            // close pdf document
            doc.Close();
        }

        public static string ConvertHTMLToPDFSample(string headerFile, string bodyFile, string footerFile, float headerHeight, float bodyHeight, float footerHeight)
        {

            string pdfOutput = @"C:\Users\Home\Desktop\test\" + "PDFOutput_" + DateTime.Now.ToFileTime() + ".pdf";

            // read parameters from the webpage
            string headerHtml = (headerFile != "" ? GetHtmlStream(headerFile) : "");
            string bodyHtml = GetHtmlStream(bodyFile);
            string footerHtml = (footerFile != "" ? GetHtmlStream(footerFile) : "");
            string baseURL = "";

            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize), pdf_page_size, true);

            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation = (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation), pdf_orientation, true);

            string page_layout = "SinglePage";
            PdfViewerPageLayout pageLayout = (PdfViewerPageLayout)Enum.Parse(
                typeof(PdfViewerPageLayout), page_layout, true);

            string page_mode = "UseNone";
            PdfViewerPageMode pageMode = (PdfViewerPageMode)Enum.Parse(
                typeof(PdfViewerPageMode), page_mode, true);


            int webPageWidth = 1024;

            int webPageHeight = 1000;

            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();

            bool centerWindow = true;
            bool displayDocTitle = true;
            bool fitWindow = true;
            bool hideMenuBar = false;
            bool hideToolbar = false;
            bool hideWindowUI = false;
            converter.Options.ViewerPreferences.CenterWindow = centerWindow;
            converter.Options.ViewerPreferences.DisplayDocTitle = displayDocTitle;
            converter.Options.ViewerPreferences.FitWindow = fitWindow;
            converter.Options.ViewerPreferences.HideMenuBar = hideMenuBar;
            converter.Options.ViewerPreferences.HideToolbar = hideToolbar;
            converter.Options.ViewerPreferences.HideWindowUI = hideWindowUI;
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
            converter.Options.WebPageWidth = webPageWidth;
            converter.Options.WebPageHeight = webPageHeight;

            converter.Options.ViewerPreferences.PageLayout = pageLayout;
            converter.Options.ViewerPreferences.PageMode = pageMode;
            converter.Options.ViewerPreferences.NonFullScreenPageMode = PdfViewerFullScreenExitMode.UseOC;
            converter.Options.CssMediaType = HtmlToPdfCssMediaType.Screen;

            // Header
            if (!String.IsNullOrEmpty(headerHtml))
            {
                converter.Options.DisplayHeader = true;
                PdfHtmlSection headerSection = new PdfHtmlSection(headerHtml, "");
                headerSection.AutoFitHeight = HtmlToPdfPageFitMode.AutoFit;
                converter.Header.Height = headerHeight * 0.70f; // convert pixel to printer;
                converter.Header.Add(headerSection);
               
              
            }
            //// Footer
            if (!String.IsNullOrEmpty(footerHtml))
            {
                converter.Options.DisplayFooter = true;
                PdfHtmlSection footerSection = new PdfHtmlSection(footerHtml, "");
                footerSection.AutoFitHeight = HtmlToPdfPageFitMode.AutoFit;
                converter.Footer.Height = footerHeight * 0.70f;
                converter.Footer.Add(footerSection);
            }
            // create a new pdf document converting an url
            PdfDocument doc = converter.ConvertHtmlString(bodyHtml, "");

            //if (!String.IsNullOrEmpty(headerHtml))
            //{
            //    doc.Header.Add(new PdfHtmlElement(headerHtml, ""));
            //}
            //if (!String.IsNullOrEmpty(footerHtml))
            //{
            //    doc.Footer.Add(new PdfHtmlElement(footerHtml, ""));
            //}
                // save pdf document
                doc.Save(pdfOutput);

            // close pdf document
            doc.Close();

            return pdfOutput;

        }

        private static string GetHtmlStream(string filePath)
        {
            String fileContents = "";
            using (StreamReader sr = new StreamReader(filePath))
            {
                // Read the stream to a string, and write the string to the console.
                fileContents = sr.ReadToEnd();
            }
            return fileContents;
        }
        public static Tuple<string, string, string> CreateTemplate(string headerHtml, string bodyHtml, string footerHtml)
        {
            string headerPath = CreateTemplateHeader(headerHtml);
            string bodyPath = CreateTemplateBody(bodyHtml);
            string footerPath = CreateTemplateFooter(footerHtml);
            Tuple<string, string, string> paths = new Tuple<string, string, string>(headerPath, bodyPath, footerPath);
            return paths;
        }
        public static string CreateTemplateBody(string htmlString)
        {
            String fileContents = "";
            string path = @"C:\Users\Home\Desktop\test\";
            string filePath = path + "template_" + DateTime.Now.ToFileTime() + ".html";
            using (StreamReader sr = new StreamReader(path + "template.txt"))
            {
                // Read the stream to a string, and write the string to the console.
                fileContents = sr.ReadToEnd();
            }
            fileContents = fileContents.Replace("#TemplateBody", htmlString);
            File.WriteAllText(filePath, fileContents);
            return filePath;
        }
        public static string CreateTemplateHeader(string htmlString)
        {
            if (htmlString == "") return "";
            String fileContents = "";
            string path = @"C:\Users\Home\Desktop\test\";
            string filePath = path + "templateHeader_" + DateTime.Now.ToFileTime() + ".html";
            using (StreamReader sr = new StreamReader(path + "templateHeader.txt"))
            {
                // Read the stream to a string, and write the string to the console.
                fileContents = sr.ReadToEnd();
            }
            fileContents = fileContents.Replace("#TemplateBody", htmlString);
            File.WriteAllText(filePath, fileContents);
            return filePath;
        }
        public static string CreateTemplateFooter(string htmlString)
        {
            if (htmlString == "") return "";
            String fileContents = "";
            string path = @"C:\Users\Home\Desktop\test\";
            string filePath = path + "templateFooter_" + DateTime.Now.ToFileTime() + ".html";
            using (StreamReader sr = new StreamReader(path + "templateFooter.txt"))
            {
                // Read the stream to a string, and write the string to the console.
                fileContents = sr.ReadToEnd();
            }
            fileContents = fileContents.Replace("#TemplateBody", htmlString);
            File.WriteAllText(filePath, fileContents);
            return filePath;
        }
    }

}
