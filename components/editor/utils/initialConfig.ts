import { ParagraphNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { CodeNode, CodeHighlightNode } from '@lexical/code';

const defualtState =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

function getConfig(isEditable: boolean, state?: string) {
  return {
    namespace: 'cover',
    editable: isEditable,
    editorState: defualtState,
    theme: {
      heading: {
        h1: 'text-3xl font-bold my-4',
      },
      paragraph: 'text-sm',
      code: 'code overflow-y-scroll max-h-[60vh]',
      codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'text-green-500',
        important: 'etext-red-500',
        inserted: 'editor-tokenSelector',
        keyword: 'text-sky-500',
        namespace: 'etext-red-500',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'etext-red-500',
        selector: 'editor-tokenSelector',
        string: 'etext-red-500',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'text-red-500',
      },
    },
    onError: () => {},
    nodes: [HeadingNode, ParagraphNode, CodeNode, CodeHighlightNode],
  };
}

export default getConfig;
