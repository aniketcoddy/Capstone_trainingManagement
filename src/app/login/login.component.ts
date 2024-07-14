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
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          // Redirect based on user role
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
          alert('Invalid credentials');
        }
      },
      (error) => {
        console.error('Login error', error);
        alert('An error occurred during login');
      }
    );
  }
}