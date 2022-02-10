import {
  HttpInterceptor as HttpInterceptorModel,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class HttpInterceptor implements HttpInterceptorModel {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let newRequest: HttpRequest<any>;
    const requestUrl = request.url.replace(/\/$/, '');

    newRequest = request.clone({
      url: requestUrl,
      method: request.method,
      headers: request.headers
        .set('Content-Type', `application/vnd.example.v1+json`)
        .set('Accept', `application/json`)
    });

    return next.handle(newRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && !event?.body) {
            return;
          }
        },
        async (error: HttpErrorResponse) => {
          if (error.status === 401){
            this.snackBar.open(error.message);
          }
        }, () => {
        }
      )
    );
  }
}
