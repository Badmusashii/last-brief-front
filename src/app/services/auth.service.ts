import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  setAuthStatus(status: boolean): void {
    this.authStatus.next(status);
  }
  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/auth/login`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
      })
    );
  }

  validateToken(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/auth/validate');
  }
  register(registerData: any) {
    return this.httpClient.post(
      'http://localhost:3000/auth/register',
      registerData
    );
  }
}
