import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesPageRoutingModule } from './exercises-page-routing.module';

import { ExercisesPageComponent } from './exercises-page.component';

@NgModule({
  imports: [
    CommonModule,
    ExercisesPageRoutingModule,
  ],
  declarations: [ ExercisesPageComponent ],
})
export class ExercisesPageModule { }
