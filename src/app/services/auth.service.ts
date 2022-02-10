import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalStorageService} from "./local-storage.service";
import {environment} from "../../environments/environment";
import {AuthStorage, JWTParse, LoginRequest, LoginResponse, User} from "../interfaces/models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profileChanged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private localStorage: LocalStorageService,
              private router: Router,
              private http: HttpClient) {
    this.profileChanged$.next(this.user);
  }

  get user(): User {
    return this.localStorage.getItem('auth')
      ? this.localStorage.getItem('auth')
      : null;
  }

  set user(profile: User) {
    if (this.loggedIn) {
      const currentAuth = this.localStorage.getItem('auth');
      currentAuth.profile = profile;
      this.localStorage.setItem('auth', currentAuth);
      this.profileChanged$.next(this.user);
    }
  }

  get loggedIn(): boolean {
    return !!this.localStorage.getItem('auth');
  }

  get isAdmin(): boolean {
    if (this.loggedIn) {
      return this.auth.role === 'admin';
    }
    return false;
  }

  get auth(): AuthStorage {
    return this.localStorage.getItem('auth');
  }

  login(authentication: LoginRequest):
    Observable<AuthStorage> {

    return this.http.post<LoginResponse>(environment.services.authService, authentication)
      .pipe(
        map((obj) => {
          const parsedJWT = this.parseJwt(obj.token);

          const auth: AuthStorage = {
            token: obj.token,
            type: 'Bearer',
            exp: obj.exp,
            role: parsedJWT.role,
            username: authentication.username
          };

          this.localStorage.setItem('auth', auth);
          return auth;
        })
      );
  }

  logout() {
    this.localStorage.removeItem('auth');
    this.router.navigate(['/auth/login']).then();
  }

  parseJwt (token: string): JWTParse {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
}
