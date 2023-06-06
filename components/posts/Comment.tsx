import React from 'react';
import Image from 'next/image';
import Editor from '../editor/Editor';
import { DBblog } from '../../Types';
import getConfig from '../editor/utils/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import useStore from '../../stores/Users';
import axios from 'axios';

type Props = {
  id: string;
  state: string;
  blogId: string;
  author: DBblog['author'];
};

function Comment(props: Props) {
  const { state, author, blogId, id } = props;
  const user = useStore((state) => state.user);

  const deleteComment = async () => {
    await axios.delete(`/api/blogs/${blogId}/comments/${id}`);
  };

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
      {user?.id === author.id && <button onClick={deleteComment}>Delete</button>}
    </div>
  );
}

export default Comment;
