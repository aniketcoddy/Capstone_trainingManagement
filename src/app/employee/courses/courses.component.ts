import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Batch {
  name: string;
  teacher: string;
  rating: number;
  duration: number;
  startDate: string;
  endDate: string;
  progress: number;
  imageUrl: string;
}

interface UpcomingSession {
  name: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  currentDate: Date = new Date();
  batchGroups: Batch[][] = [];
  upcomingSessions: UpcomingSession[] = [];

  private readonly MAX_UPCOMING_SESSIONS = 5;
  private readonly MAX_BATCHES = 10;

  private batchImages = [
    'assets/hrm-min.png',
    'assets/machine-learning.png',
    'assets/python.png',
    'assets/ds-min.png',
    'assets/angular.png',
    'assets/android.png',
    'assets/sql-data-analytics.png',
    'assets/java.png',
    'assets/aws-serverless-computing.png',
  ];

  private batchTeachers = [
    'Suhail Khan',
    'Tanya Sharma',
    'Naveen Sharma',
    'Suhail Khan',
    'Tanya Sharma',
    'Naveen Sharma',
    'Suhail Khan',
    'Tanya Sharma',
    'Naveen Sharma',
  ];

  private batchProgress = [56, 34, 67, 89, 23, 90];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,private authService: AuthService) { }

  userName: string | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.fetchBatches();
    this.fetchUpcomingSessions();
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
  }

  fetchBatches(): void {
    this.http.get<Batch[]>('http://localhost:5092/api/batches').subscribe(
      (batches) => {
        const limitedBatches = batches.slice(0, this.MAX_BATCHES);
        const enhancedBatches = limitedBatches.map((batch, index) => ({
          ...batch,
          imageUrl: this.batchImages[index % this.batchImages.length],
          teacher: this.batchTeachers[index % this.batchTeachers.length],
          progress: this.batchProgress[index % this.batchProgress.length],
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating between 3 and 5
          duration: this.calculateDuration(batch.startDate, batch.endDate),
        }));
        this.batchGroups = this.chunkArray(enhancedBatches, 3);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  fetchUpcomingSessions(): void {
    this.http.get<UpcomingSession[]>('http://localhost:5092/api/batches').subscribe(
      (sessions) => {
        this.upcomingSessions = sessions.slice(0, this.MAX_UPCOMING_SESSIONS);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching upcoming sessions:', error);
      }
    );
  }

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.round(durationInMonths * 10) / 10; // Round to 1 decimal place
  }
}
