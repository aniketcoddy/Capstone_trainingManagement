import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { AvailableComponent } from './available/available.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { EmployeePanelComponent } from '../employee-panel/employee-panel.component';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EmployeePanelComponent,
    EmployeeSidebarComponent,
    DashboardComponent,
    CoursesComponent,
    AvailableComponent,
    FeedbacksComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
    
  ]
})
export class EmployeeModule { }
