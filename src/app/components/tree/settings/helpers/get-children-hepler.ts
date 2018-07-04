import {Observable} from 'rxjs/internal/Observable';
import {FileNodeClass} from '../file-node.class';
import { of as observableOf } from 'rxjs/internal/observable/of';

export let getChildren = (node: FileNodeClass): Observable<FileNodeClass[]> => observableOf(node.children);
