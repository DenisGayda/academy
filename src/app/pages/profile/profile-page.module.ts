import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProfilePageRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    providers: [FirebaseService],
    declarations: [ProfilePageComponent],
})
export class ProfilePageModule {
}
