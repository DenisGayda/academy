import { Observable } from 'rxjs/internal/Observable';
import { FileNodeClass } from '../file-node.class';
import { of } from 'rxjs/internal/observable/of';

export let getChildren = (node: FileNodeClass): Observable<FileNodeClass[]> => of(node.children);
