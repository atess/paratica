import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Market} from "../interfaces/models";
import {GeckoService} from "./gecko.service";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  platform$: BehaviorSubject<Market[]> = new BehaviorSubject<Market[]>([]);

  constructor(private geckoService: GeckoService) {
    if (this.platform$.getValue().length === 0) {
      this.geckoService.markets({
        category: 'asset-backed-tokens',
        vs_currency: 'usd',
      }).subscribe(markets => {
        const first5 = markets.slice(0, 5);
        this.platform$.next(first5);
      })
    }
  }

  togglePlatform(market: Market) {
    const platform = this.platform$.getValue();

    if (platform.some(m => market.id === m.id)) {
      this.platform$.next(platform.filter(m => m.id !== market.id));
    } else {
      platform.push(market);
      this.platform$.next(platform);
    }
  }

  checkPlatform(market: Market) {
    const platform = this.platform$.getValue();
    return platform.some(m => m.id === market.id);
  }
}
