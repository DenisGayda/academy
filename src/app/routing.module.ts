import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/homepage', pathMatch: 'full',
  },
  {
    path: 'homepage', loadChildren: './home-page/home-page.module#HomePageModule',
  },
  {
    path: 'contents', loadChildren: './contents-page/contents-page.module#ContentsPageModule',
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
