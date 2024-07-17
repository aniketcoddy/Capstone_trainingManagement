import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BatchesComponent } from './batches/batches.component';

const routes: Routes = [
  { path: '', component: BatchesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class BatchRoutingModule { }


