import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FileNodeClass } from './settings/file-node.class';
import { FileFlatNodeClass } from './settings/file-flat-node.class';
import { DataTreeService } from './settings/data-tree-service';
import { Observable } from 'rxjs/internal/Observable';
import { of as observableOf } from 'rxjs/internal/observable/of';
interface TreeInterface {
  title?: string;
  contents: {}[];
  id: string;
  href?: string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  public data: {} = {};
  public treeControl: FlatTreeControl<FileFlatNodeClass>;
  public treeFlattener: MatTreeFlattener<FileNodeClass, FileFlatNodeClass>;
  public dataSource: MatTreeFlatDataSource<FileNodeClass, FileFlatNodeClass>;
  constructor(private firebaseService: FirebaseService, private database: DataTreeService) {
    this.firebaseService.dataInDatabase.subscribe(
      data => {
        data.map((language: TreeInterface, iL) => {
          this.data[language.title] = {};
          language.contents.map((part: TreeInterface, iP) => {
            this.data[language.title][part.title] = {};
            part.contents.map((lessons: TreeInterface, iLS) => {
              this.data[language.title][part.title][`${lessons.title}`] = `Read ${lessons.title}`;
            });
          });
        });

        this.database.initialize(JSON.stringify(this.data));
      });
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNodeClass>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }
  ngOnInit(): void {}

  public transformer = (node: FileNodeClass, level: number) => {
    return new FileFlatNodeClass(!!node.children, node.filename, level, node.type);
  };

  private _getLevel = (node: FileFlatNodeClass) => node.level;

  private _isExpandable = (node: FileFlatNodeClass) => node.expandable;

  private _getChildren = (node: FileNodeClass): Observable<FileNodeClass[]> => observableOf(node.children);

  public hasChild = (_: number, _nodeData: FileFlatNodeClass) => _nodeData.expandable;
}
