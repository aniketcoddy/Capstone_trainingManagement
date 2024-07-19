import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentDate: Date = new Date();
  users: any[] = [];
  searchQuery: string = '';
  showAddUserPopup: boolean = false;
  showEditUserPopup: boolean = false;
  newUser: any = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
  };

  private userServiceUrl = 'http://localhost:5048/api/users';
  private authServiceUrl = 'http://localhost:5134/api/authentication';

  constructor(private http: HttpClient, private authService: AuthService) { }

  userName: string | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.userName = this.authService.getName(); // Retrieve user name
    this.userId = this.authService.getUserId(); // Retrieve user ID
    this.loadUsers();
  }

  loadUsers(): void {
    this.searchQuery = ''; // Clear the search query when loading all users
    this.http.get<any[]>(`${this.userServiceUrl}`)
      .subscribe(data => {
        this.users = data
          .filter(user => user.role !== 1) // Exclude Admin users
          .map(user => ({
            ...user,
            role: this.getRoleName(user.role)
          }));
      });
  }

  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.loadUsers();
    } else {
      this.http.get<any[]>(`${this.userServiceUrl}/search?query=${this.searchQuery}`)
        .subscribe(data => {
          this.users = data
            .filter(user => user.role !== 1) // Exclude Admin users
            .map(user => ({
              ...user,
              role: this.getRoleName(user.role)
            }));
        });
    }
  }

  openAddUserPopup(): void {
    this.newUser = {
      id: '',
      name: '',
      email: '',
      password: '',
      role: '',
    };
    this.showAddUserPopup = true;
  }

  closeAddUserPopup(): void {
    this.showAddUserPopup = false;
  }

  openEditUserPopup(user: any): void {
    this.newUser = { ...user };
    this.showEditUserPopup = true;
  }

  closeEditUserPopup(): void {
    this.showEditUserPopup = false;
  }

  saveNewUser(): void {
    this.http.post(`${this.authServiceUrl}/register`, this.newUser, { responseType: 'text' })
      .subscribe(() => {
        this.loadUsers();
        this.closeAddUserPopup();
      }, error => {
        console.error("Error saving new user:", error);
      });
  }

  updateUser(): void {
    this.http.put(`${this.authServiceUrl}/update/${this.newUser.id}`, this.newUser, { responseType: 'text' })
      .subscribe(() => {
        this.loadUsers();
        this.closeEditUserPopup();
      }, error => {
        console.error("Error updating user:", error);
      });
  }

  deleteUser(user: any): void {
    this.http.delete(`${this.authServiceUrl}/delete/${user.id}`, { responseType: 'text' })
      .subscribe(() => {
        this.loadUsers();
      }, error => {
        console.error("Error deleting user:", error);
      });
  }

  editUser(user: any): void {
    this.openEditUserPopup(user);
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'Admin';
      case 2:
        return 'Manager';
      case 3:
        return 'Employee';
      default:
        return 'Unknown';
    }
  }
}
