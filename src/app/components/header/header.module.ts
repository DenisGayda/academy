import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    AngularFireAuth,
    FirebaseService,
  ],
  declarations: [HeaderComponent],
})
export class HeaderModule { }
