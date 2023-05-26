import { $createCodeNode } from '@lexical/code';
import { ADD_CODE_BLOCK } from '../../commands/commands';
import { $getSelection, COMMAND_PRIORITY_LOW } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {};

const CodeBlockPlugin = (props: Props) => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    ADD_CODE_BLOCK,
    (payload: string) => {
      editor.update(() => {
        const selection = $getSelection();
        const block = $createCodeNode();
        selection?.insertNodes([block]);
      });
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  return null;
};

export default CodeBlockPlugin;
