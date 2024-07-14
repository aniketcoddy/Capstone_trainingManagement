import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentDate: Date = new Date();
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
  }
}
