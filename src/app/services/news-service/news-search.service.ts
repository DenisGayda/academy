import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class NewsSearchService {

    constructor(private http: HttpClient) {
    }

    public getData$(theme: string): Observable<object> {
        return this.http.get(this.getURL(theme));
    }

    private getURL(theme): string {
        return `${environment.jsonplaceholder.baseURL}${theme}`;
    }

}
