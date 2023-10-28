import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthEndpoint } from '../constants/endpoint';
import { Router } from '@angular/router';
import { ICommonResponse, ILogin, ILoginResponse, IRegister, IRegisterResponse } from 'src/app/core/models/auth.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from 'server/src/models';

const CURRENT_USER = 'CURRENT_USER';
const SESSION_AUTH = 'ANPGOA2A-AUTH';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);


  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    const tokenCookie = this.cookieService.get(SESSION_AUTH);
    if (tokenCookie) {
      this.isAuthenticated.next(true);
    }
    this.getCurrentUser();
  }

  getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER) || null;
    if (user) {
      this.currentUser.next(JSON.parse(user));
    }
  }

  setCurrentUser(data: IUser) {
    this.currentUser.next(data);
    localStorage.setItem(CURRENT_USER, JSON.stringify(data));
  }

  removeCurrentUser() {
    localStorage.removeItem(CURRENT_USER);
    this.currentUser.next(null);
    this.isAuthenticated.next(false)
    this.cookieService.set(SESSION_AUTH, '');
  }

  onLogin(data: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(AuthEndpoint.login, data, { withCredentials: true }).pipe(map(response => {
      if (response.token) {
        this.setCurrentUser(response.data);
        this.isAuthenticated.next(true);
      }
      return response;
    }));
  }

  onRegister(data: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(AuthEndpoint.register, data);
  }

  onLogout(): void {
    this.http.get(AuthEndpoint.logout, { withCredentials: true }).subscribe({
      next: (value) => {
        this.isAuthenticated.next(false)
      }
    });
  }
}
