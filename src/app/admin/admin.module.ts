import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { BatchesModule } from './batches/batches.module';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbDatepickerModule

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminSidebarComponent,
    DashboardComponent,
    CoursesComponent,
    UsersComponent,
    ReportsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NgbModule,
    SharedModule,
    BatchesModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    NgbDatepickerModule
  ]
})
export class AdminModule { }
