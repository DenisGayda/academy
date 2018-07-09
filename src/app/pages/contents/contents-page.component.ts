import { Component } from '@angular/core';

@Component({
    selector: 'app-contents-page',
    templateUrl: './contents-page.component.html',
    styleUrls: ['./contents-page.component.scss'],
})
export class ContentsPageComponent {
    public showSB = true;

    public onShowSideBar(): void {
        this.showSB = !this.showSB;
    }
}
