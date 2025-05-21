import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5135/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data, {
      withCredentials: true
    });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data, {
      withCredentials: true
    });
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  isAuthenticated(): boolean {
    return true;
  }
}
