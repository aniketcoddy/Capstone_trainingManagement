import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentDate: Date = new Date();
<<<<<<< HEAD
  users: any[] = []; // Assuming users array contains objects with fields: userId, name, email, role, status
  searchQuery: string = '';
  showAddUserPopup: boolean = false;
  showEditUserPopup: boolean = false;
  newUser: any = {
    userId: '',
    name: '',
    email: '',
    password: '',
    role: '',
    status: 'Active', // Default status
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
      status: 'Active'
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
=======
  isPopupVisible: boolean = false;
  users: any[] = [
    { id: '23456', name: 'Anamika', email: 'Ani@123', role: 'Trainer', status: 'Active' }
    // Add more users as needed
  ];
  searchTerm: string = '';
  selectedUser: any = { id: '', name: '', email: '', password: '', role: '' };
  editingRow: any = null;

  constructor() { }

  ngOnInit(): void { }

  showPopup() {
    this.isPopupVisible = true;
    this.clearPopupFields();
  }

  hidePopup() {
    this.isPopupVisible = false;
    this.editingRow = null;
  }

  clearPopupFields() {
    this.selectedUser = { id: '', name: '', email: '', password: '', role: '' };
  }

  saveUser() {
    if (this.selectedUser.id && this.selectedUser.name && this.selectedUser.email && this.selectedUser.password && this.selectedUser.role) {
      if (this.editingRow) {
        Object.assign(this.editingRow, this.selectedUser);
        this.editingRow = null;
      } else {
        this.users.push({ ...this.selectedUser, status: 'Active' });
      }
      this.hidePopup();
    } else {
      alert('Please fill all fields');
    }
  }

  searchUser(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
  }

  editUser(user: any) {
    this.selectedUser = { ...user, password: '' }; // Password is not shown for security reasons
    this.editingRow = user;
    this.showPopup();
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
  }

  changePage(page: number) {
    // Implement pagination logic here
>>>>>>> 1a333fc0138b6c8f0b6a5ed1cf1be90f5dfe21a4
  }
}
