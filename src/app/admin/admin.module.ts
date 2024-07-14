import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { BatchesComponent } from './batches/batches.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CoursesComponent,
    BatchesComponent,
    UsersComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule
  ]
})
export class AdminModule { }
