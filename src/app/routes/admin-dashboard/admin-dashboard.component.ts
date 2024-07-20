import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


import { User } from '../../models/User';
import { Chart, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [
    { id: 1, username: 'user1', password: 'password1', role: 'USER' },
    { id: 2, username: 'admin1', password: 'password2', role: 'ADMIN' }
  ];
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = { data: this.users };
  transactions: any[] = [];
  transactionId: string = '';
  assignUsername: string = '';
username: any;
password: any;
role: any;

  constructor(private fb: FormBuilder) { 
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    //this.loadUserChart();
    //this.loadTransactionChart();
  }

  loadUserChart() {
    new Chart('userChart', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Users',
          data: [10, 20, 30, 40],
          backgroundColor: 'rgba(0, 77, 64, 0.6)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions
    });
  }

  loadTransactionChart() {
    new Chart('transactionChart', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Transactions',
          data: [15, 25, 35, 45],
          backgroundColor: 'rgba(0, 77, 64, 0.6)',
          borderColor: 'rgba(0, 77, 64, 1)',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions
    });
  }

  onCreateUser() {
    const formValues = this.userForm.value;
    const newUser: User = {
      id: this.generateUserId(),
      username: formValues.username,
      password: formValues.password,
      role: formValues.role
    };
    this.users.push(newUser);
    this.userForm.reset();
    this.dataSource.data = [...this.users];
    console.log('Utilisateur créé !', formValues);
  }

  private generateUserId(): number {
    return this.users.length ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
  }

  onDeleteUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.dataSource.data = [...this.users];
    } else {
      console.error(`User with ID ${user.id} not found.`);
    }
  }

  onResetPassword(user: User) {
    const foundUser = this.users.find(u => u.id === user.id);
    if (foundUser) {
      foundUser.password = 'newPassword123';
      this.dataSource.data = [...this.users];
      console.log(`Password reset for user ${foundUser.username}`);
    } else {
      console.error(`User with ID ${user.id} not found.`);
    }
  }

  onAssignTransaction() {
    const transaction = {
      id: this.transactions.length + 1,
      transactionId: this.transactionId,
      assignedTo: this.assignUsername
    };
    this.transactions.push(transaction);
    this.transactionId = '';
    this.assignUsername = '';
  }
}
