/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { EditorState } from 'lexical';
import { ISlideType } from '../../Types';
import Toolbar from './Plugins/Toolbar/Toolbar';
import { registerCodeHighlighting } from '@lexical/code';
import { MaxLengthPlugin } from './Plugins/MaxLengthPlugin';
import CodeBlockPlugin from './Plugins/Code/CodeBlockPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import useGenarateNodes from './Plugins/node-generator/useGenarateNodes';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {
  state?: string;
  number: number;
  type: ISlideType;
  isEditable?: boolean;
  addSlide?: React.Dispatch<React.SetStateAction<Map<any, any>>>;
};

const Editor = (props: Props) => {
  const { type, number, isEditable, state, addSlide } = props;
  const [craeteSlidesContents] = useGenarateNodes(type);

  const [editor] = useLexicalComposerContext();

  //TODO: maybe use useCallback on these functions below
  registerCodeHighlighting(editor);
  craeteSlidesContents(state);

  const saveSlide = (editorState: EditorState) => {
    if (addSlide)
      addSlide((state) =>
        state.set(number, {
          type,
          number,
          contents: JSON.stringify(editorState.toJSON()),
        })
      );
  };

  return (
    <React.Fragment>
      {isEditable && (
        <React.Fragment>
          <Toolbar />
          <CodeBlockPlugin />
          <MaxLengthPlugin maxLength={1000} />
          <OnChangePlugin onChange={saveSlide} />
        </React.Fragment>
      )}

      <div className="relative">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className="min-h-[300px] h-full p-2" />}
          placeholder={<span className="absolute top-0">Enter some text...</span>}
        />
      </div>
    </React.Fragment>
  );
};

export default Editor;
