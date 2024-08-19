import { Component } from '@angular/core';
import { AuthenticationRequest } from "../../models/authentication-request";
import { AuthenticationResponse } from "../../models/authentication-response";
import { AuthenticationService } from '../../../serives/authentication.service';
import { Router } from "@angular/router";
import { VerificationRequest } from "../../models/verification-request";
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {
    email: '', // Initialize email to bind with username field
    password: '' // Initialize password to bind with password field
    ,
    username: undefined
  };
  otpCode: string = '';  // For holding the OTP code input by the user
  authResponse: AuthenticationResponse = {}; // For storing the response from the authentication API
username: any;
password: any;

  constructor(
    private authService: AuthenticationService, // Service to handle API calls
    private router: Router                      // Router to navigate after successful login
  ) {}

  // Function to handle the login process
  authenticate() {
    this.authRequest.username = this.authRequest.email; // Set the username to be the same as the email
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            // If MFA is not enabled, store the token and navigate to the welcome page
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);
          }
        }
      });
  }

  // Function to verify the OTP code for MFA
  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          // Store the token and navigate to the welcome page after successful verification
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['welcome']);
        }
      });
  }

  // This is the method that will be called when the form is submitted
  onSubmit() {
    this.authenticate();
  }
}
