import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


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
  showAddCoursePopup: boolean = false;
  showEditCoursePopup: boolean = false;
  newCourse: any = {
    name: '',
    description: '',
    status: true, // Default status
    startDate: '',
    endDate: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) { }
  userName: string | null = null;
  userId: number | null = null;


  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
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

  openAddCoursePopup() {
    this.newCourse = {
      name: '',
      description: '',
      status: true, // Default status
      startDate: '',
      endDate: ''
    };
    this.showAddCoursePopup = true;
  }
  
  closeAddCoursePopup() {
    this.showAddCoursePopup = false;
  }

  openEditCoursePopup(course: any) {
    this.newCourse = { ...course }; // Use spread operator to create a copy
    this.showEditCoursePopup = true;
  }

  closeEditCoursePopup() {
    this.showEditCoursePopup = false;
  }

  saveNewCourse() {
    this.http.post('http://localhost:5150/api/courses', this.newCourse).subscribe(
      () => {
        console.log('Course added successfully'); // Logging
        this.loadCourses();
        this.closeAddCoursePopup();
      },
      error => {
        console.error('Error adding course:', error);
      }
    );
  }

  updateCourse() {
    this.http.put(`http://localhost:5150/api/courses/${this.newCourse.id}`, this.newCourse).subscribe(
      () => {
        console.log('Course updated successfully'); // Logging
        this.loadCourses();
        this.closeEditCoursePopup();
      },
      error => {
        console.error('Error updating course:', error);
      }
    );
  }

  deleteCourse(id: number) {
    const courseToDelete = {
      id: id,
      status: false, // Set status to false for soft delete
      name: 'Dummy Name',      // Dummy values for required properties
      description: 'Dummy Description',
      startDate: new Date().toISOString(), // Dummy date value
      endDate: new Date().toISOString()
    };
  
    this.http.patch(`http://localhost:5150/api/courses/delete/${id}`, courseToDelete).subscribe(
      () => {
        console.log('Course deleted successfully');
        this.loadCourses();
      },
      error => {
        console.error('Error deleting course:', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    );
  }
  
   
}
