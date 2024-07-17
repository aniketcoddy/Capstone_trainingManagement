import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Course {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  headcount: number;
  description: string;
  price: number;
  showDetails: boolean;
}

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  courseGroups: Course[][] = [];
  batchGroups: Batch[][] = [];
  enrolledCourses: Set<number> = new Set();

  private readonly MAX_COURSES = 13;
  private readonly MAX_BATCHES = 13;

  private courseImages = [
    'assets/android.png',
    'assets/ds-min.png',
    'assets/hrm-min.png',
    'assets/java.png',
    'assets/machine-learning.png',
    'assets/python.png',
    'assets/aws-serverless-computing.png',
    'assets/sql-data-analytics.png',
  ];

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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.fetchCourses();
    this.fetchBatches();
  }

  fetchCourses(): void {
    this.http.get<Course[]>('http://localhost:5150/api/courses').subscribe(
      (courses) => {
        const limitedCourses = courses.slice(0, this.MAX_COURSES);
        const enhancedCourses = limitedCourses.map((course, index) => ({
          ...course,
          imageUrl: this.courseImages[index % this.courseImages.length],
          showDetails: false,
          headcount: Math.floor(Math.random() * 1000) + 50, // Random headcount between 50 and 1049
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
          price: Math.floor(Math.random() * 500) + 100
        }));
        this.courseGroups = this.chunkArray(enhancedCourses, 3);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
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

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.round(durationInMonths * 10) / 10; // Round to 1 decimal place
  }


  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  toggleCourseDetails(course: Course): void {
    course.showDetails = !course.showDetails;
    // console.log(`Toggled details for course ${course.id}. showDetails: ${course.showDetails}`);
    this.cdr.detectChanges();
  }
}