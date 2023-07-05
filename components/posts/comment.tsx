import trpc from '../../utils/trpc';
import Editor from '../editor/Editor';
import getConfig from '../editor/utils/initialConfig';

import Image from 'next/image';
import React, { FC } from 'react';
import { User } from 'next-auth';
import { Comment } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

type Props = {
  blogId: string;
  comment: Comment & {
    author: User;
  };
};

const CommentComponent: FC<Props> = (props) => {
  const utils = trpc.useContext();
  const { data } = useSession();
  const user = data?.user;

  const { comment, blogId } = props;
  const { authorId, id } = comment;

  const deleteComment = trpc.blogs.comments.delete.useMutation({
    async onSuccess() {
      await utils.blogs.getById.invalidate(blogId);
    },
  });

  return (
    <div className="flex items-start">
      <Image
        src={comment.author.image ?? ''}
        height={40}
        width={40}
        alt="pfp"
        className="rounded-full"
      />
      <LexicalComposer initialConfig={getConfig(false, comment.comment)}>
        <Editor number={1} />
      </LexicalComposer>
      {user?.id === authorId && (
        <button
          onClick={() =>
            deleteComment.mutate({
              blogId,
              commentId: id,
            })
          }
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentComponent;
