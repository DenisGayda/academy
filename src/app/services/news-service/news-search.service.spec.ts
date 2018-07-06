import { TestBed, inject } from '@angular/core/testing';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';
import { NewsSearchService } from './news-search.service';

describe('NewsSearchService', () => {
    let http: HttpClient;
    let newsSearchService: NewsSearchService;

    beforeEach(() => {
        http = mock<HttpClient>(HttpClient);
        newsSearchService = mock<NewsSearchService>(NewsSearchService);

        when(newsSearchService.getData$).thenReturn((theme: string) => of([]));

        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useFactory: () => instance(http)},
                {provide: NewsSearchService, useFactory: () => instance(newsSearchService)},
            ],
        });
    });

    it('should be created', inject([NewsSearchService], (service: NewsSearchService) => {
        expect(service).toBeTruthy();
    }));
});
