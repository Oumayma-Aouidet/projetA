import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
onTransfer() {
throw new Error('Method not implemented.');
}
  
  // Data for accounts and currencies
  accounts = [
    { number: '123456789', label: 'Compte principal' },
    { number: '987654321', label: 'Compte épargne' },
    { number: '567891234', label: 'Compte courant' },
    { number: '456789012', label: 'Compte crédit' },
  ];

  currencies: string[] = ['TND', 'EUR', 'USD', 'CAD', 'GBP'];

  // DataSource for the table
  dataSource = [
    { accountNumber: '123456789', accountLabel: 'Compte principal', date: new Date('2024-07-10'), currency: 'TND', balance: 2500.75 },
    { accountNumber: '987654321', accountLabel: 'Compte épargne', date: new Date('2024-07-10'), currency: 'TND', balance: 7500.32 },
    { accountNumber: '567891234', accountLabel: 'Compte courant', date: new Date('2024-07-10'), currency: 'TND', balance: 15000.0 },
    { accountNumber: '456789012', accountLabel: 'Compte crédit', date: new Date('2024-07-10'), currency: 'TND', balance: -500.0 },
  ];

  // Total balance calculation
  totalBalance: number = this.calculateTotalBalance();
  
  // Columns to display in the table
  displayedColumns: string[] = ['accountNumber', 'accountLabel', 'date', 'currency', 'balance'];
  
  // FormGroup for the transfer form
  transferForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the transfer form with validation rules
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      currency: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      reason: [''],
      executionDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Component initialization logic can be added here
  }

  // Function to calculate the total balance across all accounts
  calculateTotalBalance(): number {
    return this.dataSource.reduce((acc, curr) => acc + curr.balance, 0);
  }

  // Handler for form submission
  onSubmitTransfer(): void {
    if (this.transferForm.valid) {
      const transferData = this.transferForm.value;
      console.log('Transfer data:', transferData);
      // Logic to process the transfer can be added here
    } else {
      console.log('Transfer form is invalid');
    }
  }
}
