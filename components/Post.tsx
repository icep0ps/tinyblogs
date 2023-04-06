import React from 'react';
import styles from '../components/post.module.css';
import Link from 'next/link';

interface Props {
  id: number;
  userId: number;
  title: String;
  body: String;
  tags: string[];
}

export default function Post({ id, title, body, tags, userId }: Props) {
  return (
    <Link href="/">
      <article className={styles.post}>
        <h3>{title}</h3>
        <div>
          <p className={styles.body}>{body}</p>
          <p>{userId}</p>
        </div>
      </article>
    </Link>
  );
}
