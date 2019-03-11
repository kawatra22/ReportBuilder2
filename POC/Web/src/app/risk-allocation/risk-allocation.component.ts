import { Component,Input, OnInit } from '@angular/core';
import { PieChartConfig } from '../config/PieChartConfig';
@Component({
  selector: 'app-risk-allocation',
  templateUrl: './risk-allocation.component.html',
  styleUrls: ['./risk-allocation.component.css']
})
export class RiskAllocationComponent implements OnInit {
  @Input() elementId: string = "element1";
  componentID = "Chart" + this.elementId;
  dataAllocation = [['Task', 'Hours per Day'],
  ['Commodities', 14],
  ['Currencies', 19],
  ['Fixed Income', 13],
  ['Equity Markets', 17],
  ['Stockes & Industries', 36]];

  config = new PieChartConfig('', 0);

  constructor() { }

  ngOnInit() {
  }

}
