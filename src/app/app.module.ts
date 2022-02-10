import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptor} from "./interceptors/http.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AppInitService} from "./services/app-init.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {GeckoService} from "./services/gecko.service";
import {FavoritesModule} from "./modules/favorites/favorites.module";

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.checkSystemStatus();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    FavoritesModule,
  ],
  exports: [
    FavoritesModule,
  ],
  providers: [
    GeckoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [AppInitService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
