declare var google: any;
declare var $: any
export class GoogleChartsBaseService {
  constructor() { 
    google.charts.load('current', {'packages':['corechart']});
  }

  protected buildChart(data: any[], chartFunc: any, options: any, elementId: string) : void {
    var func = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
      $("#" + elementId).children().children().css("margin","auto");
    };   
    var callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }
  
}