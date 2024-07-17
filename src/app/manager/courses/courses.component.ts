import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  currentDate: Date = new Date();
  courses: any[] = [];
  filteredCourses: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get<any[]>('http://localhost:5150/api/courses').subscribe(
      data => {
        console.log('Courses loaded:', data); // Logging
        this.courses = data.filter(course => course.status);
        this.filteredCourses = this.courses; // Initialize filteredCourses with all courses
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  searchCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
