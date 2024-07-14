import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BatchService } from '../batches.service';

@Component({
  selector: 'app-batch-popup',
  templateUrl: './batch-popup.component.html',
  styleUrls: ['./batch-popup.component.css']
})
export class BatchPopupComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BatchPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private batchService: BatchService
  ) {
    this.form = this.fb.group({
      id: [data.id],
      name: [data.name],
      description: [data.description],
      category: [data.category],
      status: [data.status],
      startDate: [data.startDate],
      endDate: [data.endDate],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (formData.id) {
      this.batchService.updateBatch(formData.id, formData).subscribe(() => {
        this.dialogRef.close(formData);
      });
    } else {
      this.batchService.addBatch(formData).subscribe(() => {
        this.dialogRef.close(formData);
      });
    }
  }

  onDelete(): void {
    const batchId = this.form.value.id;
    if (batchId) {
      this.batchService.deleteBatch(batchId).subscribe(() => {
        this.dialogRef.close({ id: batchId });
      });
    }
  }
}
