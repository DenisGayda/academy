import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavComponent } from './side-nav.component';
import { CommonModule } from '@angular/common';
import { TreeModule } from '../tree/tree.module';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs/internal/observable/of';

describe('SideNavComponent', () => {
    let component: SideNavComponent;
    let fixture: ComponentFixture<SideNavComponent>;
    let firebaseService: FirebaseService;
    beforeEach(async(() => {
        firebaseService = mock<FirebaseService>(FirebaseService);
        when(firebaseService.dataInDatabase$).thenReturn(of([]));
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                TreeModule,
                BrowserAnimationsModule,
            ],
            declarations: [SideNavComponent],
            providers: [
                {provide: FirebaseService, useFactory: () => instance(firebaseService)},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
