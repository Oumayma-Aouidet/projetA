import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-virement',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  transferForm: FormGroup;
  accounts: any[] = [];
  currencies: string[] = ['TND', 'EUR', 'USD']; // Liste des devises
  dataSource: any[] = [];

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      currency: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      motif: [''],
      date: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Initialisation des données si nécessaire
  }

  calculateTotalBalance(): number {
    return this.dataSource.reduce((acc, curr) => acc + curr.balance, 0);
  }

  onSubmitTransfer(): void {
    if (this.transferForm.valid) {
      const transferData = this.transferForm.value;
      console.log('Transfer data:', transferData);
    } else {
      console.log('Transfer form is invalid');
    }
  }
}
