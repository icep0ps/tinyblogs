import React from 'react';
import Image from 'next/image';
import Editor from '../editor/Editor';
import { DBblog } from '../../Types';
import getConfig from '../editor/utils/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

type Props = {
  state: string;
  author: DBblog['author'];
};

function Comment(props: Props) {
  const { state, author } = props;

  return (
    <div className="flex items-start">
      <Image
        src={author.image}
        height={40}
        width={40}
        alt="pfp"
        className="rounded-full"
      />
      <LexicalComposer initialConfig={getConfig(false, state)}>
        <Editor number={1} />
      </LexicalComposer>
    </div>
  );
}

export default Comment;
