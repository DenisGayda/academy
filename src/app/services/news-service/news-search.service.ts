import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { NewsInterface } from '../../config/news.interface';

@Injectable()
export class NewsSearchService {

    constructor(private http: HttpClient) {
    }

    public getData$(theme: string): Observable<NewsInterface[]> {
        return this.http.get<NewsInterface[]>(this.getURL(theme));
    }

    private getURL(theme): string {
        return `${environment.jsonplaceholder.baseURL}${theme}`;
    }

}
