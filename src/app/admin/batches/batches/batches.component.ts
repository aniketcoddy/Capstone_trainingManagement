import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  @ViewChild('batchModal') batchModal!: ElementRef;
  currentDate: Date = new Date();
  batches: any[] = [];
  courses: any[] = [];
  batchForm: any = {};
  isEdit: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBatches();
    this.loadCourses();
  }

  loadBatches() {
    this.http.get<any[]>('http://localhost:5092/api/batches').subscribe(
      data => {
        console.log('Batches loaded:', data); // Logging
        this.batches = data.filter(batch => batch.status);
      },
      error => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  loadCourses() {
    this.http.get<any[]>('http://localhost:5150/api/courses').subscribe(
      data => {
        console.log('Courses loaded:', data); // Logging
        this.courses = data.filter(course => course.status);
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  openAddBatchModal() {
    this.isEdit = false;
    this.batchForm = {};
    const modal = new bootstrap.Modal(this.batchModal.nativeElement);
    modal.show();
  }

  openEditBatchModal(batch: any) {
    this.isEdit = true;
    this.batchForm = { ...batch };
    const modal = new bootstrap.Modal(this.batchModal.nativeElement);
    modal.show();
  }

  saveBatch() {
    console.log('saveBatch called'); // Debugging log
    console.log('isEdit:', this.isEdit); // Debugging log
    console.log('batchForm:', this.batchForm); // Debugging log

    if (this.isEdit) {
      this.http.put(`http://localhost:5092/api/batches/${this.batchForm.id}`, this.batchForm).subscribe(
        () => {
          console.log('Batch updated successfully'); // Debugging log
          this.loadBatches();
          const modal = bootstrap.Modal.getInstance(this.batchModal.nativeElement);
          modal.hide();
        },
        error => {
          console.error('Error saving batch:', error);
        }
      );
    } else {
      this.batchForm.status = true;
      this.http.post('http://localhost:5092/api/batches', this.batchForm).subscribe(
        () => {
          console.log('Batch added successfully'); // Debugging log
          this.loadBatches();
          const modal = bootstrap.Modal.getInstance(this.batchModal.nativeElement);
          modal.hide();
        },
        error => {
          console.error('Error adding batch:', error);
        }
      );
    }
  }

  deleteBatch(id: number) {
    console.log('deleteBatch called for id:', id);
    this.http.patch(`http://localhost:5092/api/batches/delete/${id}`, { status: false }).subscribe(
      () => {
        console.log('Batch deleted successfully');
        this.loadBatches();
      },
      error => {
        console.error('Error deleting batch:', error);
        console.log('Error details:', error.message, error.status, error.url, error.name);
      }
    );
  }
}
