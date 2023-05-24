/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import Toolbar from './Plugins/Toolbar/Toolbar';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import useGenarateNodes from './Plugins/node-generator/useGenarateNodes';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {};

const Editor = (props: Props) => {
  const [editor] = useLexicalComposerContext();
  useGenarateNodes(editor);

  return (
    <>
      <Toolbar />
      <div className="relative">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className="min-h-[300px] h-full" />}
          placeholder={<span className="absolute top-0">Enter some text...</span>}
        />
      </div>
    </>
  );
};

export default Editor;
