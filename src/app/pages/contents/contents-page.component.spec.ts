import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  ContentsPageComponent  } from './contents-page.component';
import {  AngularFireModule  } from 'angularfire2';
import {  AngularFireDatabaseModule  } from 'angularfire2/database';
import {  MatTreeModule  } from '@angular/material/tree';
import {  MatIconModule  } from '@angular/material/icon';
import {  TreeModule  } from '../../components/tree/tree.module';
import {  environment  } from '../../../environments/environment';
import {  FirebaseService  } from '../../services/firebase-service/firebase.service';
import {  DataTreeService  } from '../../components/tree/settings/data-tree-service';
import {  AngularFireAuth, AngularFireAuthModule  } from 'angularfire2/auth';
describe('ContentsPageComponent', () => {
  let component: ContentsPageComponent;
  let fixture: ComponentFixture<ContentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TreeModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatTreeModule,
        MatIconModule,
        AngularFireAuthModule,
      ],
      declarations: [ ContentsPageComponent ],
      providers: [
        FirebaseService,
        DataTreeService,
        AngularFireAuth,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
