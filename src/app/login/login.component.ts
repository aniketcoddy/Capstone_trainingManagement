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
  errorMessage: string = ''; // Property to store the error message

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      // Optionally, show a message to the user that both fields are required
      this.errorMessage = 'Both email and password are required.';
      return;
    }

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
        this.errorMessage = 'Invalid email or password, or user is inactive.'; // Set error message based on API response
      }
    );
  }
}
