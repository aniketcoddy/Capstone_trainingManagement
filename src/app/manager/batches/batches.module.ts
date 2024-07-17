import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BatchesComponent } from './batches/batches.component';
import { BatchRoutingModule } from './batch-routing.module';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BatchesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BatchRoutingModule,
    HttpClientModule
  ],
  providers: [DatePipe],
})
export class BatchModule { }
