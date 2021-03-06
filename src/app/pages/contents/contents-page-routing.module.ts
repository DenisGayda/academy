import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentsPageComponent } from './contents-page.component';

const routes: Routes = [{
    path: '',
    component: ContentsPageComponent,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContentsPageRoutingModule {
}
