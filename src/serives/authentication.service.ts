import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterRequest } from '../app/models/register-request';
import { AuthenticationResponse } from '../app/models/authentication-response';
import { VerificationRequest } from '../app/models/verification-request';
import { AuthenticationRequest } from '../app/models/authentication-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(
    private http: HttpClient
  ) { }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/register`,
      registerRequest,
      { headers: this.getHeaders() }
    );
  }

  login(authRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/authenticate`,
      authRequest,
      { headers: this.getHeaders() }
    );
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/verify`,
      verificationRequest,
      { headers: this.getHeaders() }
    );
  }
}
