
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

interface Course {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  headcount: number;
  description: string;
  price: number;
  showDetails: boolean;

}

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent {
  currentDate: Date = new Date();
  courseGroups: Course[][] = [];
  userId: number = 1; // Assuming the user ID is 1 for this example
  enrolledCourses: Set<number> = new Set();


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
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

    const courses: Course[] = Array(18).fill(0).map((_, i) => ({
      id: i + 1,
      title: courseTitle[i % courseTitle.length],
      imageUrl: courseImages[i % courseImages.length],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      headcount: Math.floor(Math.random() * 1000) + 50,
      description: `This is a detailed description of the ${courseTitle[i % courseTitle.length]} course.`,
      price: Math.floor(Math.random() * 500) + 100,
      showDetails: false,
      enrollmentRequested: false
    }));
  
    this.courseGroups = this.chunkArray(courses, 3);
    console.log('Course groups generated:', this.courseGroups);
  }

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.has(courseId);
  }

  enrollCourse(courseId: number): void {
    console.log(`Enrolling user ${this.userId} in course ${courseId}`);
    if (!this.enrolledCourses.has(courseId)) {
      this.enrolledCourses.add(courseId);  // Use 'add' instead of 'push'
      this.cdr.detectChanges(); // Force change detection
  
      // Optional: Remove the enrollment notification after a few seconds
      setTimeout(() => {
        this.enrolledCourses.delete(courseId);
        this.cdr.detectChanges();
      }, 3000); // Hide after 3 seconds
    }
  }

  

  toggleCourseDetails(course: Course): void {
    course.showDetails = !course.showDetails;
    console.log(`Toggled details for course ${course.id}. showDetails: ${course.showDetails}`);
    this.cdr.detectChanges();
  }
}
