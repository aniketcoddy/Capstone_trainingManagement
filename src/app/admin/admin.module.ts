import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { BatchesComponent } from './batches/batches.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
//import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    CoursesComponent,
    BatchesComponent,
    UsersComponent,
    ReportsComponent,
    //FilterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
