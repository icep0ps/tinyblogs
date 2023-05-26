import { $createCodeNode } from '@lexical/code';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createParagraphNode, $getRoot, LexicalEditor, $createTextNode } from 'lexical';

function Basic(editor: LexicalEditor) {
  editor.update(() => {
    const heading = $createHeadingNode('h1');
    const title = $createTextNode('How to create blog');
    heading.append(title);
    const paragraphNode = $createParagraphNode();
    const text = $createTextNode(
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae consectetur, mollitia iure praesentium provident sit, iusto officiis voluptatibus non earum natus alias saepe soluta? Cum repellat saepe quam nihil iure!'
    );

    paragraphNode.append(text);
    const block = $createCodeNode();
    const nodes = [heading, paragraphNode, block];

    const root = $getRoot();
    root.clear();
    root.append(...nodes);
  });
}

export default Basic;
