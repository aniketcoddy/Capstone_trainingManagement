import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

interface Feedback {
  courseId: number;
  userId: number;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  currentDate: Date = new Date();
  inactiveCourses: Course[] = [];
  showFeedbackForm: boolean = false;
  selectedCourse: Course | null = null;
  feedback: Feedback = { courseId: 0, userId: 0, rating: 0, comment: '' };

  private readonly MAX_COURSES = 4;
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

  private submittedCourseIds: number[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  userName: string | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.fetchInactiveCourses();
  }

  fetchInactiveCourses(): void {
    this.http.get<Course[]>('http://localhost:5150/api/courses/inactive').subscribe(
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
        this.inactiveCourses = enhancedCourses;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching inactive courses:', error);
      }
    );
  }

  openFeedbackForm(course: Course): void {
    // Check if feedback already submitted for this course
    if (this.submittedCourseIds.includes(course.id)) {
      // If feedback already submitted, prevent opening the form again
      return;
    }
    this.selectedCourse = course;
    this.feedback = { courseId: course.id, userId: this.userId!, rating: 0, comment: '' };
    this.showFeedbackForm = true;
  }

  closeFeedbackForm(): void {
    this.showFeedbackForm = false;
    this.selectedCourse = null;
  }

  submitFeedback(): void {
    if (!this.selectedCourse) {
      return;
    }
    // Send feedback to backend and store it in database
    this.http.post('http://localhost:5073/api/Feedback', this.feedback).subscribe(
      () => {
        // On successful submission, add course ID to submitted list
        this.submittedCourseIds.push(this.selectedCourse!.id);
        // Remove course from inactiveCourses array
        this.inactiveCourses = this.inactiveCourses.filter(course => course.id !== this.selectedCourse!.id);
        this.closeFeedbackForm();
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}
