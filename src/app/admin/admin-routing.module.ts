import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'batches', loadChildren: () => import('./batches/batches.module').then(m => m.BatchesModule) },
  { path: 'reports', component: ReportsComponent },
  { path: 'users', component: UsersComponent },
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }