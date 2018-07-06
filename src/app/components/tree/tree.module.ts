import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DataTreeService } from './settings/data-tree-service';

@NgModule({
    imports: [
        CommonModule,
        MatTreeModule,
        MatIconModule,
    ],
    exports: [
        TreeComponent,
    ],
    declarations: [TreeComponent],
    providers: [
        FirebaseService,
        DataTreeService,
    ],
})
export class TreeModule {
}
