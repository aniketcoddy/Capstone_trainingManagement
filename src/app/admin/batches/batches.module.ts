import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendarBody } from '@angular/material/datepicker';

import { BatchesComponent } from './batches/batches.component';
import { BatchPopupComponent } from './batch-popup/batch-popup.component';
import { BatchService } from './batches.service';
import { BatchRoutingModule } from './batch-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    BatchesComponent,
    BatchPopupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCalendarBody,
    BatchRoutingModule
  ],
  providers: [BatchService,DatePipe],
})
export class BatchModule { }
