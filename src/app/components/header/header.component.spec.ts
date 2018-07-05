import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { instance, mock } from 'ts-mockito';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let firebaseService: FirebaseService;
  let angularFireAuth: AngularFireAuth;
  beforeEach(async(() => {
    firebaseService = mock<FirebaseService>(FirebaseService);
    angularFireAuth = mock<AngularFireAuth>(AngularFireAuth);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        MatInputModule,
      ],
      declarations: [HeaderComponent],
      providers: [
        {provide: AngularFireAuth, useFactory: () => instance(angularFireAuth)},
        {provide: FirebaseService, useFactory: () => instance(firebaseService)},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
