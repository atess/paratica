import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FavoritesModule} from "../../modules/favorites/favorites.module";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ScrollingModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    FavoritesModule,
    MatTooltipModule,
  ]
})
export class HomeModule { }
