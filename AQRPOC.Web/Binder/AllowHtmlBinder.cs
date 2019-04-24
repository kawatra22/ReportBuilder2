using System.Web.Mvc;
namespace AQRPOC.Web
{
    public class AllowHtmlBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var request = controllerContext.HttpContext.Request;
            var name = bindingContext.ModelName;
            return request.Unvalidated[name];
        }

    }
}