import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-returns',
  templateUrl: './risk-returns.component.html',
  styleUrls: ['./risk-returns.component.css']
})
export class RiskReturnsComponent implements OnInit {

  decemberData = [ { "Lable": "Value", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Momentum", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Carry", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Defensive", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Total", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" }
  ]

  QtrData = [ { "Lable": "Value", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Momentum", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Carry", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Defensive", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Total", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" }
  ]

  YearData = [ { "Lable": "Value", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Momentum", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Carry", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Defensive", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" },
  { "Lable": "Total", "Stocks": "-1.3%", "Equaity":"-0.3%", "Fixed":"2.7%", "Currencies":"0.0%", "Comm":"1.6%", "Total": "2.6%" }
  ]
  constructor() { }

  ngOnInit() {
  }

  GetClassName(lable)
  {
    if(lable=="Total")
    {
      return "trBorderTop";
    }
    else
    return "";
  }
}
