import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  currentDate: Date = new Date();
  courses: any[] = []; // Assuming courses array contains objects with fields: id, name, description, category, status
  searchQuery: string = '';
  showAddCoursePopup: boolean = false;
  showEditCoursePopup: boolean = false;
  newCourse: any = {
    id: null, // Make sure to include id field in newCourse
    name: '',
    description: '',
    status: 'active', // Default status
    startDate: '',
    endDate: ''
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize courses array from API or service
    // Example:
    this.courses = [
      { id: 1, name: 'Course A', description: 'Description of Course A', category: 'Category A', status: 'active' },
      { id: 2, name: 'Course B', description: 'Description of Course B', category: 'Category B', status: 'inactive' },
      { id: 3, name: 'Course C', description: 'Description of Course C', category: 'Category C', status: 'active' }
    ];
  }

  openAddCoursePopup() {
    this.newCourse = {
      id: null,
      name: '',
      description: '',
      status: 'active', // Default status
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
    // Save new course logic (not implemented for demo)
    this.courses.push({ 
      id: this.courses.length + 1,
      name: this.newCourse.name,
      description: this.newCourse.description,
      status: this.newCourse.status,
      category: 'New Category' // Example: Add category field
    });
    this.closeAddCoursePopup();
  }

  updateCourse() {
    // Update course logic (not fully implemented for demo)
    const index = this.courses.findIndex(c => c.id === this.newCourse.id);
    if (index !== -1) {
      this.courses[index] = { ...this.newCourse }; // Update existing course
    }
    this.closeEditCoursePopup();
  }

  deleteUser(courseId: number) {
    // Delete course logic (not fully implemented for demo)
    const index = this.courses.findIndex(c => c.id === courseId);
    if (index !== -1) {
      this.courses.splice(index, 1); // Optionally remove course from array
    }
  }
}
