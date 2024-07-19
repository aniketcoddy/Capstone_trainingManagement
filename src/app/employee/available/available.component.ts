import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

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

interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: boolean;
}

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent implements OnInit {
  currentDate: Date = new Date();
  courseGroups: Course[][] = [];
  enrolledCourses: Set<number> = new Set();

  private readonly MAX_COURSES = 13;

  userName: string | null = null;
  userId: number | null = null;

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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getName();
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.fetchEnrollments();
  }

  fetchCourses(): void {
    this.http.get<Course[]>('http://localhost:5150/api/courses').subscribe(
      (courses) => {
        const filteredCourses = courses.filter(course => !this.enrolledCourses.has(course.id));
        const limitedCourses = filteredCourses.slice(0, this.MAX_COURSES);
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

  fetchEnrollments(): void {
    this.http.get<Enrollment[]>(`http://localhost:5175/api/enrollments/user/${this.userId}`).subscribe(
      (enrollments) => {
        enrollments.forEach(enrollment => {
          this.enrolledCourses.add(enrollment.courseId);
        });
        this.fetchCourses(); // Fetch courses after loading enrollments
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
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
      this.http.post('http://localhost:5175/api/enrollments', {
        userId: this.userId,
        courseId: courseId,
        status: true
      }).subscribe(() => {
        this.enrolledCourses.add(courseId);
        this.fetchCourses(); // Refresh courses after enrolling
        this.cdr.detectChanges(); // Force change detection

        // Optional: Remove the enrollment notification after a few seconds
        setTimeout(() => {
          this.enrolledCourses.delete(courseId);
          this.cdr.detectChanges();
        }, 4000); // Hide after 3 seconds
      }, error => {
        console.error('Error enrolling in course:', error);
      });
    }
  }

  toggleCourseDetails(course: Course): void {
    course.showDetails = !course.showDetails;
    this.cdr.detectChanges();
  }
}
