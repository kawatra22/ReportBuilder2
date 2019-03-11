import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { rootRenderNodes } from '@angular/core/src/view';
import { RouterLinkWithHref } from '@angular/router';
import { DropEvent } from 'angular-draggable-droppable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { $ } from 'protractor';

import { EmployeeComponent } from '../employee/employee.component'
import { Sample1Component } from '../sample1/sample1.component';
import { HeaderComponentComponent } from '../header-component/header-component.component'
import { LogoComponent } from '../logo/logo.component';
import { ObjectiveComponent } from '../objective/objective.component'
import { RiskReturnsComponent } from '../risk-returns/risk-returns.component'
import { RiskAllocationComponent } from '../risk-allocation/risk-allocation.component';
import {DisclaimerComponent} from '../disclaimer/disclaimer.component';
import {TextEditorComponent} from '../text-editor/text-editor.component';
import { ChangeDetectionStrategy } from '@angular/core';
import {dtoTemplate} from '../DTO/dtoTemplate';

declare var $: any;
// PDF Print
// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReportComponent implements OnInit {
  public templates: any[];
  row: number = 1;
  column: number = 1;
  rowArray: any[];
  columnArray: any[];
  droppedData: string;
  tdStyle = {};
  contentStyle = {};
  reportTemplate = [];
  maxColsRange = 1;
  maxRowsRange = 1;
  dto:any = new dtoTemplate();


  // Template Component Data
  templateComponent = [];
  // Component List
  myComponents = [{ id: "Component1", component: EmployeeComponent, row: 0, col: 0, inputs: { showNum: 0 } },
  { id: "Component2", row: 0, col: 0, component: Sample1Component, inputs: { showNum: 1 } },
  { id: "HeaderComponent", row: 0, col: 0, component: HeaderComponentComponent, inputs: { showNum: 1 } },
  { id: "LogoComponent", row: 0, col: 0, component: LogoComponent, inputs: { showNum: 1 } },
  { id: "ObjectiveComponent", row: 0, col: 0, component: ObjectiveComponent, inputs: { showNum: 1 } },
  { id: "RiskReturnsComponent", row: 0, col: 0, component: RiskReturnsComponent, inputs: { showNum: 1 } },
  { id: "RiskAllocationComponent", row: 0, col: 0, component: RiskAllocationComponent, inputs: { showNum: 1 } },
  { id: "DisclaimerComponent", row: 0, col: 0, component: DisclaimerComponent, inputs: { showNum: 1 } },
  { id: "TextEditorComponent", row: 0, col: 0, component: TextEditorComponent, inputs: { showNum: 1 } }
  ];

  constructor(private changeRef: ChangeDetectorRef, private http: HttpClient) {
    this.templates = [{ text: "1x1", value: "1x1" }, { text: "1x2", value: "1x2" }, { text: "1x3", value: "1x3" },
    { text: "2x1", value: "2x1" }, { text: "2x2", value: "2x2" }, { text: "2x3", value: "2x3" },
    { text: "3x1", value: "3x1" }, { text: "3x2", value: "3x2" }, { text: "3x3", value: "3x3" }];
  }

  ngOnInit() {

  }

  // Handle Drag Event
  dragEnd(event: any) {
    //console.log('Element was dragged', event);
  }

  // Handle Drop Event
  onDrop(dropData: any, rowData: any, colData: any) {
    this.droppedData = dropData;
    setTimeout(() => {
      console.log('Component:', dropData.dropData);
      console.log('Row: ', rowData.row);
      console.log('Column: ', colData.col);

      // this.componentData = _.find(this.myComponents, 
      //   {id:componentId});

      var items = this.myComponents.filter(it => it.id == dropData.dropData);

      // Identify Component Data
      var cName = "Component" + String(rowData.row) + String(colData.col);
      var cItems = this.templateComponent.filter(it => it.row == rowData.row && it.col == colData.col);
      items[0].row = rowData.row;
      items[0].col = colData.col;
      cItems[0][cName] = items[0];
      this.changeRef.detectChanges();

    }, 200);
  }

  templateChange(templateVal: any) {
    var arr = templateVal.split('x');
    this.row = parseInt(arr[0]);
    this.column = parseInt(arr[1]);
    this.rowArray = []; this.columnArray = [];
  }

  CheckComponent(rowData: any, colData: any) {
    var items = this.templateComponent.filter(it => it.row == rowData.row && it.col == colData.col);
    return items[0].show;
  }

  GetComponent(rowData: any, colData: any) {
    var cName = "Component" + String(rowData.row) + String(colData.col);
    var items = this.templateComponent.filter(it => it.row == rowData.row && it.col == colData.col);
    return items[0][cName];
  }

  GetClassName(rowData: any, colData: any) {
    var cName = "Class" + String(rowData.row) + String(colData.col);
    return cName;
  }

  AddTemplate(rows: number, cols: number) {
    this.maxColsRange = this.maxColsRange < cols ? cols : this.maxColsRange;
    var LastRowIndex = this.reportTemplate.length == 0 ? 0 : this.reportTemplate[this.reportTemplate.length - 1].row;
    for (var i = 0; i < rows; i++) {
      var rowObj = {};
      rowObj["row"] = ++LastRowIndex;
      rowObj["rowSpan"] = 1;
      rowObj["cols"] = [];
      rowObj["rowStyle"] = "pageBody";
      //var columnHeight = Math.round((window.innerHeight - 100) / this.row);
      var columnWidth = Math.round((window.innerWidth - 220) / this.column);

      for (var j = 0; j < cols; j++) {
        rowObj["cols"].push({ "col": j + 1, width: columnWidth, height: 75, colSpan: 1 })
      }
      this.reportTemplate.push(rowObj);
    }
    this.BuildComponentDataObject();

    var height = Math.round(window.innerHeight - 75);
    this.contentStyle = { "height": String(height) + "px" };

    setTimeout(() => {
      var pressed = false;
      var start = undefined;
      var startX, startWidth;
      $(".templateTable td").mousedown(function (e) {
        console.log("mouseDown");
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
        $(start).addClass("resizing");
      });

      $(document).mousemove(function (e) {
        if (pressed) {
          $(start).width(startWidth - (e.pageX - startX));
        }
      });

      $(document).mouseup(function () {
        if (pressed) {
          $(start).removeClass("resizing");
          pressed = false;
        }
      });
    }, 200);
  }

  BuildComponentDataObject() {
    // prepare component data objects
    var index = 0;
    for (var i = 0; i < this.reportTemplate.length; i++) {
      var r = this.reportTemplate[i];
      for (var j = 0; j < r.cols.length; j++) {
        var cName = "Component" + String(r.row) + String(r.cols[j].col);
        var cObj = { "row": r.row, "col": r.cols[j].col }
        cObj[cName] = null;
        // check already exist or not
        var comp = $.grep(this.templateComponent, function (record) {
          return record.row == r.row && record.col == r.cols[j].col
        })
        if (comp.length == 0)
          this.templateComponent.push(cObj);
      }
    }
  }

  DeleteTemplate(rowData: any, colData: any) {
    var self = this;
    $.each(self.reportTemplate, function (i, record) {
      if (record.row == rowData.row) {
        self.reportTemplate.splice(i, 1);
        return;
      }
    });
    var i = 0;
    while (i < self.templateComponent.length) {
      var record = self.templateComponent[i];
      if (record.row == rowData.row) {
        self.templateComponent.splice(i, 1);
      }
      else {
        i++;
      }
    }
  }

  PageBreakStyle(rowData: any, colData: any)
  {
    this.ChangeStyle(rowData,colData,"pageBreak",false);
  }
  HeaderStyle(rowData: any, colData: any)
  {
   this.ChangeStyle(rowData,colData,"pageHeader",true);
  }

  FooterStyle(rowData: any, colData: any)
  {
   this.ChangeStyle(rowData,colData,"pageFooter",true);
  }

  ChangeStyle(rowData: any, colData: any,cssClass:string,removeBody:boolean )
  {
    var self = this;
    $.each(self.reportTemplate, function (i, record) {
      if (record.row == rowData.row) {
        if(record["rowStyle"].indexOf(cssClass) == -1)
        {
          // add page break style
         record["rowStyle"] += " "+cssClass;
         if(removeBody)
         {
          record["rowStyle"] = record["rowStyle"].replace("pageBody","blankCss");
         }
         $(event.target).addClass("highlightIcon")
        }
        else
        {
          // remove style
          record["rowStyle"] = record["rowStyle"].replace(" "+cssClass,"");
          if(removeBody)
          {
            record["rowStyle"] = record["rowStyle"].replace("blankCss","pageBody");
          }
          $(event.target).removeClass("highlightIcon")
        }
        return;
      }
    });
  }
  PrintPDF()
  {
    // Header Text box changes
    $(".headerText").hide();
    $(".headerSpan").show();
    var headerHtml = "";
    var headerHeight = 0;
    $.each($(".pageHeader"), function(i,element){
      headerHtml +=$(element).parent().html()
      headerHeight+=$(element).height();
    })
    var bodyHtml = "";
    var bodyHeight = 0;
    $.each($(".pageBody"), function(i,element){
      bodyHtml += $(element).parent().html()
      bodyHeight+=$(element).height();
    });
    var footerHtml = "";
    var footerHeight = 0;
    $.each($(".pageFooter"), function(i,element){
       footerHtml += $(element).parent().html()
       footerHeight+=$(element).height();
    });
    $.ajax({
      url: "http://localhost:49841/Home/GetPDF",
      type: 'POST',
      async: true,
      data: {
        headerHtml: headerHtml,
        bodyHtml:bodyHtml,
        footerHtml:footerHtml,
        headerHeight:headerHeight,
        bodyHeight:bodyHeight,
        footerHeight:footerHeight
      },
      xhrFields: {
        responseType: 'blob'
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
          console.log("Error while posting SendResult");
      },
      success: function (response :any, status :any, xhr:any) {
        var blob = new Blob([response], { type: "application/pdf" });
        var URL = window.URL;
        var downloadUrl = URL.createObjectURL(blob);

        var filename = "Sample.pdf";                   
        var disposition = xhr.getResponseHeader('Content-Disposition');

         if (disposition) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
        } 
        var linkelem = document.createElement('a');
        try {
        var blob = new Blob([response], { type: 'application/pdf' });                        

            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL;
                var downloadUrl = URL.createObjectURL(blob);
                if (filename) { 
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                      document.location.href = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.target = "_blank";
                        a.rel ="noopener";
                        a.click();
                    }
                } else {
                  document.location.href = downloadUrl;
                }
            }   

        } catch (ex) {
            console.log(ex);
            $(".headerText").show();
            $(".headerSpan").hide();
        } 
      }
    });

    $(".headerText").show();
    $(".headerSpan").hide();
  }
  
}

