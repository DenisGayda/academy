import {FileFlatNodeClass} from '../file-flat-node.class';
import {FileNodeClass} from '../file-node.class';

export let transformer = (node: FileNodeClass, level: number) => {
  return new FileFlatNodeClass(!!node.children, node.filename, level, node.type);
};
