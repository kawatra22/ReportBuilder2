import { Component, Input, OnInit } from '@angular/core';
import { PieChartConfig } from '../config/PieChartConfig';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() elementId: string = "element1";
  componentID = "Chart" + this.elementId;
  data2 = [['Task', 'Hours per Day'],
   ['Work',     11],
   ['Eat',      2],
   ['Commute',  2],
   ['Watch TV', 2],
   ['Sleep',    7]]
 
 config = new PieChartConfig('My Daily Activities at 30 years old', 0.4);
  constructor() { }

  ngOnInit() {
  }
}
