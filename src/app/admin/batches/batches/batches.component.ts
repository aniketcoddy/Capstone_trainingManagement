import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BatchService } from '../batches.service';
import { BatchPopupComponent } from '../batch-popup/batch-popup.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  batches: any[] = [];
  view: 'calendar' | 'list' = 'list'; // Default to list view

  constructor(private batchService: BatchService, public dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches() {
    this.batchService.getBatches().subscribe(data => {
      this.batches = data.map(batch => ({
        ...batch,
        startDate: new Date(batch.startDate) // Convert startDate to Date object
      }));
    });
  }

  openDialog(batch?: any): void {
    const dialogRef = this.dialog.open(BatchPopupComponent, {
      width: '250px',
      data: batch ? { ...batch } : { name: '', description: '', category: '', status: '', startDate: '', endDate: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.batchService.updateBatch(result.id, result).subscribe(() => {
            this.loadBatches();
          });
        } else {
          this.batchService.addBatch(result).subscribe(() => {
            this.loadBatches();
          });
        }
      }
    });
  }

  deleteBatch(id: number): void {
    this.batchService.deleteBatch(id).subscribe(() => {
      this.loadBatches();
    });
  }

  onDateSelect(date: Date | null): void {
    if (!date) {
      return;
    }

    // Convert selected date to UTC string to match the format from the database
    const selectedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    const selectedBatch = this.batches.find(batch => {
      const batchStartDate = new Date(batch.startDate).toISOString();
      return batchStartDate.includes(selectedDate.substr(0, 10)); // Compare only date part
    });

    if (selectedBatch) {
      this.openDialog(selectedBatch);
    } else {
      // If no batch found, create a new batch for the selected date
      this.openDialog({ startDate: selectedDate, endDate: new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString() });
    }
  }

  toggleView(view: 'calendar' | 'list') {
    this.view = view;
  }

  dateClass = (d: Date): string => {
    const date = this.datePipe.transform(d, 'yyyy-MM-dd');
    return this.batches.find(batch => {
      const batchStartDate = this.datePipe.transform(new Date(batch.startDate), 'yyyy-MM-dd');
      return batchStartDate === date;
    }) ? 'highlight' : '';
  };
}
