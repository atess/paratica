import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GeckoService} from "../../services/gecko.service";
import {Market} from "../../interfaces/models";
import {LocalStorageService} from "../../services/local-storage.service";
import {FavoriteService} from "../../services/favorite.service";
import {PlatformService} from "../../services/platform.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

  markets: Market[] | undefined;
  destroySubject$: Subject<any> = new Subject<any>();

  constructor(private geckoService: GeckoService,
              public favoriteService: FavoriteService,
              public platformService: PlatformService,
              private localStorage: LocalStorageService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.platformService
      .platform$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((markets) => {
        this.markets = markets;
        this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next(null);
  }
}
