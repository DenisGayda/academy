import { Injectable } from '@angular/core';
import { FileNodeClass } from './file-node.class';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataTreeService {
  dataChange = new BehaviorSubject<FileNodeClass[]>([]);

  get data(): FileNodeClass[] { return this.dataChange.value; }
  constructor() {
  }
  public initialize(info: string): void {
    const dataObject = JSON.parse(info);
    const data = this.buildFileTree(dataObject, 0);
    this.dataChange.next(data);
  }
  public buildFileTree(obj: object, level: number): FileNodeClass[] {
    return Object.keys(obj).reduce<FileNodeClass[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNodeClass();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}
