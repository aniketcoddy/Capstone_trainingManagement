import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        const role = this.authService.getRole();
        const userId = this.authService.getUserId(); // Get userId
        switch (role) {
          case '1': // Admin
            this.router.navigate(['/admin']);
            break;
          case '2': // Manager
            this.router.navigate(['/manager']);
            break;
          case '3': // Employee
            this.router.navigate(['/employee']);
            break;
          default:
            console.error('Unknown role');
        }
      },
      error => {
        console.error('Login failed', error);
        // Handle login error (e.g., show error message)
      }
    );
  }
}
