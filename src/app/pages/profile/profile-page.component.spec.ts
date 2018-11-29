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
import {IUser} from '../../model/user-profile.interface';
import {UserInDB} from '../../model/user-profile.class';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let firebaseService: FirebaseService;

  beforeEach(async(() => {
  firebaseService = mock<FirebaseService>(FirebaseService);

  when(firebaseService.dataInUsers$).thenReturn(of([]));
  when(firebaseService.getCurrentUserFromDB$()).thenReturn(of(new UserInDB('test', 'test@gmail.com', 'test street', '+380973331112')));

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

  it('should create controlForm with needed formInputs', () => {
      const userForm = component.createForm();
      expect(userForm.contains('userName') && userForm.contains('userEmail') &&
          userForm.contains('userAddress') && userForm.contains('userPhone')).toBeTruthy();
  });

  it('should get correct data from input forms', () => {
      component.userForm = component.createForm();

      const name = 'test';
      const email = 'test@gmail.com';
      const address = 'test street';
      const phone = '+380973331112';

      component.userForm.get('userName').setValue(name);
      component.userForm.get('userEmail').setValue(email);
      component.userForm.get('userAddress').setValue(address);
      component.userForm.get('userPhone').setValue(phone);

      const user: IUser = component.getUserFormInfo();

      expect(user.name === name && user.email === email && user.adress === address && user.phone === user.phone).toBeTruthy();
  });

  it('should check isReady true state', () => {
      expect(component.isReady).toBeTruthy();
  });
});
