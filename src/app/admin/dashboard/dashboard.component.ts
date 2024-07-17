import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Course {
  title: string;
  imageUrl: string;
  rating: number;
  headcount: number;
}

interface Batch {
  title: string;
  teacher: string;
  rating: number;
  duration : number;
  progress: number;
  imageUrl: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  courseGroups: Course[][] = [];
  batchGroups: Batch[][] = [];

  userName: string | null = null;
  userId: number | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.generateDummyData();
  }

  generateDummyData(): void {
    // Generate dummy courses
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
      title: courseTitle[i % courseTitle.length],
      imageUrl: courseImages[i % courseImages.length], // Random placeholder image
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating between 3 and 5
      headcount: Math.floor(Math.random() * 1000) + 50 // Random headcount between 50 and 1049
    }));


    const BatchImages = [
      'assets/nodejs.png',
      'assets/sql-data-analytics.png',
      'assets/ds-min.png',
      'assets/android.png',
      'assets/angular.png',
      'assets/aws-serverless-computing.png',
    ];

    const BatchTitle = [
      'Node JS',
      'Sql for Data Analytics',
      'Data Science Course',
      'Android App Develpment',
      'Angular',
      'AWS Serverless Computing'
    ];

    const BatchTeacher = [
      'Suhail Khan',
      'Tanya Sharma',
      'Naveen Sharma',
      'Anamika sawhney',
      'Aniket vishnoi',
      'Satish Agarwal'
    ];

    const BatchProgress = [
      56,
      34,
      67,
      89,
      23,
      90
    ];

    // Generate dummy batches
    const batches: Batch[] = Array(18).fill(0).map((_, i) => ({
      title: BatchTitle[i % BatchTitle.length],
      teacher: BatchTeacher[i % BatchTeacher.length],
     duration : Math.round((Math.random() * 2 + 3) * 10) / 10,
     rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      progress : BatchProgress[i % BatchProgress.length],
      imageUrl: BatchImages[i % BatchImages.length]
    }));

    // Group courses and batches into sets of 3 for the carousel
    this.courseGroups = this.chunkArray(courses, 3);
    this.batchGroups = this.chunkArray(batches, 3);
  }

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }
}