import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FavoritesModule} from "../../modules/favorites/favorites.module";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    FavoritesModule,
    MatTooltipModule,
  ]
})
export class AdminModule { }
