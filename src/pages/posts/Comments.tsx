import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { IComment } from '../../../Types';
import useStore from '../../../stores/Users';
import Editor from '../../../components/editor/Editor';
import Comment from '../../../components/posts/Comment';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import getConfig from '../../../components/editor/utils/initialConfig';

type Props = {
  postId: string;
  comments: IComment[];
};

function Comments(props: Props) {
  const { comments, postId } = props;
  const user = useStore((state) => state.user);
  const [slides, addSlide] = useState(new Map());

  async function postComment() {
    await axios.put(`/api/blogs/${postId}/comments`, {
      data: {
        author: user,
        comment: slides.get(1).contents,
      },
    });
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="flex gap-5 items-start">
        {user && (
          <>
            <Image
              src={user.image}
              alt="pfp"
              height={40}
              width={40}
              className="rounded-full"
            />
            <div className="w-full">
              <LexicalComposer initialConfig={getConfig(true)}>
                <Editor isEditable addSlide={addSlide} number={1} />
              </LexicalComposer>
            </div>
            <button onClick={postComment}>Post</button>
          </>
        )}
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} author={comment.author} state={comment.comment} />
      ))}
    </section>
  );
}

export default Comments;
