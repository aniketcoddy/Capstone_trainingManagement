import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  today: Date; // Declare the 'today' property
  model: any;

  constructor() { 
    this.today = new Date();
  }

  ngOnInit(): void {
    this.today = new Date(); // Initialize with the current date
    this.model = { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
  }

  onDateSelect(date: any): void {
    this.model = date;
    console.log('Selected date:', date);
    // You can add more logic here to handle the selected date
  }
}

