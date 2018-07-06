import {  NgModule  } from '@angular/core';
import {  CommonModule  } from '@angular/common';
import {  TreeComponent  } from './tree.component';
import {  FirebaseService  } from '../../services/firebase-service/firebase.service';
import {  MatTreeModule  } from '@angular/material/tree';
import {  MatIconModule  } from '@angular/material/icon';
import {  DataTreeService  } from './settings/data-tree-service';
import {  MatInputModule  } from '@angular/material/input';
import {  FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TreeComponent,
  ],
  declarations: [TreeComponent],
  providers: [
    FirebaseService,
    DataTreeService,
  ],
})
export class TreeModule {
}
