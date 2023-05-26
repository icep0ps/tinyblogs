import { $createHeadingNode } from '@lexical/rich-text';
import { $createParagraphNode, $getRoot, LexicalEditor, $createTextNode } from 'lexical';

//TODO: forget this just create a promp for covers where users can add images and titles like on dev.com

function Cover(editor: LexicalEditor) {
  editor.update(() => {
    const heading = $createHeadingNode('h1');
    const title = $createTextNode('How to create blog');
    heading.append(title);
    heading.setFormat('center');
    const paragraphNode = $createParagraphNode();
    paragraphNode.setFormat('center');
    const text = $createTextNode(
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae consectetur, mollitia iure praesentium provident sit, iusto officiis voluptatibus non earum natus alias saepe soluta? Cum repellat saepe quam nihil iure!'
    );

    paragraphNode.append(text);
    const nodes = [heading, paragraphNode];

    const root = $getRoot();
    root.clear();
    root.append(...nodes);
  });
}

export default Cover;
