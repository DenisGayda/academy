import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsPageRoutingModule } from './contents-page-routing.module';
import { ContentsPageComponent } from './contents-page.component';
import { SideNavModule } from '../../components/side-nav/side-nav.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        ContentsPageRoutingModule,
        SideNavModule,
        MatCardModule,
        MatIconModule,
    ],
    declarations: [ContentsPageComponent],
})

export class ContentsPageModule {
}
