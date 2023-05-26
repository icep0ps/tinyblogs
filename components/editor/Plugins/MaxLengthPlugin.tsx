import { useEffect } from 'react';
import { $isCodeNode } from '@lexical/code';
import { $restoreEditorState } from '@lexical/utils';
import { trimTextContentFromAnchor } from '@lexical/selection';
import { $getSelection, $isRangeSelection, EditorState, RootNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export function MaxLengthPlugin({ maxLength }: { maxLength: number }): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let lastRestoredEditorState: EditorState | null = null;

    return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return;
      }
      const prevEditorState = editor.getEditorState();
      const prevTextContentSize = prevEditorState.read(() =>
        rootNode.getTextContentSize()
      );
      const textContentSize = rootNode.getTextContentSize();
      if (prevTextContentSize !== textContentSize) {
        const codeNodes = rootNode.getChildren().filter((node) => $isCodeNode(node));
        const codeNodesKeys = codeNodes.map((node) => node.getTextContentSize());
        const codeBlocksTextContentSize = codeNodesKeys.reduce(
          (prev, cur) => prev + cur,
          0
        );
        const MAX_LENGTH_EXCLUDING_CODE_BLOCKS =
          codeBlocksTextContentSize !== undefined && codeBlocksTextContentSize !== null
            ? maxLength + codeBlocksTextContentSize
            : maxLength;
        const delCount = textContentSize - MAX_LENGTH_EXCLUDING_CODE_BLOCKS;
        const anchor = selection.anchor;

        if (delCount > 0) {
          // Restore the old editor state instead if the last
          // text content was already at the limit.
          if (
            prevTextContentSize === MAX_LENGTH_EXCLUDING_CODE_BLOCKS &&
            lastRestoredEditorState !== prevEditorState
          ) {
            lastRestoredEditorState = prevEditorState;
            $restoreEditorState(editor, prevEditorState);
          } else {
            trimTextContentFromAnchor(editor, anchor, delCount);
          }
        }
      }
    });
  }, [editor, maxLength]);

  return null;
}
