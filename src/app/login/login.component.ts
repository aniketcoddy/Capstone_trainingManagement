// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('userRole', response.role);
          switch (response.role) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'manager':
              this.router.navigate(['/manager']);
              break;
            case 'employee':
              this.router.navigate(['/employee']);
              break;
          }
        } else {
          // Handle login failure
          this.errorMessage = 'Invalid credentials';
        }
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = 'An error occurred during login';
      }
    );
  }
}