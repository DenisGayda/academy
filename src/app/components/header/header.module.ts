import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatInputModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    FirebaseService,
  ],
  declarations: [HeaderComponent],
})
export class HeaderModule { }
