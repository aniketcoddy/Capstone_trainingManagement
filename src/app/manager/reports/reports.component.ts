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

  constructor(private authService: AuthService, private http: HttpClient) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.today = new Date(); // Initialize with the current date
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
}
