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
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize),pdf_page_size, true);

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

        public static string ConvertHTMLToPDFSample1(string filePath)
        {
          
            String fileContents = "";
            string pdfOutput = @"C:\Users\Home\Desktop\test\" + "PDFOutput_" + DateTime.Now.ToFileTime() + ".pdf";
            using (StreamReader sr = new StreamReader(filePath))
            {
                // Read the stream to a string, and write the string to the console.
                fileContents = sr.ReadToEnd();
            }
            // read parameters from the webpage
            string htmlString = fileContents;

            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize), pdf_page_size, true);

            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation = (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),pdf_orientation, true);

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
            converter.Options.ViewerPreferences.NonFullScreenPageMode =PdfViewerFullScreenExitMode.UseOC;
            converter.Options.CssMediaType = HtmlToPdfCssMediaType.Screen;

            // create a new pdf document converting an url
            PdfDocument doc = converter.ConvertHtmlString(htmlString, "");

            // save pdf document
            doc.Save(pdfOutput);

            // close pdf document
            doc.Close();

            return pdfOutput;

        }

        public static string CreateTemplate(string htmlString)
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
    }

}
