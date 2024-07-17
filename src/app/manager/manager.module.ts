import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { BatchesComponent } from './batches/batches.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ReportsComponent } from './reports/reports.component';

import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';
import { ManagerPanelComponent } from '../manager-panel/manager-panel.component';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    
    ManagerPanelComponent,
    ManagerSidebarComponent,
    DashboardComponent,
    CoursesComponent,
    BatchesComponent,
    EnrollmentComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ManagerRoutingModule,
    SharedModule
  ]
})
export class ManagerModule { }
