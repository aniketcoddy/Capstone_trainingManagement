import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  currentDate: Date = new Date();
  batches: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBatches();
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
}
