import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BatchesComponent } from './batches/batches.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BatchesComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: BatchesComponent }])
  ]
})
export class BatchesModule { }
