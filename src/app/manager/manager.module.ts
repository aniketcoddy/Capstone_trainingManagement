import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { BatchModule } from './batches/batches.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ReportsComponent } from './reports/reports.component';

import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';
import { ManagerPanelComponent } from '../manager-panel/manager-panel.component';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
    ManagerPanelComponent,
    ManagerSidebarComponent,
    DashboardComponent,
    CoursesComponent,
    EnrollmentComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    BatchModule,
    FormsModule,
  ]
})
export class ManagerModule { }
