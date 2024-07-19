import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: boolean | null;
}

interface User {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  currentDate: Date = new Date();
  enrollments: Enrollment[] = [];
  users: { [key: number]: User } = {};
  courses: { [key: number]: Course } = {};
  filteredEnrollments: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  userName: string | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID

    this.fetchEnrollments();
  }

  fetchEnrollments(): void {
    this.http.get<Enrollment[]>('http://localhost:5175/api/enrollments/pending').subscribe(
      (enrollments) => {
        this.enrollments = enrollments;

        this.fetchUsersAndCourses();
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  fetchUsersAndCourses(): void {
    const userIds = Array.from(new Set(this.enrollments.map(enrollment => enrollment.userId)));
    const courseIds = Array.from(new Set(this.enrollments.map(enrollment => enrollment.courseId)));

    userIds.forEach(userId => {
      this.http.get<User>(`http://localhost:5048/api/users/${userId}`).subscribe(
        (user) => {
          this.users[userId] = user;
          this.updateFilteredEnrollments();
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    });

    courseIds.forEach(courseId => {
      this.http.get<Course>(`http://localhost:5150/api/courses/${courseId}`).subscribe(
        (course) => {
          this.courses[courseId] = course;
          this.updateFilteredEnrollments();
        },
        (error) => {
          console.error('Error fetching course:', error);
        }
      );
    });
  }

  updateFilteredEnrollments(): void {
    this.filteredEnrollments = this.enrollments.map(enrollment => ({
      ...enrollment,
      userName: this.users[enrollment.userId]?.name,
      courseName: this.courses[enrollment.courseId]?.name,
      courseDescription: this.courses[enrollment.courseId]?.description
    })).filter(enrollment => 
      enrollment.userName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      enrollment.courseName?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  approveCourse(enrollmentId: number): void {
    this.http.patch(`http://localhost:5175/api/enrollments/${enrollmentId}`, { status: true }).subscribe(
      () => {
        this.enrollments = this.enrollments.filter(enrollment => enrollment.id !== enrollmentId);
        this.updateFilteredEnrollments();
      },
      (error) => {
        console.error('Error approving enrollment:', error);
      }
    );
  }
  
  rejectCourse(enrollmentId: number): void {
    this.http.patch(`http://localhost:5175/api/enrollments/${enrollmentId}`, { status: false }).subscribe(
      () => {
        this.enrollments = this.enrollments.filter(enrollment => enrollment.id !== enrollmentId);
        this.updateFilteredEnrollments();
      },
      (error) => {
        console.error('Error rejecting enrollment:', error);
      }
    );
  }
  
  

  searchEnrollments(): void {
    this.updateFilteredEnrollments();
  }
}
