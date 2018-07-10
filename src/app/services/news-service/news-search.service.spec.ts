import { TestBed, inject } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { NewsSearchService } from './news-search.service';

describe('NewsSearchService', () => {
    let http: HttpClient;

    beforeEach(() => {
        http = mock<HttpClient>(HttpClient);

        TestBed.configureTestingModule({
            providers: [
                NewsSearchService,
                {provide: HttpClient, useFactory: () => instance(http)},
            ],
        });
    });

    it('should be created', inject([NewsSearchService], (service: NewsSearchService) => {
        expect(service).toBeTruthy();
    }));
});
