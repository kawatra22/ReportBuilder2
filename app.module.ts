import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { sanitizeHtmlPipe } from './common/sanitize-html-pipe';

import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { PiechartComponent } from './piechart/piechart.component';
import { Sample1Component } from './sample1/sample1.component';

import { GooglePieChartService } from './service/GooglePieChartService'

import { DynamicComponent } from './dynamic/dynamic.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { LogoComponent } from './logo/logo.component';
import { ObjectiveComponent } from './objective/objective.component';
import { RiskReturnsComponent } from './risk-returns/risk-returns.component';
import { RiskAllocationComponent } from './risk-allocation/risk-allocation.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    sanitizeHtmlPipe,
    EmployeeComponent,
    PiechartComponent,
    Sample1Component,
    DynamicComponent,
    HeaderComponentComponent,
    LogoComponent,
    ObjectiveComponent,
    RiskReturnsComponent,
    RiskAllocationComponent,
    DisclaimerComponent
  ],
  exports: [
    RouterModule,
    sanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    DragAndDropModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GooglePieChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
