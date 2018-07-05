import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FileNodeClass } from './settings/file-node.class';
import { FileFlatNodeClass } from './settings/file-flat-node.class';
import { DataTreeService } from './settings/data-tree-service';
import { getLevel } from './settings/helpers/get-level-helper';
import { isExpandable } from './settings/helpers/is-expandable-helper';
import { getChildren } from './settings/helpers/get-children-hepler';
import { hasChild } from './settings/helpers/has-child-helpers';
import { transformer } from './settings/helpers/transformer-helpers';
import { FormControl } from '@angular/forms';

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
  public hasChild = hasChild;
  public treeControl: FlatTreeControl<FileFlatNodeClass> = new FlatTreeControl<FileFlatNodeClass>(getLevel, isExpandable);
  public treeFlattener: MatTreeFlattener<FileNodeClass, FileFlatNodeClass> = new MatTreeFlattener(transformer, getLevel, isExpandable, getChildren);
  public dataSource: MatTreeFlatDataSource<FileNodeClass, FileFlatNodeClass> = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  public searchingSearcher: FormControl = new FormControl('');
  public titleArray: String[] = [];
  public searchingArray: String[] = [];
  public searchingListVisible = false;
  public formValue: String;
  constructor(private firebaseService: FirebaseService, private database: DataTreeService) {
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  ngOnInit(): void {
    this.titleArray = [];
    this.searchingArray = [];
    this.firebaseService.dataInDatabase.subscribe(
      data => {
        data.map((language: TreeInterface, iL) => {
          this.data[language.title] = {};
          this.titleArray.push(language.title);
          language.contents.map((part: TreeInterface, iP) => {
            this.data[language.title][part.title] = {};
            this.titleArray.push(part.title);
            part.contents.map((lessons: TreeInterface, iLS) => {
              this.data[language.title][part.title][`${lessons.title}`] = `Read ${lessons.title}`;
              this.titleArray.push(lessons.title);
            });
          });
        });
        this.database.initialize(JSON.stringify(this.data));
      });

    this.searchingSearcher.valueChanges.subscribe(value => {
      this.searchingArray = [];
      this.searchingArray = this.titleArray.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      // console.log(this.titleArray, this.searchingArray);
      this.formValue = value;
    });
  }
  public visibleSearchingListFocus(): void {
      this.searchingListVisible = true;
  }

  public visibleSearchingListBlur(): void {
    this.searchingListVisible = false;
    if (!this.formValue) {
      this.searchingArray = [];
    }
  }

}
