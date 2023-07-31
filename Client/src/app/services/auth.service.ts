import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Profile } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private baseUrl: string = 'http://localhost:5050/api/users';

  private user$$ = new BehaviorSubject<any | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: Profile | undefined;

  subscription: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj).pipe(tap((user) => this.user$$.next(user)));
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, loginObj).pipe(tap((user) => this.user$$.next(user)));
  }

  storeToken(tokenValue: string) {
    return localStorage.setItem('token', tokenValue);
  }
  getProfile() {
    return this.http
      .get<any>(`${this.baseUrl}`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }
  
  infoUpdate(userId: string, update: any){
    return this.http.post<any>(`${this.baseUrl}/update`,{userId, update});
  }

  logOut() {
    localStorage.removeItem('token');
    this.user$$.next(undefined);
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
