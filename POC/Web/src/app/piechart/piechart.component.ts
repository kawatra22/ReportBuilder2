import { Component, Input, OnInit } from '@angular/core';

import { GooglePieChartService } from '../service/GooglePieChartService';
import { PieChartConfig } from '../config/PieChartConfig';

declare var google: any;

@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @Input() ChartHeight: number = 300;
  @Input() ChartWidth: number = 400;
  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;

  constructor(private _pieChartService: GooglePieChartService) { }

  ngOnInit(): void {
    var self = this;
    this._pieChartService.BuildPieChart(this.elementId, this.data, this.config, this.ChartHeight, this.ChartWidth);
   
  }
}
