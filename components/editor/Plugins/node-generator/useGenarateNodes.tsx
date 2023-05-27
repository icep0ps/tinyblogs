import Basic from '../../../common/Slides/Basic';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const useGenarateNodes = (type: string) => {
  const [editor] = useLexicalComposerContext();

  function craeteSlidesContents(state: string | undefined) {
    switch (type) {
      case 'basic':
        Basic(editor, state);
        break;
    }
  }

  return [craeteSlidesContents];
};

export default useGenarateNodes;
