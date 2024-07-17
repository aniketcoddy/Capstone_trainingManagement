import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  currentDate: Date = new Date();
  courses: any[] = [];
  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
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
