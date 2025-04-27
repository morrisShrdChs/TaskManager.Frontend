import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:5135/api/Auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    return token ? !helper.isTokenExpired(token) : false;
  }
}
