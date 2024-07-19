import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  today: Date;
  userName: string | null = null;
  userId: number | null = null;
  enrollmentCounts: { total: number; approved: number; notApproved: number } | null = null;
  enrollmentDetails: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.userName = this.authService.getName();
    this.userId = this.authService.getUserId();
    this.today = new Date();
    this.getEnrollmentCounts();
  }

  getEnrollmentCounts(): void {
    this.http.get<{ total: number; approved: number; notApproved: number }>('http://localhost:5175/api/enrollments/counts').subscribe(
      (data) => {
        this.enrollmentCounts = data;
      },
      (error) => {
        console.error('Error fetching enrollment counts:', error);
      }
    );
  }

  fetchEnrollmentDetails(status: string): void {
    let endpoint = '';
    switch(status) {
      case 'requested':
        endpoint = 'http://localhost:5175/api/enrollments/requested';
        break;
      case 'approved':
        endpoint = 'http://localhost:5175/api/enrollments/approved';
        break;
      case 'notApproved':
        endpoint = 'http://localhost:5175/api/enrollments/notApproved';
        break;
    }

    this.http.get<any[]>(endpoint).subscribe(
      (enrollments) => {
        this.enrollmentDetails = [];
        enrollments.forEach(enrollment => {
          this.fetchUserAndCourseDetails(enrollment);
        });
      },
      (error) => {
        console.error(`Error fetching ${status} enrollments:`, error);
      }
    );
  }

  fetchUserAndCourseDetails(enrollment: any): void {
    const userRequest = this.http.get<any>(`http://localhost:5048/api/users/${enrollment.userId}`);
    const courseRequest = this.http.get<any>(`http://localhost:5150/api/courses/${enrollment.courseId}`);

    Promise.all([userRequest.toPromise(), courseRequest.toPromise()]).then(
      ([user, course]) => {
        this.enrollmentDetails.push({
          userName: user.name,
          email: user.email,
          courseName: course.name,
          courseDescription: course.description
        });
      }
    ).catch((error) => {
      console.error('Error fetching user or course details:', error);
    });
  }
}
