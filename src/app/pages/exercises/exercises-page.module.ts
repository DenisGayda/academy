import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesPageRoutingModule } from './exercises-page-routing.module';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ExercisesPageComponent } from './exercises-page.component';

@NgModule({
  imports: [
    CommonModule,
    ExercisesPageRoutingModule,
    FormsModule,
    MonacoEditorModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [ ExercisesPageComponent ],
})
export class ExercisesPageModule { }
