import { Component, Input, OnInit } from '@angular/core';
import { PieChartConfig } from '../config/PieChartConfig';



@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html',
  styleUrls: ['./sample1.component.css']
})
export class Sample1Component implements OnInit {
  @Input() elementId: string = "element1";
  componentID = "Chart" + this.elementId;
  data1 = [['Task', 'Hours per Day'],
  ['Eat', 3],
  ['Commute', 2],
  ['Watch TV', 5],
  ['Video games', 4],
  ['Sleep', 10]];

  config1 = new PieChartConfig('My Daily Activities at 20 years old', 0.4);


  constructor() { }

  ngOnInit() {
  }

}
