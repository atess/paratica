import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../services/local-storage.service';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,
              private dialog: MatDialog,
              private localStorage: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const auth = this.authService.auth;

    let newRequest: HttpRequest<any>;
    if (this.authService.loggedIn) {
      newRequest = request.clone({
        headers: request.headers.set('Authorization', `${auth.type} ${auth.token}`)
      });
    } else {
      newRequest = request.clone();
    }

    return next.handle(newRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.dialog.closeAll();

            let data = {
              redirect: btoa(this.router.url)
            };

            this.localStorage.removeItem('auth');

            if (this.router.url.indexOf('/auth/login') === -1) {
              this.router.navigate(['/auth/login'], {
                queryParams: data,
              }).then();
            }
          }
        }
      }),
    );
  }
}
