import { Component } from '@angular/core';

interface Batch {
  title: string;
  teacher: string;
  rating: number;
  duration : number;
  progress: number;
  imageUrl: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  currentDate: Date = new Date();
  batchGroups: Batch[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateDummyData();
  }

  generateDummyData(): void {
    // Generate dummy courses

    const BatchImages = [
      'assets/nodejs.png',
      'assets/sql-data-analytics.png'
    ];

    const BatchTitle = [
      'Node JS',
      'Sql for Data Analytics'
    ];

    const BatchTeacher = [
      'Suhail Khan',
      'Tanya Sharma' 
    ];

    const BatchProgress = [
      56,
      34,
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
    this.batchGroups = this.chunkArray(batches, 2);
  }

  upcomingSessions = [
    { courseName: 'Angular Basics', startDate: new Date(2024, 7, 19), endDate: new Date(2024, 9, 15) },
    { courseName: 'React Fundamentals', startDate: new Date(2024, 7, 28), endDate: new Date(2024, 9, 20) },
    { courseName: 'Core Java', startDate: new Date(2024, 8, 24), endDate: new Date(2024, 9, 28) }
  ];

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }
}
