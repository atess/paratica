import { Injectable } from '@angular/core';
import {Favorites, Market} from "../interfaces/models";
import {AuthService} from "./auth.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites$: BehaviorSubject<Favorites> = new BehaviorSubject<Favorites>({});

  constructor(private authService: AuthService) { }

  toggleFavorite(market: Market) {
    const username = this.authService.auth.username;
    const favoriteObj = this.favorites$.getValue();
    let favorites: Market[] = [];

    if (favoriteObj.hasOwnProperty(username)) {
      favorites = favoriteObj[username];
    } else {
      favorites = [];
    }

    if (favorites.some(m => market.id === m.id)) {
      favoriteObj[username] = favorites.filter(m => m.id !== market.id);
      this.favorites$.next(favoriteObj);
    } else {
      favorites.push(market);
      favoriteObj[username] = favorites;
      this.favorites$.next(favoriteObj);
    }
  }

  getUserFavorites() {
    const username = this.authService.auth.username;
    const favoriteObj = this.favorites$.getValue();
    return favoriteObj[username] || [];
  }

  checkFavorite(market: Market): boolean {
    if (this.authService.loggedIn) {
      const username = this.authService.auth.username;
      const favoriteObj = this.favorites$.getValue();
      return favoriteObj[username]?.some(m => m.id === market.id);
    }
    return false;
  }
}
