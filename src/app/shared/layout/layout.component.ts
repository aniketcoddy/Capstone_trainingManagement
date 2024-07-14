import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentPanel: string = '';

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('LayoutComponent ngOnInit called');
    this.router.events.subscribe((event) => {
      console.log('Router event:', event);
      if (event instanceof NavigationEnd) {
        this.currentPanel = event.url.split('/')[1];
        console.log('Current panel set to:', this.currentPanel);
        // Force change detection
        this.cdRef.detectChanges();
      }
    });
    // Log initial route
    console.log('Initial route:', this.router.url);
  }
}