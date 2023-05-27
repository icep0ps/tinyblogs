import { DBblog, Slide } from '../../Types';
import Editor from '../editor/Editor';
import React, { createElement } from 'react';
import getConfig from '../editor/utils/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

interface Props {
  id: string;
  post: DBblog;
}

const Post = (props: Props) => {
  const { id, post } = props;
  const { slides } = post;

  return (
    <div>
      {slides.slides.map((slide) => (
        <LexicalComposer initialConfig={getConfig(false)} key={id}>
          {createElement(Editor, {
            type: slide.type,
            number: slide.number,
            state: slide.contents,
          })}
        </LexicalComposer>
      ))}
    </div>
  );
};
export default Post;
