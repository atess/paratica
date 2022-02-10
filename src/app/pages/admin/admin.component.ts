import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Favorites, Market} from "../../interfaces/models";
import {GeckoService} from "../../services/gecko.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {PlatformService} from "../../services/platform.service";
import {FavoriteService} from "../../services/favorite.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  markets: Market[] = [];
  object: any = Object;
  destroySubject$: Subject<any> = new Subject<any>();
  favorites: Favorites = {};

  constructor(public geckoService: GeckoService,
              private localStorage: LocalStorageService,
              public platformService: PlatformService,
              public favoriteService: FavoriteService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.geckoService.markets({
      category: 'asset-backed-tokens',
      vs_currency: 'usd',
    }).subscribe(markets => {
      this.markets = markets;
      this.cd.detectChanges();
    });


    this.favoriteService.favorites$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((favorites) => {
        this.favorites = favorites;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroySubject$.next(null);
  }
}
