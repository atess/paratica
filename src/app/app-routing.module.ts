import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  canActivate: [AuthGuard],
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
}, {
  path: 'admin',
  canActivate: [AdminGuard],
  loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
}, {
  path: 'auth',
  loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
