import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentsPageComponent } from './contents-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from '../../components/tree/tree.module';
import { ContentsPageRoutingModule } from './contents-page-routing.module';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs/internal/observable/of';

describe('ContentsPageComponent', () => {
  let component: ContentsPageComponent;
  let fixture: ComponentFixture<ContentsPageComponent>;
  let firebaseService: FirebaseService;
  beforeEach(async(() => {
    firebaseService = mock<FirebaseService>(FirebaseService);
    when(firebaseService.dataInDatabase).thenReturn(of([]));
    TestBed.configureTestingModule({
      imports: [
        TreeModule,
        CommonModule,
        ContentsPageRoutingModule,
        BrowserAnimationsModule,
      ],
      declarations: [ContentsPageComponent],
      providers: [
        {provide: FirebaseService, useFactory: () => instance(firebaseService)},
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
