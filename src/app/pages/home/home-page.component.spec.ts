import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs/internal/observable/of';
import { HomePageComponent } from './home-page.component';
import { NewsSearchService } from '../../services/news-service/news-search.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let newsSearchService: NewsSearchService;

    beforeEach(async(() => {
        newsSearchService = mock<NewsSearchService>(NewsSearchService);

        when(newsSearchService.getData$('posts')).thenReturn(of([]));

        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [MatCardModule, MatButtonModule, MatDividerModule],
            providers: [
                {provide: NewsSearchService, useFactory: () => instance(newsSearchService)},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
