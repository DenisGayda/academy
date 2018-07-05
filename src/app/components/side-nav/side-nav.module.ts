import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { TreeModule } from '../tree/tree.module';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
  ],
  exports: [
    SideNavComponent,
  ],
  providers: [],
  declarations: [SideNavComponent],
})
export class SideNavModule {
}
