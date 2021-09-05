import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: any;
  tokens?: any;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { };

  login(name: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { username: name, password: password }).pipe(
      tap(token => localStorage.setItem('auth_token', token.tokens.acessToken))
    );
  };
  register(name: string, password: string, first: string, last: string): Observable<User> {
    return this.http.post<User>('/api/register', { username: name, password: password, firstName: first, lastName: last });
  };
  logout() {
    localStorage.removeItem('auth_token');
  };
  getUser(): Observable<User> {
    return this.http.get<User>('/api/user', { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } });
  };
};
