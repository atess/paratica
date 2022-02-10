import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from './favorites.component';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  exports: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FlexModule
  ]
})
export class FavoritesModule {
}
