import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  currentDate: Date = new Date();
  courses: any[] = [];
  searchQuery: string = '';

  constructor(private authService: AuthService) { }

  userName: string | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    // Initialize courses array from API or service
    this.courses = [
      { id: 1, name: 'C#', description: 'Language', status: true },
      { id: 2, name: 'C++', description: 'Language', status: true },
      { id: 3, name: 'C', description: 'Language', status: true },
      { id: 4, name: 'Python', description: 'Language', status: true }
    ];
  }

  rejectCourse(courseId: number) {
    this.courses = this.courses.filter(course => course.id !== courseId);
  }
}
