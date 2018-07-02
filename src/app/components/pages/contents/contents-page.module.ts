import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsPageRoutingModule } from './contents-page-routing.module';

import { ContentsPageComponent } from './contents-page.component';

@NgModule({
  imports: [
    CommonModule,
    ContentsPageRoutingModule,
  ],
  declarations: [ContentsPageComponent],
})
export class ContentsPageModule { }
