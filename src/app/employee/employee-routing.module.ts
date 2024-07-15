import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { AvailableComponent } from './available/available.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'available', component: AvailableComponent },
  { path: 'feedbacks', component: FeedbacksComponent },
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];;;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
