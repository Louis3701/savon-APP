import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'savapp_jwt_token';
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  login(credential: { identifier: string; password: string }): Observable<any> {
    localStorage.removeItem(this.TOKEN_KEY);
    return this.http.post(`${this.API_URL}/login`, credential).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getUserIdentifier(): string {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.sub : 'Invité';
  }

  hasRole(role: string): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded || !decoded.roles) return false;
    return decoded.roles.includes(role);
  }

  getUserFullInfo(): { username: string; roles: string; expiration: Date } | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return {
      username: decoded.sub,
      roles: decoded.role || [],
      expiration: new Date(decoded.exp * 1000)
    };
  }

  subscribe(userInfo: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userInfo).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }
}
