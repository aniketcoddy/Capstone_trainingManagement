import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

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
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})

export class FeedbacksComponent {

  currentDate: Date = new Date();
  courseGroups: Course[][] = [];
  showFeedbackForm: boolean = false;
  selectedCourse: Course | null = null;
  feedback: Feedback = { courseId: 0, rating: 0, comment: '' };

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

  openFeedbackForm(course: Course): void {
    this.selectedCourse = course;
    this.feedback = { courseId: course.id, rating: 0, comment: '' };
    this.showFeedbackForm = true;
  }

  closeFeedbackForm(): void {
    this.showFeedbackForm = false;
    this.selectedCourse = null;
  }

  submitFeedback(): void {
    // console.log(`Feedback submitted for course ID ${this.selectedCourse?.id}:`, this.feedback);
    // Here you can add logic to send the feedback to a server or store it
    this.closeFeedbackForm();
  }
}
