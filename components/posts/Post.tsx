import React from 'react';
import Link from 'next/link';

interface Props {
  id: number;
  userId: { id: number; firstName: String };
  title: String;
  body: String;
  tags: string[];
}

export default function Post({ id, title, body, tags, userId }: Props) {
  return (
    <Link href={`/posts/${id}`}>
      <article className="">
        <h3>{title}</h3>
        <div>
          <p className="">{body}</p>
          <p>{userId.firstName}</p>
        </div>
      </article>
    </Link>
  );
}
