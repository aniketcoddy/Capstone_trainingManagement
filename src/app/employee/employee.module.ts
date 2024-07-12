import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { AvailableComponent } from './available/available.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CoursesComponent,
    AvailableComponent,
    FeedbacksComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
    
  ]
})
export class EmployeeModule { }
