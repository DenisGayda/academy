import { Component } from '@angular/core';
import { NewsSearchService } from '../../services/news-service/news-search.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [ NewsSearchService ],
})
export class HomePageComponent {

    public defaultThemes = ['posts', 'comments'];
    public data: Observable<object>;

    constructor(private newsService: NewsSearchService) {
    }

    public getTheme(theme: string): void {
        this.newsService.getData$(theme).subscribe((data$: Observable<object>) => {
           this.data = data$;
        });
    }

}
