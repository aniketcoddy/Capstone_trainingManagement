import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BatchesComponent } from './batches/batches.component';
import { BatchRoutingModule } from './batch-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    BatchesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BatchRoutingModule
  ],
  providers: [DatePipe],
})
export class BatchModule { }
