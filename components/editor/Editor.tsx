/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ISlideType } from '../../Types';
import Toolbar from './Plugins/Toolbar/Toolbar';
import { registerCodeHighlighting } from '@lexical/code';
import { MaxLengthPlugin } from './Plugins/MaxLengthPlugin';
import CodeBlockPlugin from './Plugins/Code/CodeBlockPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import useGenarateNodes from './Plugins/node-generator/useGenarateNodes';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {
  type: ISlideType;
};

const Editor = (props: Props) => {
  const { type } = props;
  const [editor] = useLexicalComposerContext();
  registerCodeHighlighting(editor);
  useGenarateNodes(type);

  return (
    <>
      <Toolbar />
      <CodeBlockPlugin />
      <MaxLengthPlugin maxLength={1000} />
      <div className="relative">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className="min-h-[300px] h-full p-2" />}
          placeholder={<span className="absolute top-0">Enter some text...</span>}
        />
      </div>
    </>
  );
};

export default Editor;
