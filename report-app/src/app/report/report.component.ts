import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
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
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { BlankComponent } from '../blank/blank.component';
import {TextEditorComponent} from '../text-editor/text-editor.component';
import { ChangeDetectionStrategy } from '@angular/core';

import { dtoCell } from '../DTO/dtoCell';
import { dtoRow } from '../DTO/dtoRow';

//import { from } from 'rxjs';
import { clearModulesForTest } from '@angular/core/src/linker/ng_module_factory_loader';
//import * from 'jquery';
import { identifierModuleUrl } from '@angular/compiler';
import DynamicComponent from '../dynamic/dynamic.component';
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
  tdStyle = { "min-height": "50px", "padding": "5px" };
  contentStyle = {};
  reportTemplate = [];
  @ViewChild(DynamicComponent) dc;
  // reportTemplate = [{
  //   row: 1, rowSpan: 1, cols: [
  //     {col: 1, width: 200, height: 75, rows:[]},
  //     {
  //     col: 2, width: 200, height: 75, rows: [
  //       {
  //         row: 1, rowspan: 1, cols:
  //           [{ col: 1, width: 200, height: 75, rows: [] }]
  //       },
  //       {
  //         row: 2, rowspan: 1, cols:
  //           [{ col: 1, width: 200, height: 75, rows: [] }]
  //       }
  //     ]
  //   }]
  // }];
  maxColsRange = 1;
  maxRowsRange = 1;
  splitdialog = null;
  splitColumn = 0;
  splitRow = 0;
  selectedCell = new dtoCell();
  selctedComponent: any;
  // Template Component Data
  templateComponent = [];
  // Component List
  myComponents = [{ id: "Component1", component: EmployeeComponent, row: 0, col: 0, inputs: { showNum: 0 }, uid: "" },
  { id: "Component2", row: 0, col: 0, component: Sample1Component, inputs: { showNum: 1 }, uid: "" },
  { id: "HeaderComponent", row: 0, col: 0, component: HeaderComponentComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "LogoComponent", row: 0, col: 0, component: LogoComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "ObjectiveComponent", row: 0, col: 0, component: ObjectiveComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "RiskReturnsComponent", row: 0, col: 0, component: RiskReturnsComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "RiskAllocationComponent", row: 0, col: 0, component: RiskAllocationComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "DisclaimerComponent", row: 0, col: 0, component: DisclaimerComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "BlankComponent", row: 0, col: 0, component: BlankComponent, inputs: { showNum: 1 }, uid: "" },
  { id: "TextEditorComponent", row: 0, col: 0, component: TextEditorComponent, inputs: { showNum: 1 } }
  ];

  constructor(private changeRef: ChangeDetectorRef,private http: HttpClient) {
    this.templates = [{ text: "1x1", value: "1x1" }, { text: "1x2", value: "1x2" }, { text: "1x3", value: "1x3" },
    { text: "2x1", value: "2x1" }, { text: "2x2", value: "2x2" }, { text: "2x3", value: "2x3" },
    { text: "3x1", value: "3x1" }, { text: "3x2", value: "3x2" }, { text: "3x3", value: "3x3" }];
  }

  ngOnInit() {

    // this.reportTemplate = JSON.parse( localStorage.getItem("savedRows"));
    // this.templateComponent = JSON.parse( localStorage.getItem("savedComponent"));
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
      var cName = "Component_" + colData.id;
      var cItems = this.templateComponent.filter(it => it.id == cName);
      items[0].row = rowData.row;
      items[0].col = colData.col;
      items[0].uid = colData.id;
      cItems[0][cName] = items[0];
      this.changeRef.detectChanges();
      this.SetComponenttName(this.reportTemplate,items[0].id, colData.id);
      
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
    var cName = "Component_" + colData.id;
    var items = this.templateComponent.filter(it => it.id == cName);
    return items[0][cName];
  }

  GetStyle(rowData: any, colData: any) {
    var style = {};
    if (colData.rows.length > 0) {
      style["min-height"] = "0px";
      style["height"] = "0px";
      style["padding"] = "0px";
      style["background-color"] = "#f7f7f7";
    }
    else {
      style["min-height"] = "75px";
      //style["border"] = "solid 1px red";
    }
    return style;
  }

  // Create Teample base on the selection
  AddTemplate(rows: number, cols: number, parentID: any) {
    this.maxColsRange = this.maxColsRange < cols ? cols : this.maxColsRange;
    var LastRowIndex = this.reportTemplate.length == 0 ? 0 : this.reportTemplate[this.reportTemplate.length - 1].row;
    parentID = parentID == null ? 0 : parentID;
    for (var i = 0; i < rows; i++) {
      var rowObj = new dtoRow()
      rowObj["row"] = ++LastRowIndex;
      rowObj["rowSpan"] = 1;
      rowObj["cols"] = []
      rowObj["rowStyle"] = "pageBody";
      rowObj["IsChild"] = false;
      //var columnHeight = Math.round((window.innerHeight - 100) / this.row);
      var columnWidth = Math.round((window.innerWidth - 220) / this.column);

      for (var j = 0; j < cols; j++) {
        var cell = new dtoCell();
        cell.col = j + 1;
        cell.colSpan = 1;
        cell.height = 75;
        cell.id = parentID + "_" + String(LastRowIndex) + String(j + 1);;
        cell.parentID = parentID;
        cell.rows = [];
        cell.width = columnWidth;
        rowObj["cols"].push(cell);
        //rowObj["cols"].push({ "col": j + 1, width: columnWidth, height: 75, colSpan: 1, "rows": [], id: "id", "parentID": parentID })
      }
      this.reportTemplate.push(rowObj);
    }
    this.BuildComponentDataObject(this.reportTemplate);
    this.ColumnResize();
  }

  ColumnResize() {
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

  BuildComponentDataObject(tData: Array<dtoRow>) {
    // prepare component data objects
    var index = 0;
    for (var i = 0; i < tData.length; i++) {
      var r = tData[i];
      for (var j = 0; j < r.cols.length; j++) {
        var cName = "Component_" + r.cols[j].id;
        var cObj = { "row": r.row, "col": r.cols[j].col, id: cName }
        cObj[cName] = null;
        // check already exist or not
        var comp = this.templateComponent.filter(function (record, index) {
          return record.id == cName;
        })

        if (comp.length == 0)
          this.templateComponent.push(cObj);

        if (r.cols[j].rows.length > 0) {
          this.BuildComponentDataObject(r.cols[j].rows); // recursively call to set data object on each cell
        }
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

  SetComponenttName(tData: Array<dtoRow>, name:string, id:string)
  {
    tData.forEach(record => {
      record.cols.forEach(col => {
        if (col.id == id) {
          col.componentName = name;
          return;
        }
        else if (col.rows.length > 0) {
          this.SetComponenttName(col.rows, name, id);
        }
        });
      });
  }

  /****************************SPLIT Functionality **************************/
  SplitOperation(rowData: any, colData: any) {
    this.splitdialog = $("#splitDialog").dialog({ modal: true })
    this.selectedCell = colData;
  }
  CloseSplitDialog() {
    this.splitdialog.dialog("close")
  }
  SplitSelect(templateVal: any) {
    var arr = templateVal.split('x');
    this.splitRow = parseInt(arr[0]);
    this.splitColumn = parseInt(arr[1]);
  }
  AddSplit(rows: number, cols: number) {
    var fromID = "Component_" + this.selectedCell.id;
    var toID = "Component_" + this.selectedCell.id + "_11";
    this.templateComponent.forEach(record => {
      if (record.id == fromID) {
        this.selctedComponent = record[fromID];
        record[fromID] = this.GetBlankComponent(1, this.selectedCell.col, this.selectedCell.id);
        //this.dc.DestroyComponent(this.selectedCell.id);
        return;
      }
    });
    this.UpdateCellSplit(this.reportTemplate, rows, cols);
    this.BuildComponentDataObject(this.reportTemplate);
    this.ColumnResize();
    this.CloseSplitDialog();

   
    this.ShiftComponent(fromID, toID);
   
  }

  UpdateCellSplit(tData: Array<dtoRow>, rows: number, cols: number) {
    tData.forEach(record => {
      record.cols.forEach(col => {
        if (col.id == this.selectedCell.id) {
          var LastRowIndex = 0;
          for (var i = 0; i < rows; i++) {
            var rowObj = new dtoRow()
            rowObj["row"] = ++LastRowIndex;
            rowObj["rowSpan"] = 1;
            rowObj["cols"] = []
            // rowObj["rowStyle"] = "";
            // rowObj["IsChild"] = true;
            //var columnHeight = Math.round((window.innerHeight - 100) / this.row);
            var columnWidth = Math.round((window.innerWidth - 220) / this.column);

            for (var j = 0; j < cols; j++) {
              var cell = new dtoCell();
              cell.col = j + 1;
              cell.colSpan = 1;
              cell.height = 75;
              cell.id = col.id + "_" + String(LastRowIndex) + String(j + 1);;
              cell.parentID = col.id;
              cell.rows = [];
              cell.width = columnWidth;
              rowObj["cols"].push(cell);
            }
            col.rows.push(rowObj);
          }
        }
        else if (col.rows.length > 0) {
          this.UpdateCellSplit(col.rows, rows, cols);
        }
      });
    })
  }
  ShiftComponent(fromID: string, toId: string) {
    this.templateComponent.forEach(record => {
      if (record.id == toId) {
        record[toId] = this.selctedComponent;
        return;
      }
    });
  }

  GetBlankComponent(row: number, col: number, uid: string) {
    var items = this.myComponents.filter(it => it.id == "BlankComponent");
    // Identify Component Data
    items[0].row = row;
    items[0].col = col;
    items[0].uid = uid;
    return items[0];
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

  // Element check is parent or child
  CheckElement(element:any, className:string)
  {
    var len = $(element).parents("."+ className).length;
    if( len > 0)
    {
      return false;
    }
    return true;
  }

  GetHTMLWithEditor(element:any, id :string)
  {
    var htmlElement  = $(element).clone();
    var editors  = $(htmlElement).find(".ngx-editor-textarea");
    var html = "";
    $.each(editors, function(i,ele){
        html = $(ele).html();
        id = $(ele).parents(".inputEditor").attr("id");
        $(htmlElement).find("#" + id).parent().html(html);
    });
    return {
      html : $(htmlElement).html(),
      height : $(htmlElement).height()
    }
  }

  PrintPDF()
  {
    var self = this;
    // Header Text box changes
    $(".headerText").hide();
    $(".headerSpan").show();
    var headerHtml = "";
    var headerHeight = 0;
    $.each($(".pageHeader"), function(i,element){
      if(self.CheckElement(element,"pageHeader"))
      {
        if($(element).find(".inputEditor").length > 0)
        {
          var result = self.GetHTMLWithEditor(element,"");
          headerHtml += result.html
          headerHeight +=$(element).height();
        }
        else{
        headerHtml +=$(element).parent().html()
        headerHeight+=$(element).height();
        }
    }
    })
    var bodyHtml = "";
    var bodyHeight = 0;
    $.each($(".pageBody"), function(i,element){
      if(self.CheckElement(element,"pageBody"))
      {
        if($(element).find(".inputEditor").length > 0)
        {
          var result = self.GetHTMLWithEditor(element,"");
          bodyHtml += result.html
          bodyHeight+=$(element).height();
        }
        else{
        bodyHtml += $(element).parent().html()
        bodyHeight+=$(element).height();
        }
      }
    });
    var footerHtml = "";
    var footerHeight = 0;
    $.each($(".pageFooter"), function(i,element){
      if(self.CheckElement(element,"pageFooter"))
      {
      if($(element).find(".inputEditor").length > 0)
      {
        var result = self.GetHTMLWithEditor(element,"");
        footerHtml += result.html
        footerHeight+=$(element).height();
      }
      else{
       footerHtml += $(element).parent().html()
       footerHeight+=$(element).height();
      }
    }
    });
    var contentFull = $("#content-wrapper").html();
    $.ajax({
      url: "http://localhost:55695/Home/GetPDF",
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

