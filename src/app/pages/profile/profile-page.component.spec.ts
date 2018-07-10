import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { ProfilePageComponent } from './profile-page.component';
import { of } from 'rxjs/internal/observable/of';
import { instance, mock, when } from 'ts-mockito';
import { AngularFireModule } from 'angularfire2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let firebaseService: FirebaseService;
  beforeEach(async(() => {
  firebaseService = mock<FirebaseService>(FirebaseService);
  when(firebaseService.dataInUsers).thenReturn(of([]));
  TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
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
      providers: [{provide: FirebaseService, useFactory: () => instance(firebaseService)}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
