import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeComponent } from './tree.component';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DataTreeService } from './settings/data-tree-service';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs/internal/observable/of';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let firebaseService: FirebaseService;
  let dataTreeService: DataTreeService;
  beforeEach(async(() => {
    firebaseService = mock<FirebaseService>(FirebaseService);
    dataTreeService = mock<DataTreeService>(DataTreeService);
    when(firebaseService.dataInDatabase).thenReturn(of([]));
    when(dataTreeService.dataChange).thenReturn(of([]));
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTreeModule,
        MatIconModule,
      ],
      declarations: [TreeComponent],
      providers: [
        {provide: FirebaseService, useFactory: () => instance(firebaseService)},
        {provide: DataTreeService, useFactory: () => instance(dataTreeService)},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
