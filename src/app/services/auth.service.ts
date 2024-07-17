import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5134/api/authentication'; // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken['UserId'];
  }

  getName(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken['name'];
  }
}
