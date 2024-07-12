import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ManagerSidebarComponent } from './manager-sidebar/manager-sidebar.component';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ManagerSidebarComponent,
    EmployeeSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ManagerSidebarComponent,
    EmployeeSidebarComponent
  ]
})
export class SharedModule { }