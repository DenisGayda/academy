import { Injectable } from '@angular/core';
import { FileNodeClass } from './file-node.class';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class DataTreeService {
    private _dataChange = new BehaviorSubject<FileNodeClass[]>([]);

    public get dataChange(): Observable<FileNodeClass[]> {
        return this._dataChange.asObservable();
    }

    public get data(): FileNodeClass[] {
        return this._dataChange.value;
    }

    public initialize(info: string): void {
        const dataObject = JSON.parse(info);
        const data = this.buildFileTree(dataObject, 0);
        this._dataChange.next(data);
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
