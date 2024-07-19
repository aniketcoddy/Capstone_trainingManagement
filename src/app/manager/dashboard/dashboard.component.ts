import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

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
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  activeBatches: any[] = [];
  totalEnrollments: any[] = [];
  calendarDays: CalendarDay[][] = [];
  currentMonth: number;
  currentYear: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [];
  userName: string | null = null;
  userId: number | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => this.currentYear + i);
  }

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.loadActiveBatches();
    this.loadTotalEnrollments();
    this.updateCalendar();
  }

  loadActiveBatches(): void {
    this.http.get<any[]>('http://localhost:5092/api/batches').subscribe(batches => {
      console.log('Batches fetched:', batches); // Log fetched batches
  
      // Fetch course details for each batch
      const courseRequests = batches.map(batch =>
        this.http.get<any>(`http://localhost:5150/api/courses/details/${batch.courseId}`).toPromise()
      );
  
      Promise.all(courseRequests).then(courses => {
        console.log('Courses fetched:', courses); // Log fetched courses
  
        // Create a mapping of course IDs to course names
        const courseMap = new Map<number, string>();
        courses.forEach((course: any) => {
          console.log('Course detail:', course); // Log each course detail
          courseMap.set(course.id, course.name); // Ensure correct property name
        });
  
        console.log('Course Map:', Array.from(courseMap.entries())); // Log course map entries
  
        // Map batches with course names
        this.activeBatches = batches.map(batch => {
          const courseName = courseMap.get(batch.courseId) || 'Unknown Course';
          return {
            ...batch,
            startDate: new Date(batch.startDate), // Convert startDate to Date
            endDate: new Date(batch.endDate),     // Convert endDate to Date
            courseName
          };
        });
  
        console.log('Active Batches with course names:', this.activeBatches); // Log final batches with course names
  
        this.updateCalendar();
      }).catch(error => {
        console.error('Error fetching course details:', error);
      });
    });
  }
  
  
  

  loadTotalEnrollments(): void {
    this.http.get<any[]>('http://localhost:5175/api/enrollments/active').subscribe(enrollments => {
      console.log('Enrollments fetched:', enrollments); // Log fetched enrollments
  
      this.http.get<any[]>('http://localhost:5150/api/courses').subscribe(courses => {
        console.log('Courses fetched:', courses); // Log fetched courses
  
        // Ensure correct property names for course mapping
        const courseMap = new Map<number, string>();
        courses.forEach(course => {
          console.log('Course detail:', course); // Log each course detail
          courseMap.set(course.id, course.name); // Ensure correct property names
        });
  
        console.log('Course Map:', Array.from(courseMap.entries())); // Log course map entries
  
        // Map enrollments to course names
        const enrollmentsByCourse: { courseName: string, employeeCount: number }[] = [];
  
        enrollments.forEach(enrollment => {
          const courseName = courseMap.get(enrollment.courseId);
          const existing = enrollmentsByCourse.find(e => e.courseName === courseName);
          if (existing) {
            existing.employeeCount += 1;
          } else {
            enrollmentsByCourse.push({
              courseName: courseName || 'Unknown Course',
              employeeCount: 1
            });
          }
        });
  
        console.log('Total Enrollments:', enrollmentsByCourse); // Log total enrollments
  
        this.totalEnrollments = enrollmentsByCourse;
      }, error => {
        console.error('Error fetching courses:', error);
      });
    }, error => {
      console.error('Error fetching enrollments:', error);
    });
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
    return this.activeBatches.some(batch => new Date(batch.startDate).getTime() === date.getTime());
  }

  isBatchEndDate(date: Date): boolean {
    return this.activeBatches.some(batch => new Date(batch.endDate).getTime() === date.getTime());
  }

  getBatchInfo(date: Date): string {
    const startBatch = this.activeBatches.find(batch => new Date(batch.startDate).getTime() === date.getTime());
    const endBatch = this.activeBatches.find(batch => new Date(batch.endDate).getTime() === date.getTime());

    if (startBatch) return `${startBatch.courseName} (Start)`;
    if (endBatch) return `${endBatch.courseName} (End)`;
    return '';
  }
}
