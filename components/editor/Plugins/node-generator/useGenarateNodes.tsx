import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $insertNodes,
  LexicalEditor,
} from 'lexical';
import { $generateNodesFromDOM } from '@lexical/html';

const useGenarateNodes = (editor: LexicalEditor) => {
  editor.update(() => {
    const parser = new DOMParser();
    const html = `<section className="flex flex-col gap-3">
        <div className="flex flex-col">
          <span>username</span>
          <span className="text-sm">@username</span>
        </div>
        <h1 className="text-center text-2xl">How to code: Nextjs</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consequuntur illum
          reiciendis. Neque praesentium eveniet facilis, assumenda ullam repellendus
          voluptates eius, quas laudantium, et non iste iure quam illo fugiat!
        </p>
        <div className="flex justify-end">
          <h1>swipe {'>>'}</h1>
        </div>
      </section>`;

    const dom = parser.parseFromString(html, 'text/html');
    const nodes = $generateNodesFromDOM(editor, dom);

    const validNodesToInsert = nodes.map((node) => {
      const paragraphNode = $createParagraphNode();

      if (node.getType() === 'text') {
        paragraphNode.append(node);
        return paragraphNode;
      } else {
        return node;
      }
    });

    const root = $getRoot();
    root.clear();
    root.append(...validNodesToInsert);
  });
};

export default useGenarateNodes;
