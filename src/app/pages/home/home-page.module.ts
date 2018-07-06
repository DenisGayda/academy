import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    imports: [
        CommonModule,
        HomePageRoutingModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
    ],
    declarations: [HomePageComponent],
})
export class HomePageModule {
}
