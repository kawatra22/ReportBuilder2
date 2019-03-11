import { GoogleChartsBaseService } from './GoogleChartsBaseService';
import { Injectable } from '@angular/core';
import { PieChartConfig } from '../config/PieChartConfig';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig, ChartHeight:number, ChartWidth:number ) : void {  
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    var options = {
            title: config.title,
            pieHole: config.pieHole,
            width: ChartWidth, height: ChartHeight,
            chartArea: {
              left: "3%",
              top: "3%",
              height: "94%",
              width: "94%"
          },
          animation: {duration: 1000, easing: 'out'},
          legend: {position: 'labeled'}
      };
      this.buildChart(data, chartFunc, options, elementId);
      
  }
}