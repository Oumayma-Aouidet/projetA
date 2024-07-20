import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    CommonModule
    
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent implements OnInit {

  dataSource = [
    { accountNumber: '123456789', accountLabel: 'Compte principal', date: new Date('2024-07-10'), currency: 'TND', balance: 2500.75 },
    { accountNumber: '987654321', accountLabel: 'Compte épargne', date: new Date('2024-07-10'), currency: 'TND', balance: 7500.32 },
    { accountNumber: '567891234', accountLabel: 'Compte courant', date: new Date('2024-07-10'), currency: 'TND', balance: 15000.0 },
    { accountNumber: '456789012', accountLabel: 'Compte crédit', date: new Date('2024-07-10'), currency: 'TND', balance: -500.0 },
  ];

  totalBalance: number;

  displayedColumns: string[] = ['accountNumber', 'accountLabel', 'date', 'currency', 'balance'];

  constructor() {
    this.totalBalance = this.calculateTotalBalance();
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  calculateTotalBalance(): number {
    return this.dataSource.reduce((acc, curr) => acc + curr.balance, 0);
  }
}
