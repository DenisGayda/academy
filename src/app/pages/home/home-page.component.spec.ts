import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs/internal/observable/of';
import { HomePageComponent } from './home-page.component';
import { HttpClient } from '@angular/common/http';
import { NewsSearchService } from '../../services/news-service/news-search.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let http: HttpClient;
    let newsSearchService: NewsSearchService;

    beforeEach(async(() => {
        http = mock<HttpClient>(HttpClient);
        newsSearchService = mock<NewsSearchService>(NewsSearchService);

        when(newsSearchService.getData$).thenReturn((theme: string) => of([]));

        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [MatCardModule, MatButtonModule, MatDividerModule],
            providers: [
                {provide: http, useFactory: () => instance(http)},
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
