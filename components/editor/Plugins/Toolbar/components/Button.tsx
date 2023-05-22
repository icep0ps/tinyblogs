import React, { ReactNode } from 'react';

import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {
  children: ReactNode;
  command: TextFormatType;
};

const Button = (props: Props) => {
  const { command, children } = props;
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, command)}
      className="p-2 bg-zinc-800"
    >
      {children}
    </button>
  );
};

export default Button;
