import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Favorites, Market, MarketsRequest} from "../interfaces/models";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Utility} from "../helpers/Utility";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GeckoService {




  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  markets(request: MarketsRequest):
    Observable<Market[]> {
    return this.http.get<Market[]>
    (environment.services.coinGeckoService + 'coins/markets', {
      params: Utility.revert(request)
    });
  }




}
