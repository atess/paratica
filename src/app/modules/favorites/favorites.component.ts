import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GeckoService} from "../../services/gecko.service";
import {Market} from "../../interfaces/models";
import {Subject, takeUntil} from "rxjs";
import {FavoriteService} from "../../services/favorite.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favorites: Market[] = [];
  destroySubject$: Subject<any> = new Subject<any>();

  constructor(private favoriteService: FavoriteService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.favoriteService.favorites$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(() => {
        this.favorites = this.favoriteService.getUserFavorites();
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroySubject$.next(null);
  }
}
