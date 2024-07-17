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
        switch (role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Manager':
            this.router.navigate(['/manager']);
            break;
          case 'Employee':
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