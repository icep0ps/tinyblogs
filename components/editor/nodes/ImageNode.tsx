import { ElementNode, LexicalNode, NodeKey } from 'lexical';

export class ImageNode extends ElementNode {
  static getType(): string {
    return 'image-node';
  }

  constructor(public source: string, key?: NodeKey) {
    super(key);
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__key);
  }

  createDOM(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add(...['flex', 'justify-center', 'my-5']);
    const image = document.createElement('img');
    image.classList.add('rounded-xl');
    image.src = this.source;
    container.append(image);
    return container;
  }

  updateDOM(prevNode: ImageNode, dom: HTMLElement): boolean {
    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false;
  }
}
export function $createImageNode(src: string): ImageNode {
  return new ImageNode(src);
}

export function $isImageNode(node: LexicalNode): boolean {
  return node instanceof ImageNode;
}
