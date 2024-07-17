
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

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent {
  currentDate: Date = new Date();
  courseGroups: Course[][] = [];
  enrolledCourses: Set<number> = new Set();
  userId:number = 1;

  private readonly MAX_COURSES = 10;

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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCourses();
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


  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.has(courseId);
  }

  enrollCourse(courseId: number): void {
    console.log(`Enrolling user ${this.userId} in course ${courseId}`);
    if (!this.enrolledCourses.has(courseId)) {
      this.enrolledCourses.add(courseId);  // Use 'add' instead of 'push'
      this.cdr.detectChanges(); // Force change detection
  
      // Optional: Remove the enrollment notification after a few seconds
      setTimeout(() => {
        this.enrolledCourses.delete(courseId);
        this.cdr.detectChanges();
      }, 3000); // Hide after 3 seconds
    }
  }

  

  toggleCourseDetails(course: Course): void {
    course.showDetails = !course.showDetails;
    // console.log(`Toggled details for course ${course.id}. showDetails: ${course.showDetails}`);
    this.cdr.detectChanges();
  }
}
