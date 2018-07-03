import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentsPageComponent } from './contents-page.component';
import { TreeModule } from '../../tree/tree.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../../../../environments/environment';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {DataTreeService} from '../../tree/settings/data-tree-service';
import {FirebaseService} from '../../../services/firebase-service/firebase.service';

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
      ],
      declarations: [ ContentsPageComponent ],
      providers: [
        FirebaseService,
        DataTreeService,
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
