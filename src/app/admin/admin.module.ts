import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { BatchesComponent } from './batches/batches.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminSidebarComponent,
    DashboardComponent,
    CoursesComponent,
    BatchesComponent,
    UsersComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class AdminModule { }
