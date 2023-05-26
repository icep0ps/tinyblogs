import Basic from '../../../common/Slides/Basic';
import Cover from '../../../common/Slides/Cover';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const useGenarateNodes = (type: string) => {
  const [editor] = useLexicalComposerContext();
  switch (type) {
    case 'cover':
      Cover(editor);
      break;
    case 'basic':
      Basic(editor);
      break;
  }
};

export default useGenarateNodes;
