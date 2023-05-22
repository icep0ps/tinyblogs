import React from 'react';

import Toolbar from './Plugins/Toolbar/Toolbar';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

type Props = {};

const Editor = (props: Props) => {
  return (
    <div>
      <Toolbar />
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={<ContentEditable className="relative" />}
        placeholder={<span className="absolute top-[5.4rem]">Enter some text...</span>}
      />
    </div>
  );
};

export default Editor;
