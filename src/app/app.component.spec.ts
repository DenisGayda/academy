import { fakeAsync, TestBed } from '@angular/core/testing';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './services/firebase-service/firebase.service';

describe('AppComponent', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FooterModule,
        HeaderModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: FirebaseService, useValue: {}},
      ],
      }).compileComponents();
  }));

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
