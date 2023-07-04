import { trpc } from '../../../utils/trpc';
import Editor from '../../../components/editor/Editor';
import Comment from '../../../components/posts/comment';
import getConfig from '../../../components/editor/utils/initialConfig';

import Image from 'next/image';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { FC, Fragment, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

type Props = {
  blogId: string;
  comments: (Comment & {
    author: User;
  })[];
};

const Comments: FC<Props> = (props) => {
  const { data } = useSession();
  const utils = trpc.useContext();
  const postComment = trpc.blogs.comments.post.useMutation({
    async onSuccess() {
      await utils.blogs.getById.invalidate(blogId);
    },
  });

  const user = data?.user;
  const { comments, blogId } = props;
  const [slides, addSlide] = useState(new Map());

  return (
    <section className="flex flex-col gap-5">
      <div className="flex gap-5 items-start">
        {user && (
          <Fragment>
            <Image
              src={user.image ?? ''}
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
            <button
              onClick={() =>
                postComment.mutate({ blogId, comment: slides.get(1).contents })
              }
            >
              Post
            </button>
          </Fragment>
        )}
      </div>

      {comments ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} blogId={blogId} />
        ))
      ) : (
        <div>
          <h1>no comments </h1>
        </div>
      )}
    </section>
  );
};

export default Comments;
