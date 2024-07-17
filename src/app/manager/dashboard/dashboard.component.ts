import { Component } from '@angular/core';

interface CalendarDay {
  date: number;
  inMonth: boolean;
  isBatchStart: boolean;
  isBatchEnd: boolean;
  batchInfo?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  currentDate: Date = new Date();
  activeBatches: any[] = [];
  totalEnrollments: any[] = [];
  calendarDays: CalendarDay[][] = [];
  currentMonth: number;
  currentYear: number;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [];

  constructor() {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.years = Array.from({length: 10}, (_, i) => this.currentYear + i);
  }

  ngOnInit(): void {
    this.loadActiveBatches();
    this.loadTotalEnrollments();
    this.updateCalendar();
  }

  loadActiveBatches(): void {
    // Fetch active batches from your service
    this.activeBatches = [
      { courseName: 'Java', startDate: new Date(2024, 6, 1), endDate: new Date(2024, 9, 15) },
      { courseName: 'Angular', startDate: new Date(2024, 6, 12), endDate: new Date(2024, 9, 20) },
      { courseName: 'AWS', startDate: new Date(2024, 6, 23), endDate: new Date(2024, 8, 20) },
    ];
  }

  loadTotalEnrollments(): void {
    // Fetch total enrollments from your service
    this.totalEnrollments = [
      { courseName: 'Java', employeeCount: 239 },
      { courseName: 'Angular', employeeCount: 320 },
      { courseName: 'c#', employeeCount: 200 }
    ];
  }

  updateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    this.calendarDays = [];
    let week: CalendarDay[] = [];

    // Add days from previous month
    for (let i = 0; i < startingDay; i++) {
      week.push({ date: 0, inMonth: false, isBatchStart: false, isBatchEnd: false });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, i);
      week.push({
        date: i,
        inMonth: true,
        isBatchStart: this.isBatchStartDate(currentDate),
        isBatchEnd: this.isBatchEndDate(currentDate),
        batchInfo: this.getBatchInfo(currentDate)
      });

      if (week.length === 7) {
        this.calendarDays.push(week);
        week = [];
      }
    }

    // Add days from next month
    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ date: 0, inMonth: false, isBatchStart: false, isBatchEnd: false });
      }
      this.calendarDays.push(week);
    }
  }

  changeMonth(delta: number): void {
    this.currentMonth += delta;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.updateCalendar();
  }

  isBatchStartDate(date: Date): boolean {
    return this.activeBatches.some(batch => 
      batch.startDate.getTime() === date.getTime()
    );
  }

  isBatchEndDate(date: Date): boolean {
    return this.activeBatches.some(batch => 
      batch.endDate.getTime() === date.getTime()
    );
  }

  getBatchInfo(date: Date): string {
    const startBatch = this.activeBatches.find(batch => 
      batch.startDate.getTime() === date.getTime()
    );
    const endBatch = this.activeBatches.find(batch => 
      batch.endDate.getTime() === date.getTime()
    );

    if (startBatch) return `${startBatch.courseName} (Start)`;
    if (endBatch) return `${endBatch.courseName} (End)`;
    return '';
  }
}