import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentDate: Date = new Date();
  users: any[] = []; // Assuming users array contains objects with fields: userId, name, email, role
  searchQuery: string = '';
  showAddUserPopup: boolean = false;
  showEditUserPopup: boolean = false;
  newUser: any = {
    userId: '',
    name: '',
    email: '',
    password: '',
    role: '',
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize users array from API or service
    // Example:
    this.users = [
      { userId: '1', name: 'Anamika', email: 'ani@123', role: 'Trainer' },
      { userId: '2', name: 'John Doe', email: 'john@example.com', role: 'Manager' },
      { userId: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
      { userId: '4', name: 'Sam Wilson', email: 'sam@example.com', role: 'Developer' }
    ];
  }

  openAddUserPopup() {
    this.newUser = {
      userId: '',
      name: '',
      email: '',
      password: '',
      role: '',
    };
    this.showAddUserPopup = true;
  }

  closeAddUserPopup() {
    this.showAddUserPopup = false;
  }

  openEditUserPopup(user: any) {
    this.newUser = { ...user };
    this.showEditUserPopup = true;
  }

  closeEditUserPopup() {
    this.showEditUserPopup = false;
  }

  saveNewUser() {
    // Handle saving new user to backend or service
    // Example: Assuming adding newUser directly to users array for demonstration
    this.users.push({ ...this.newUser });
    this.closeAddUserPopup();
  }

  updateUser() {
    // Update the user in the users array
    const index = this.users.findIndex(user => user.userId === this.newUser.userId);
    if (index !== -1) {
      this.users[index] = { ...this.newUser };
    }
    this.closeEditUserPopup();
  }

  editUser(user: any) {
    this.openEditUserPopup(user);
  }

  deleteUser(user: any) {
    // Remove the user from the users array
    const index = this.users.findIndex(u => u.userId === user.userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
