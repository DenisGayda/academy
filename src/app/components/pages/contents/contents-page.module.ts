import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsPageRoutingModule } from './contents-page-routing.module';
import { ContentsPageComponent } from './contents-page.component';
import { TreeModule } from '../../tree/tree.module';

@NgModule({
  imports: [
    CommonModule,
    ContentsPageRoutingModule,
    TreeModule,
  ],
  declarations: [ContentsPageComponent],
})
export class ContentsPageModule { }
