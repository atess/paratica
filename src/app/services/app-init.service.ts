import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, map, retry, share, take} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {CheckServerStatusResponse} from "../interfaces/models";
import {BehaviorSubject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  serverStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
    window.addEventListener("offline",
      () => this.isConnected$.next(false)
    );
    window.addEventListener("online",
      ()=> this.isConnected$.next(true)
    );
  }

  checkSystemStatus():
    Promise<any> {
    return new Promise<any>((resolve) => {
      return this.http.get<CheckServerStatusResponse>(environment.services.coinGeckoService + 'ping')
        .pipe(
          retry(2),
          catchError((err) => {
            this.serverStatus$.next(false);
            resolve(true);
            return throwError(err);
          }),
          map((response) => {
            this.serverStatus$.next(true);
          }),
        )
        .subscribe(() => {
          resolve(true);
        })
    })
  }
}
