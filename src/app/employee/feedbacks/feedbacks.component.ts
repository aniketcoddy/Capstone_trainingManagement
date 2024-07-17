import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface Course {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  headcount: number;
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
  courses: Course[] = [];
  showFeedbackForm: boolean = false;
  selectedCourse: Course | null = null;
  feedback: Feedback = { courseId: 0, rating: 0, comment: '' };

  constructor(private authService: AuthService) { }
  userName: string | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.generateDummyData();
  }

  generateDummyData(): void {
    const courseImages = [
      'assets/android.png',
      'assets/ds-min.png',
      'assets/hrm-min.png',
      'assets/java.png',
      'assets/machine-learning.png',
      'assets/python.png'
    ];

    const courseTitle = [
      'Android App Development',
      'Data Science Course',
      'Human Resource Course',
      'Core Java',
      'Machine Learning',
      'Programming With Python'
    ];

    this.courses = Array(6).fill(0).map((_, i) => ({
      id: i + 1,
      title: courseTitle[i],
      imageUrl: courseImages[i],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      headcount: Math.floor(Math.random() * 1000) + 50,
    }));
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
    console.log(`Feedback submitted for course ID ${this.selectedCourse?.id}:`, this.feedback);
    // Here you can add logic to send the feedback to a server or store it
    this.closeFeedbackForm();
  }
}
