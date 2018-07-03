import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/homepage', pathMatch: 'full',
  },
  {
    path: 'homepage', loadChildren: './pages/home/home-page.module#HomePageModule',
  },
  {
    path: 'contents', loadChildren: './pages/contents/contents-page.module#ContentsPageModule',
  },
  {
    path: 'profile', loadChildren: './pages/profile/profile-page.module#ProfilePageModule',
  },
  {
    path: '**', redirectTo: '/homepage',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ],
})

export class RoutingModule { }
