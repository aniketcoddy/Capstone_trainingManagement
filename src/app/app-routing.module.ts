// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { AuthGuard } from './services/auth.guard'; // Import AuthGuard
import { RoleGuard } from './services/role.guard'; // Import RoleGuard if using

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard] // Example: Apply both AuthGuard and RoleGuard
  },
  {
    path: 'manager',
    component: ManagerPanelComponent,
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
    canActivate: [AuthGuard, RoleGuard] // Example: Apply both AuthGuard and RoleGuard
  },
  {
    path: 'employee',
    component: EmployeePanelComponent,
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard, RoleGuard] // Example: Apply only AuthGuard
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
