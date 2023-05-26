import React from 'react';
import Button from './components/Button';
import { ADD_CODE_BLOCK } from '../../commands/commands';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {};

const Toolbar = (props: Props) => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-4 ">
      <Button command="bold">Bold</Button>
      <Button command="italic">Italic</Button>
      <Button command="underline">Underline</Button>
      <Button command="code">Code</Button>
      <button onClick={() => editor.dispatchCommand(ADD_CODE_BLOCK, undefined)}>
        add code block
      </button>
    </div>
  );
};

export default Toolbar;
