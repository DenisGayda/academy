import { TestBed, inject } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { instance, mock } from 'ts-mockito';

describe('FirebaseService', () => {
  let firebaseService: FirebaseService;
  let angularFireAuth: AngularFireAuth;
  let angularFireDatabase: AngularFireDatabase;
  beforeEach(() => {
    firebaseService = mock<FirebaseService>(FirebaseService);
    angularFireAuth = mock<AngularFireAuth>(AngularFireAuth);
    angularFireDatabase = mock<AngularFireDatabase>(AngularFireDatabase);
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireAuth, useFactory: () => instance(angularFireAuth)},
        {provide: AngularFireDatabase, useFactory: () => instance(firebaseService)},
        {provide: FirebaseService, useFactory: () => instance(angularFireDatabase)},
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
    });
  });

  it('should be created', inject([FirebaseService], (service: FirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
