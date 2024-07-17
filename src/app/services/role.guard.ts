import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    
    // Check role and allow access accordingly
    switch (role) {
      case '1': // Admin
        return true;
      case '2': // Manager
        this.router.navigate(['/manager']);
        return false;
      case '3': // Employee
        this.router.navigate(['/employee']);
        return false;
      default:
        this.router.navigate(['/login']); // Redirect to login page if role is unknown or not authenticated
        return false;
    }
  }
}
